
-- Create resources table for admin document uploads
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'PDF',
  file_url TEXT,
  uploaded_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Everyone authenticated can view resources
CREATE POLICY "Resources viewable by authenticated users"
  ON public.resources FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can manage resources
CREATE POLICY "Admins can manage resources"
  ON public.resources FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for resource files
INSERT INTO storage.buckets (id, name, public)
VALUES ('resources', 'resources', true);

-- Storage policies: admins can upload
CREATE POLICY "Admins can upload resources"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'resources' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete resources"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'resources' AND public.has_role(auth.uid(), 'admin'));

-- Anyone can view resource files (public bucket)
CREATE POLICY "Anyone can view resources"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'resources');
