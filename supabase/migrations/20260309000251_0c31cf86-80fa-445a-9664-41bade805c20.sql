
-- 1. Add bio column to profiles
ALTER TABLE public.profiles ADD COLUMN bio text;

-- 2. Create labs table
CREATE TABLE public.labs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  video_url text,
  lab_date date,
  is_past boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.labs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Labs viewable by authenticated users" ON public.labs
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage labs" ON public.labs
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 3. Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Storage RLS: anyone can view avatars
CREATE POLICY "Public avatar access" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

-- Authenticated users can upload their own avatars
CREATE POLICY "Users can upload avatars" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Users can update their own avatars
CREATE POLICY "Users can update own avatars" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Users can delete their own avatars
CREATE POLICY "Users can delete own avatars" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
