import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function cleanupDatabase() {
  console.log('🧹 Cleaning up database...\n');

  try {
    // 1. Get all products
    const { data: products, error: productsError } = await supabaseAdmin
      .from('products')
      .select('id, name, slug, category_id');

    if (productsError) throw productsError;

    console.log(`Found ${products?.length || 0} products`);

    // 2. Fix "!!!" in product names
    const productsToFix = products?.filter(p => p.name.includes('!!!')) || [];
    for (const product of productsToFix) {
      const newName = product.name.replace(/!!!/g, '').trim();
      console.log(`Fixing: "${product.name}" → "${newName}"`);
      await supabaseAdmin
        .from('products')
        .update({ name: newName })
        .eq('id', product.id);
    }

    // 3. Find duplicates by slug
    const slugCounts: Record<string, string[]> = {};
    for (const product of products || []) {
      if (!slugCounts[product.slug]) {
        slugCounts[product.slug] = [];
      }
      slugCounts[product.slug].push(product.id);
    }

    // 4. Delete duplicates (keep the first one)
    const duplicates = Object.entries(slugCounts).filter(([_, ids]) => ids.length > 1);
    for (const [slug, ids] of duplicates) {
      console.log(`\nDuplicate slug "${slug}": ${ids.length} products`);
      // Keep first, delete others
      const toDelete = ids.slice(1);
      for (const id of toDelete) {
        console.log(`  Deleting product ID: ${id}`);
        await supabaseAdmin.from('products').delete().eq('id', id);
      }
    }

    // 5. Clean up categories - keep only the ones from seed (by sort_order)
    const { data: categories } = await supabaseAdmin
      .from('categories')
      .select('id, name, slug, sort_order');

    console.log(`\nFound ${categories?.length || 0} categories`);

    const catSlugs: Record<string, string[]> = {};
    for (const cat of categories || []) {
      if (!catSlugs[cat.slug]) {
        catSlugs[cat.slug] = [];
      }
      catSlugs[cat.slug].push(cat.id);
    }

    const catDuplicates = Object.entries(catSlugs).filter(([_, ids]) => ids.length > 1);
    for (const [slug, ids] of catDuplicates) {
      console.log(`\nDuplicate category slug "${slug}": ${ids.length} categories`);
      // Keep the one with lowest sort_order (from seed)
      const cats = categories?.filter(c => ids.includes(c.id)) || [];
      cats.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
      const toDelete = cats.slice(1).map(c => c.id);
      for (const id of toDelete) {
        console.log(`  Deleting category ID: ${id}`);
        await supabaseAdmin.from('categories').delete().eq('id', id);
      }
    }

    console.log('\n✅ Cleanup complete!');

  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    process.exit(1);
  }
}

cleanupDatabase();
