import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, RefreshCw } from 'lucide-react';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { Category, ProductWithCategory } from '@/types/api';

export function Products() {
  const navigate = useNavigate();
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [collections, setCollections] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
      ]);

      setProducts(productsResponse.products);
      setCollections(categoriesResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts =
    selectedCollection === 'all'
      ? products
      : products.filter((p) => p.category.slug === selectedCollection);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(price);
  };

  // Loading state
  if (loading) {
    return (
      <section id="products" className="py-20 lg:py-32 bg-slate-50">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-[3/4] bg-slate-200 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="w-16 h-4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-5 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="products" className="py-20 lg:py-32 bg-slate-50">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <RefreshCw className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Failed to load products
            </h3>
            <p className="text-slate-600 mb-6">{error}</p>
            <Button onClick={loadData} className="bg-slate-900">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 lg:py-32 bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3 block">
              Shop
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Featured designs
            </h2>
            <p className="text-lg text-slate-600">
              Handpicked favorites from our most loved collections.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCollection('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCollection === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              All
            </button>
            {collections.slice(0, 4).map((collection) => (
              <button
                key={collection.id}
                onClick={() => setSelectedCollection(collection.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCollection === collection.slug
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {collection.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500">No products found in this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const specs = product.specifications || {};
              const rating = specs.rating ? parseFloat(specs.rating) : 4.5;
              const reviews = specs.reviews ? parseInt(specs.reviews, 10) : 10;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => navigate(`/product/${product.slug}`)}
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={product.images[0] || ''}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.compare_price && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        Sale
                      </span>
                    )}
                    {!product.in_stock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="px-4 py-2 bg-white text-slate-900 text-sm font-medium rounded-full">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm font-medium text-slate-700">
                        {rating}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-sm text-slate-500">
                        {reviews} reviews
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-slate-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.compare_price && (
                          <span className="text-sm text-slate-400 line-through">
                            {formatPrice(product.compare_price)}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-slate-900 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setSelectedCollection('all');
              navigate('/#products');
            }}
            className="inline-flex items-center gap-2 text-slate-900 font-medium hover:gap-3 transition-all"
          >
            View all products
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
