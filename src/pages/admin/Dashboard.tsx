import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Package, Tags, ShoppingBag, TrendingUp } from 'lucide-react';
import type { ProductWithCategory } from '@/types/api';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    featured: 0,
    inStock: 0,
  });
  const [recentProducts, setRecentProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load products and categories in parallel
      const [productsRes, categoriesRes] = await Promise.all([
        api.getProducts({ limit: 5 }),
        api.getCategories(),
      ]);

      const products: ProductWithCategory[] = productsRes.products;
      const categories = categoriesRes;

      setStats({
        products: productsRes.pagination.total,
        categories: categories.length,
        featured: products.filter((p) => p.featured).length,
        inStock: products.filter((p) => p.in_stock).length,
      });

      setRecentProducts(products.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'bg-blue-500' },
    { label: 'Categories', value: stats.categories, icon: Tags, color: 'bg-green-500' },
    { label: 'Featured', value: stats.featured, icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'In Stock', value: stats.inStock, icon: ShoppingBag, color: 'bg-orange-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your store</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Recent Products</h2>
        </div>
        <div className="divide-y divide-slate-200">
          {recentProducts.map((product) => (
            <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-slate-50">
              <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                {product.images?.[0] ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Package className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-900 truncate">{product.name}</h3>
                <p className="text-sm text-slate-500">{(product as ProductWithCategory).category?.name}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-slate-900">${product.price}</p>
                <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                  product.in_stock 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          ))}
          {recentProducts.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No products yet. Add your first product to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
