-- Blinds & Tales Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  color TEXT NOT NULL DEFAULT '#0f172a',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  compare_price DECIMAL(10, 2),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  sku TEXT,
  tags TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policies for categories (public read, admin write)
CREATE POLICY "Allow public read access" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Allow admin full access" ON categories
  USING (auth.role() = 'authenticated');

-- Policies for products (public read, admin write)
CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow admin full access" ON products
  USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample categories
INSERT INTO categories (name, slug, description, color, sort_order) VALUES
  ('Nature & Tropical', 'nature-tropical', 'Bring the outdoors in with lush botanical prints', '#22c55e', 1),
  ('Coastal Living', 'coastal-living', 'Beach vibes and ocean views for your space', '#0ea5e9', 2),
  ('Kids & Nursery', 'kids-nursery', 'Playful designs for little ones', '#f59e0b', 3),
  ('Sports Fan', 'sports-fan', 'Show your team spirit', '#ef4444', 4),
  ('Wildlife', 'wildlife', 'Native Australian animals and more', '#8b5cf6', 5),
  ('Pets', 'pets', 'Perfect for animal lovers', '#ec4899', 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, slug, description, price, category_id, images, featured, in_stock) VALUES
  (
    'Tropical Paradise Roller Blind',
    'tropical-paradise',
    'Vibrant parrot and tropical leaf design that brings a splash of color to any room',
    199.99,
    (SELECT id FROM categories WHERE slug = 'nature-tropical'),
    ARRAY['/images/collection-nature.jpg'],
    true,
    true
  ),
  (
    'Dino Adventure Kids Blind',
    'dino-adventure',
    'Adorable dinosaur print perfect for nurseries and kids rooms',
    149.99,
    (SELECT id FROM categories WHERE slug = 'kids-nursery'),
    ARRAY['/images/collection-kids.jpg'],
    true,
    true
  ),
  (
    'Ocean Waves Coastal Blind',
    'ocean-waves',
    'Serene ocean view to create a calm coastal atmosphere',
    179.99,
    (SELECT id FROM categories WHERE slug = 'coastal-living'),
    ARRAY['/images/collection-coastal.jpg'],
    true,
    true
  )
ON CONFLICT (slug) DO NOTHING;
