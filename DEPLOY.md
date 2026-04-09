# Deploy Guide - Blinds & Tales

## Frontend (Vercel) - ✅ Done
**URL:** https://blinds-and-tales.vercel.app

## Backend Deploy Options

### Option 1: Railway (Recommended)

1. Go to https://railway.app and login with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `dvdsantamaria/blink` repository
4. Railway will auto-detect the `railway.json` config
5. Add environment variables in Railway dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET` (generate with: `openssl rand -base64 32`)
   - `FRONTEND_URL=https://blinds-and-tales.vercel.app`
6. Deploy!

### Option 2: Render

1. Go to https://render.com and login
2. Click "New" → "Blueprint"
3. Connect your GitHub repo
4. Render will read `render.yaml` and create the service
5. Add the environment variables when prompted

### Option 3: Manual (Any VPS)

```bash
# Clone repo
git clone https://github.com/dvdsantamaria/blink.git
cd blink/server

# Install dependencies
npm install

# Build
npm run build

# Start with PM2
npm install -g pm2
pm2 start dist/index.js --name "blinds-api"
```

## Environment Variables Required

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (keep secret!) |
| `JWT_SECRET` | Random string for JWT signing |
| `FRONTEND_URL` | https://blinds-and-tales.vercel.app |
| `PORT` | Port to run on (default: 3001) |

## After Backend Deploy

Update frontend environment variable in Vercel:
```
VITE_API_URL=https://your-backend-url.com/api
```

Then redeploy frontend:
```bash
vercel --prod
```
