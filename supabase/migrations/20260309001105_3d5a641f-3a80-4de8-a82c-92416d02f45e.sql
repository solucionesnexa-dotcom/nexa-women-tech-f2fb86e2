
CREATE TABLE public.career_os (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  career_vision jsonb DEFAULT '{}',
  skills_map jsonb DEFAULT '{}',
  ai_stack jsonb DEFAULT '[]',
  automation_builder jsonb DEFAULT '[]',
  opportunity_builder jsonb DEFAULT '[]',
  personal_workflow jsonb DEFAULT '{}',
  progress_tracker jsonb DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.career_os ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own career_os" ON public.career_os
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own career_os" ON public.career_os
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own career_os" ON public.career_os
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER update_career_os_updated_at
  BEFORE UPDATE ON public.career_os
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
