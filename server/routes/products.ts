import { Router } from 'express';
import { supabaseAdmin } from '../utils/supabase';
import { authMiddleware, adminOnly } from '../middleware/auth';

const router = Router();

// Public: Get all products (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { category, featured, search, in_stock, page = '1', limit = '20' } = req.query;
    
    let query = supabaseAdmin
      .from('products')
      .select('*, category:categories(*)', { count: 'exact' });

    // Apply filters
    if (category) {
      query = query.eq('category_id', category);
    }
    if (featured === 'true') {
      query = query.eq('featured', true);
    }
    if (in_stock === 'true') {
      query = query.eq('in_stock', true);
    }
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Pagination
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const start = (pageNum - 1) * limitNum;

    query = query
      .order('created_at', { ascending: false })
      .range(start, start + limitNum - 1);

    const { data: products, error, count } = await query;

    if (error) throw error;

    res.json({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limitNum),
      },
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: error.message });
  }
});

// Public: Get single product
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const { data: product, error } = await supabaseAdmin
      .from('products')
      .select('*, category:categories(*)')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error: any) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Public: Get featured products
router.get('/featured/list', async (req, res) => {
  try {
    const { limit = '6' } = req.query;
    
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select('*, category:categories(*)')
      .eq('featured', true)
      .eq('in_stock', true)
      .order('created_at', { ascending: false })
      .limit(parseInt(limit as string, 10));

    if (error) throw error;

    res.json(products);
  } catch (error: any) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ error: error.message });
  }
});

// Admin: Create product
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      short_description,
      price,
      compare_price,
      category_id,
      images,
      featured,
      in_stock,
      sku,
      tags,
      specifications,
    } = req.body;

    if (!name || !slug || !price || !category_id) {
      return res.status(400).json({ 
        error: 'Name, slug, price and category_id are required' 
      });
    }

    const { data: product, error } = await supabaseAdmin
      .from('products')
      .insert([{
        name,
        slug,
        description,
        short_description,
        price,
        compare_price,
        category_id,
        images: images || [],
        featured: featured || false,
        in_stock: in_stock !== undefined ? in_stock : true,
        sku,
        tags: tags || [],
        specifications: specifications || {},
      }])
      .select('*, category:categories(*)')
      .single();

    if (error) throw error;

    res.status(201).json(product);
  } catch (error: any) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Admin: Update product
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updated_at: new Date().toISOString(),
    };

    const { data: product, error } = await supabaseAdmin
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select('*, category:categories(*)')
      .single();

    if (error) throw error;
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error: any) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Admin: Delete product
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    // Get product to delete images from storage
    const { data: product, error: fetchError } = await supabaseAdmin
      .from('products')
      .select('images')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Delete images from storage
    if (product?.images && product.images.length > 0) {
      for (const imageUrl of product.images) {
        const path = imageUrl.split('/').pop();
        if (path) {
          await supabaseAdmin.storage.from('products').remove([path]);
        }
      }
    }

    // Delete product
    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
