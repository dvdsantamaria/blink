# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and API keys

## 2. Run Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** → **New Query**
3. Copy and paste the contents of `supabase/schema.sql`
4. Click **Run**

## 3. Create Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click **New Bucket**
3. Name: `blinds-and-tales`
4. Set to **Public bucket**
5. Click **Create bucket**

## 4. Configure Storage Policies

In the SQL Editor, run:

```sql
-- Allow public read access to images
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'blinds-and-tales');

-- Allow authenticated uploads
CREATE POLICY "Authenticated Uploads" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'blinds-and-tales');

-- Allow authenticated deletes
CREATE POLICY "Authenticated Deletes" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'blinds-and-tales');
```

## 5. Update Environment Variables

Copy from Supabase Settings → API:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 6. Set Admin Password

1. First, run the server in setup mode:
```bash
npm run server
```

2. Make a POST request to create password hash:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@blindsandtales.com.au","password":"your-secure-password"}'
```

3. Copy the `hash` from response to your `.env`:
```bash
ADMIN_PASSWORD_HASH=your-generated-hash
```

## 7. Test the API

```bash
# Health check
curl http://localhost:3001/api/health

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@blindsandtales.com.au","password":"your-password"}'

# Get categories
curl http://localhost:3001/api/categories

# Get products
curl http://localhost:3001/api/products
```
