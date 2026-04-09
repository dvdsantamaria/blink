import dotenv from 'dotenv';
dotenv.config();

import { supabaseAdmin } from './utils/supabase';

// Mock data from src/data/products.ts
const collections = [
  {
    id: 'nature',
    name: 'Nature & Tropical',
    description: 'Bring the outdoors in with vibrant tropical prints and botanical designs',
    image: '/images/collection-nature.jpg',
    productCount: 24,
    color: '#22c55e',
  },
  {
    id: 'kids',
    name: 'Kids & Nursery',
    description: 'Playful designs that spark imagination for little ones',
    image: '/images/collection-kids.jpg',
    productCount: 18,
    color: '#f97316',
  },
  {
    id: 'coastal',
    name: 'Coastal Living',
    description: 'Beach-inspired designs for that perfect Australian coastal vibe',
    image: '/images/collection-coastal.jpg',
    productCount: 15,
    color: '#0ea5e9',
  },
  {
    id: 'sports',
    name: 'Sports Fan',
    description: 'Show your team spirit with bold, dynamic designs',
    image: '/images/collection-sports.jpg',
    productCount: 20,
    color: '#ef4444',
  },
  {
    id: 'pets',
    name: 'Pet Lovers',
    description: 'Celebrate your furry friends with adorable pet-themed prints',
    image: '/images/collection-pets.jpg',
    productCount: 16,
    color: '#a16207',
  },
  {
    id: 'wildlife',
    name: 'Australian Wildlife',
    description: 'Native animals and flora that celebrate our unique heritage',
    image: '/images/collection-wildlife.jpg',
    productCount: 12,
    color: '#65a30d',
  },
];

