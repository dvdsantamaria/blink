import { Router } from 'express';
import { supabaseAdmin } from '../utils/supabase';
import { authMiddleware, adminOnly } from '../middleware/auth';

const router = Router();

// Public: Get all categories
router.get('/', async (req, res) => {
  try {
    const { data: categories, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;

    res.json(categories);
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: error.message });
  }
});

// Public: Get single category
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const { data: category, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error: any) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: error.message });
  }
});

// Admin: Create category
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { name, slug, description, image, color, sort_order } = req.body;

    if (!name || !slug || !color) {
      return res.status(400).json({ error: 'Name, slug and color are required' });
    }

    const { data: category, error } = await supabaseAdmin
      .from('categories')
      .insert([{ name, slug, description, image, color, sort_order: sort_order || 0 }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(category);
  } catch (error: any) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: error.message });
  }
});

// Admin: Update category
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, image, color, sort_order } = req.body;

    const { data: category, error } = await supabaseAdmin
      .from('categories')
      .update({ name, slug, description, image, color, sort_order, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error: any) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: error.message });
  }
});

// Admin: Delete category
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category has products
    const { count, error: countError } = await supabaseAdmin
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', id);

    if (countError) throw countError;
    if (count && count > 0) {
      return res.status(400).json({ error: 'Cannot delete category with existing products' });
    }

    const { error } = await supabaseAdmin
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
