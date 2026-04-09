import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth';

const router = Router();

// Admin credentials (in production, use environment variables or database)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@blindsandtales.com.au';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';

// Simple login for single admin user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Check email
    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    // For first setup, if no hash exists, accept any password and return setup instructions
    if (!ADMIN_PASSWORD_HASH) {
      // Generate hash for the provided password (setup mode)
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      
      return res.status(200).json({
        message: 'Setup mode: Use this hash as ADMIN_PASSWORD_HASH env var',
        hash,
        token: null,
      });
    }

    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken({
      userId: 'admin',
      email: ADMIN_EMAIL,
      role: 'admin',
    });

    res.json({
      token,
      user: {
        id: 'admin',
        email: ADMIN_EMAIL,
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify token
router.get('/verify', (req, res) => {
  // The auth middleware would handle verification
  // This endpoint just returns success if middleware passes
  res.json({ valid: true });
});

export default router;
