// Mock data for development when Supabase is not configured
export const mockCategories = [
  {
    id: '1',
    name: 'Nature & Tropical',
    slug: 'nature-tropical',
    description: 'Bring the outdoors in',
    color: '#22c55e',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Coastal Living',
    slug: 'coastal-living',
    description: 'Beach vibes',
    color: '#0ea5e9',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Kids & Nursery',
    slug: 'kids-nursery',
    description: 'Playful designs',
    color: '#f59e0b',
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const mockProducts = [
  {
    id: '1',
    name: 'Tropical Paradise Roller Blind',
    slug: 'tropical-paradise',
    description: 'Vibrant parrot design',
    price: 199.99,
    category_id: '1',
    images: ['/images/collection-nature.jpg'],
    featured: true,
    in_stock: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Ocean Waves Blind',
    slug: 'ocean-waves',
    description: 'Serene ocean view',
    price: 179.99,
    category_id: '2',
    images: ['/images/collection-coastal.jpg'],
    featured: true,
    in_stock: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const isMockMode = !process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY;
