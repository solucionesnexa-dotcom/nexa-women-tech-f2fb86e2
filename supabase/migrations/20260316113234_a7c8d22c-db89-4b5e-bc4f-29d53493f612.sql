
-- API Keys table for external integrations
CREATE TABLE public.api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  key_hash text NOT NULL,
  key_prefix text NOT NULL,
  permissions text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_used_at timestamptz,
  expires_at timestamptz
);

ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage api_keys"
  ON public.api_keys FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Webhooks subscriptions table
CREATE TABLE public.webhooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  secret text,
  events text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_triggered_at timestamptz,
  failure_count integer NOT NULL DEFAULT 0
);

ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage webhooks"
  ON public.webhooks FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Webhook logs for debugging
CREATE TABLE public.webhook_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_id uuid REFERENCES public.webhooks(id) ON DELETE CASCADE NOT NULL,
  event text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}',
  status_code integer,
  response_body text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.webhook_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view webhook_logs"
  ON public.webhook_logs FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Function to validate API key and return permissions
CREATE OR REPLACE FUNCTION public.validate_api_key(p_key_hash text)
RETURNS TABLE(api_key_id uuid, permissions text[])
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, permissions
  FROM public.api_keys
  WHERE key_hash = p_key_hash
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > now())
$$;
