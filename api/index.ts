import type { VercelRequest, VercelResponse } from '@vercel/node';
import express, { Router } from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Auth middleware
const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const adminOnly = (req: any, res: any, next: any) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Create routers
const authRouter = Router();
const categoryRouter = Router();
const productRouter = Router();

// Auth routes
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password });
    if (error) throw error;
    
    const token = jwt.sign(
      { id: data.user.id, email: data.user.email, role: data.user.user_metadata?.role || 'admin' },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: data.user.id, email: data.user.email, role: data.user.user_metadata?.role } });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

authRouter.post('/logout', authMiddleware, async (req, res) => {
  try {
    await supabaseAdmin.auth.signOut();
    res.json({ message: 'Logged out' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

authRouter.get('/me', authMiddleware, async (req: any, res) => {
  res.json(req.user);
});

// Category routes
categoryRouter.get('/', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('categories').select('*').order('sort_order');
    if (error) throw error;
    res.json(data || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.get('/:slug', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('categories').select('*').eq('slug', req.params.slug).single();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('categories').insert(req.body).select().single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('categories').update(req.body).eq('id', req.params.id).select().single();
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await supabaseAdmin.from('categories').delete().eq('id', req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Product routes
productRouter.get('/', async (req, res) => {
  try {
    const { category, featured, search, page = '1', limit = '20' } = req.query;
    let query = supabaseAdmin.from('products').select('*, category:categories(*)', { count: 'exact' });
    
    if (category) query = query.eq('category_id', category);
    if (featured === 'true') query = query.eq('featured', true);
    if (search) query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const start = (pageNum - 1) * limitNum;
    
    query = query.order('created_at', { ascending: false }).range(start, start + limitNum - 1);
    
    const { data, error, count } = await query;
    if (error) throw error;
    
    res.json({
      products: data || [],
      pagination: { page: pageNum, limit: limitNum, total: count || 0, totalPages: Math.ceil((count || 0) / limitNum) }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

productRouter.get('/featured/list', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 6;
    const { data, error } = await supabaseAdmin.from('products').select('*, category:categories(*)').eq('featured', true).limit(limit);
    if (error) throw error;
    res.json(data || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

productRouter.get('/:slug', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('products').select('*, category:categories(*)').eq('slug', req.params.slug).single();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

productRouter.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('products').insert(req.body).select('*, category:categories(*)').single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

productRouter.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('products').update(req.body).eq('id', req.params.id).select('*, category:categories(*)').single();
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

productRouter.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await supabaseAdmin.from('products').delete().eq('id', req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Express app
const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5175',
    'https://blinds-and-tales.vercel.app',
  ],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);

app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal error' });
});

export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