const products = [
  {
    id: 'floral-meadow',
    name: 'Wildflower Meadow',
    description: 'A vibrant celebration of Australian wildflowers in full bloom. Perfect for adding a splash of color to any room.',
    price: 249,
    originalPrice: 299,
    image: '/images/product-floral.jpg',
    category: 'Roller Blinds',
    collection: 'nature',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    sizes: ['60x120cm', '90x150cm', '120x180cm', '150x210cm', '180x240cm'],
    colors: ['Standard', 'Blackout'],
    features: ['UV Protection', 'Easy Clean', 'Child Safe'],
  },
  {
    id: 'space-adventure',
    name: 'Space Adventure',
    description: 'Rockets, planets, and stars create the perfect backdrop for little astronauts. Great for nurseries and kids rooms.',
    price: 199,
    image: '/images/product-space.jpg',
    category: 'Roller Blinds',
    collection: 'kids',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    sizes: ['60x120cm', '90x150cm', '120x180cm'],
    colors: ['Standard', 'Blackout'],
    features: ['Blackout Option', 'Child Safe', 'Easy Install'],
  },
  {
    id: 'geometric-sunset',
    name: 'Geometric Sunset',
    description: 'Bold geometric shapes in warm sunset tones. A contemporary statement piece for modern homes.',
    price: 279,
    image: '/images/product-geometric.jpg',
    category: 'Roller Blinds',
    collection: 'coastal',
    rating: 4.7,
    reviews: 56,
    inStock: true,
    sizes: ['90x150cm', '120x180cm', '150x210cm', '180x240cm'],
    colors: ['Standard', 'Blackout', 'Sheer'],
    features: ['UV Protection', 'Motorized Option'],
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    description: 'Swim with sea turtles and tropical fish in this stunning underwater scene. Brings calm and tranquility to any space.',
    price: 299,
    originalPrice: 349,
    image: '/images/product-ocean.jpg',
    category: 'Roller Blinds',
    collection: 'nature',
    rating: 4.9,
    reviews: 142,
    inStock: true,
    sizes: ['60x120cm', '90x150cm', '120x180cm', '150x210cm'],
    colors: ['Standard', 'Blackout'],
    features: ['Moisture Resistant', 'Easy Clean', 'UV Protection'],
  },
  {
    id: 'tropical-parrots',
    name: 'Tropical Parrots',
    description: 'Colorful macaws and lush foliage bring the rainforest to your windows. A statement piece that never fails to impress.',
    price: 269,
    image: '/images/collection-nature.jpg',
    category: 'Roller Blinds',
    collection: 'nature',
    rating: 4.6,
    reviews: 78,
    inStock: true,
    sizes: ['90x150cm', '120x180cm', '150x210cm', '180x240cm'],
    colors: ['Standard', 'Blackout', 'Sheer'],
    features: ['UV Protection', 'Easy Clean'],
  },
  {
    id: 'dino-friends',
    name: 'Dino Friends',
    description: 'Adorable dinosaurs in soft pastels make bedtime fun. Parents love the blackout option for afternoon naps.',
    price: 189,
    image: '/images/collection-kids.jpg',
    category: 'Roller Blinds',
    collection: 'kids',
    rating: 4.8,
    reviews: 203,
    inStock: true,
    sizes: ['60x120cm', '90x150cm', '120x180cm'],
    colors: ['Standard', 'Blackout'],
    features: ['Blackout Option', 'Child Safe', 'Easy Install'],
  },
  {
    id: 'coastal-waves',
    name: 'Coastal Waves',
    description: 'Gentle ocean waves in soothing blues and whites. Perfect for creating that beach house feel anywhere.',
    price: 259,
    image: '/images/collection-coastal.jpg',
    category: 'Roller Blinds',
    collection: 'coastal',
    rating: 4.7,
    reviews: 91,
    inStock: true,
    sizes: ['90x150cm', '120x180cm', '150x210cm', '180x240cm'],
    colors: ['Standard', 'Blackout', 'Sheer'],
    features: ['UV Protection', 'Moisture Resistant'],
  },
  {
    id: 'team-spirit',
    name: 'Team Spirit',
    description: 'Dynamic geometric design in bold team colors. Perfect for the ultimate fan cave or sports room.',
    price: 229,
    image: '/images/collection-sports.jpg',
    category: 'Roller Blinds',
    collection: 'sports',
    rating: 4.5,
    reviews: 45,
    inStock: true,
    sizes: ['120x180cm', '150x210cm', '180x240cm', '200x270cm'],
    colors: ['Standard', 'Blackout'],
    features: ['UV Protection', 'Easy Clean'],
  },
  {
    id: 'pet-portraits',
    name: 'Pet Portraits',
    description: 'Charming illustrations of cats and dogs that celebrate your love for furry friends. Warm and inviting.',
    price: 239,
    image: '/images/collection-pets.jpg',
    category: 'Roller Blinds',
    collection: 'pets',
    rating: 4.9,
    reviews: 167,
    inStock: true,
    sizes: ['60x120cm', '90x150cm', '120x180cm', '150x210cm'],
    colors: ['Standard', 'Blackout'],
    features: ['Easy Clean', 'Pet Hair Resistant'],
  },
  {
    id: 'outback-mates',
    name: 'Outback Mates',
    description: 'Koalas, kangaroos, and eucalyptus celebrate Australian wildlife. A beautiful nod to our unique fauna.',
    price: 279,
    image: '/images/collection-wildlife.jpg',
    category: 'Roller Blinds',
    collection: 'wildlife',
    rating: 4.8,
    reviews: 112,
    inStock: true,
    sizes: ['90x150cm', '120x180cm', '150x210cm', '180x240cm'],
    colors: ['Standard', 'Blackout', 'Sheer'],
    features: ['UV Protection', 'Easy Clean'],
  },
];

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await supabaseAdmin.from('products').delete().neq('id', '');
    await supabaseAdmin.from('categories').delete().neq('id', '');
    console.log('✅ Existing data cleared\n');

    // Insert categories
    console.log('Inserting categories...');
    const categoryMap = new Map<string, string>(); // slug -> id

    for (let i = 0; i < collections.length; i++) {
      const col = collections[i];
      const { data, error } = await supabaseAdmin
        .from('categories')
        .insert({
          name: col.name,
          slug: col.id,
          description: col.description,
          image: col.image,
          color: col.color,
          sort_order: i,
        })
        .select()
        .single();

      if (error) {
        console.error(`❌ Error inserting category ${col.name}:`, error);
        continue;
      }

      categoryMap.set(col.id, data.id);
      console.log(`✅ Category: ${col.name}`);
    }

    console.log('\nInserting products...');

    // Insert products
    for (const prod of products) {
      const categoryId = categoryMap.get(prod.collection);
      if (!categoryId) {
        console.error(`❌ Category not found for product ${prod.name}`);
        continue;
      }

      const { error } = await supabaseAdmin
        .from('products')
        .insert({
          name: prod.name,
          slug: prod.id,
          description: prod.description,
          short_description: prod.description.slice(0, 100) + '...',
          price: prod.price,
          compare_price: prod.originalPrice || null,
          category_id: categoryId,
          images: [prod.image],
          featured: prod.rating >= 4.8,
          in_stock: prod.inStock,
          sku: `BT-${prod.id.toUpperCase().replace(/-/g, '')}`,
          tags: prod.features,
          specifications: {
            sizes: prod.sizes,
            colors: prod.colors,
            rating: prod.rating,
            reviews: prod.reviews,
          },
        });

      if (error) {
        console.error(`❌ Error inserting product ${prod.name}:`, error);
        continue;
      }

      console.log(`✅ Product: ${prod.name}`);
    }

    console.log('\n🎉 Database seeded successfully!');
    
    // Show summary
    const { count: catCount } = await supabaseAdmin
      .from('categories')
      .select('*', { count: 'exact', head: true });
    
    const { count: prodCount } = await supabaseAdmin
      .from('products')
      .select('*', { count: 'exact', head: true });

    console.log(`\n📊 Summary:`);
    console.log(`   Categories: ${catCount}`);
    console.log(`   Products: ${prodCount}`);

  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seedDatabase();
