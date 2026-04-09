import { useState, useEffect } from 'react';
import { ShoppingBag, Star, Check, Plus, RefreshCw } from 'lucide-react';
import { api } from '@/services/api';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import type { Product } from '@/types';
import type { Category, ProductWithCategory } from '@/types/api';

// Transform API product to frontend Product type
function transformProduct(apiProduct: ProductWithCategory): Product {
  const specs = apiProduct.specifications || {};
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    description: apiProduct.description,
    price: apiProduct.price,
    originalPrice: apiProduct.compare_price,
    image: apiProduct.images[0] || '',
    category: apiProduct.category.name,
    collection: apiProduct.category.slug,
    rating: specs.rating ? parseFloat(specs.rating) : 4.5,
    reviews: specs.reviews ? parseInt(specs.reviews, 10) : 10,
    inStock: apiProduct.in_stock,
    sizes: Array.isArray(specs.sizes) ? specs.sizes : [],
    colors: Array.isArray(specs.colors) ? specs.colors : [],
    features: Array.isArray(specs.features) ? specs.features : (apiProduct.tags || []),
  };
}

// Transform API category to frontend collection format
function transformCategory(apiCategory: Category): {
  id: string;
  name: string;
  description?: string;
  image?: string;
  color: string;
} {
  return {
    id: apiCategory.slug,
    name: apiCategory.name,
    description: apiCategory.description,
    image: apiCategory.image,
    color: apiCategory.color,
  };
}

// Skeleton component for product cards
function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="relative aspect-[3/4] bg-slate-200 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-16 h-4 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="h-5 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 bg-slate-200 rounded animate-pulse" />
        <div className="flex items-center justify-between pt-2">
          <div className="w-20 h-6 bg-slate-200 rounded animate-pulse" />
          <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function Products() {
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<ReturnType<typeof transformCategory>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  // Fetch products and categories on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
        ]);

        const transformedProducts = productsResponse.products.map(transformProduct);
        const transformedCollections = categoriesResponse.map(transformCategory);

        setProducts(transformedProducts);
        setCollections(transformedCollections);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleRetry = () => {
    // Reload the data
    setLoading(true);
    setError(null);
    Promise.all([api.getProducts(), api.getCategories()])
      .then(([productsResponse, categoriesResponse]) => {
        const transformedProducts = productsResponse.products.map(transformProduct);
        const transformedCollections = categoriesResponse.map(transformCategory);
        setProducts(transformedProducts);
        setCollections(transformedCollections);
        toast.success('Products loaded successfully');
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        toast.error('Failed to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filteredProducts =
    selectedCollection === 'all'
      ? products
      : products.filter((p) => p.collection === selectedCollection);

  const handleAddToCart = (product: Product) => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error('Please select a color option');
      return;
    }

    addItem(product, 1, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart!`);
    setSelectedProduct(null);
    setSelectedSize('');
    setSelectedColor('');
  };

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
          {/* Section Header Skeleton */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-xl space-y-4">
              <div className="w-16 h-4 bg-slate-200 rounded animate-pulse" />
              <div className="w-64 h-12 bg-slate-200 rounded animate-pulse" />
              <div className="w-full h-6 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-20 h-10 bg-slate-200 rounded-full animate-pulse" />
              ))}
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <ProductSkeleton key={i} />
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
            <p className="text-slate-600 mb-6 max-w-md">
              {error}
            </p>
            <Button
              onClick={handleRetry}
              className="bg-slate-900 hover:bg-slate-800"
            >
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
                onClick={() => setSelectedCollection(collection.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCollection === collection.id
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
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.originalPrice && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      Sale
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setSelectedSize(product.sizes?.[0] || '');
                      setSelectedColor(product.colors?.[0] || '');
                    }}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-slate-900 hover:text-white"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm font-medium text-slate-700">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-slate-400">•</span>
                    <span className="text-sm text-slate-500">
                      {product.reviews} reviews
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
                      {product.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setSelectedSize(product.sizes?.[0] || '');
                        setSelectedColor(product.colors?.[0] || '');
                      }}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                      <ShoppingBag className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Dialog */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={() => {
          setSelectedProduct(null);
          setSelectedSize('');
          setSelectedColor('');
        }}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {selectedProduct && (
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="aspect-square">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-6 lg:p-8 flex flex-col">
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-sm font-medium">
                      {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                    </span>
                  </div>
                  <DialogTitle className="text-2xl font-bold">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>

                <p className="text-slate-600 mt-4">
                  {selectedProduct.description}
                </p>

                <div className="mt-6 space-y-4">
                  {/* Size Selection */}
                  {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        Size
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                              selectedSize === size
                                ? 'border-slate-900 bg-slate-900 text-white'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color Selection */}
                  {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        Fabric Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                              selectedColor === color
                                ? 'border-slate-900 bg-slate-900 text-white'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {selectedProduct.features && selectedProduct.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full"
                        >
                          <Check className="w-3 h-3" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-slate-900">
                        {formatPrice(selectedProduct.price)}
                      </span>
                      {selectedProduct.originalPrice && (
                        <span className="ml-2 text-lg text-slate-400 line-through">
                          {formatPrice(selectedProduct.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="w-full bg-slate-900 hover:bg-slate-800 h-12"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
