import { Router } from 'express';
import { supabaseAdmin } from '../utils/supabase';
import { authMiddleware, adminOnly } from '../middleware/auth';

const router = Router();

// Admin: Upload image to Supabase Storage
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    if (!req.body.image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Expect base64 image data
    const { image, folder = 'products' } = req.body;
    
    // Extract mime type and base64 data
    const matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid image format' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Determine file extension
    const ext = mimeType.split('/')[1] || 'jpg';
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('blinds-and-tales')
      .upload(filename, buffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('blinds-and-tales')
      .getPublicUrl(filename);

    res.json({
      url: publicUrl,
      path: filename,
    });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: error.message });
  }
});

// Admin: Delete image from storage
router.delete('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { path } = req.body;
    
    if (!path) {
      return res.status(400).json({ error: 'Path is required' });
    }

    const { error } = await supabaseAdmin.storage
      .from('blinds-and-tales')
      .remove([path]);

    if (error) throw error;

    res.json({ message: 'Image deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
