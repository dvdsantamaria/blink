import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag, Star, Check, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import type { ProductWithCategory } from '@/types/api';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await api.getProduct(slug);
        setProduct(data);
        // Set defaults
        const specs = data.specifications || {};
        if (specs.sizes?.length) setSelectedSize(specs.sizes[0]);
        if (specs.colors?.length) setSelectedColor(specs.colors[0]);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const specs = product.specifications || {};
    if (specs.sizes?.length && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (specs.colors?.length && !selectedColor) {
      toast.error('Please select a fabric type');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.images[0] || '',
      category: product.category.name,
      collection: product.category.slug,
      rating: specs.rating ? parseFloat(specs.rating) : 4.5,
      reviews: specs.reviews ? parseInt(specs.reviews, 10) : 10,
      inStock: product.in_stock,
    }, quantity, selectedSize, selectedColor);
    
    toast.success(`${product.name} added to cart!`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h1>
        <p className="text-slate-600 mb-6">The product you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/')} className="bg-slate-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  const specs = product.specifications || {};
  const sizes: string[] = Array.isArray(specs.sizes) ? specs.sizes : [];
  const colors: string[] = Array.isArray(specs.colors) ? specs.colors : [];
  const features: string[] = Array.isArray(product.tags) ? product.tags : [];
  const rating = specs.rating ? parseFloat(specs.rating) : 4.5;
  const reviews = specs.reviews ? parseInt(specs.reviews, 10) : 10;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BT</span>
              </div>
              <span className="font-semibold text-slate-900">Blinds & Tales</span>
            </div>
          </div>
        </div>
      </header>

      {/* Product */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Breadcrumb */}
            <div className="text-sm text-slate-500 mb-4">
              {product.category.name} / {product.name}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-400 fill-current" />
              <span className="font-medium">{rating}</span>
              <span className="text-slate-400">({reviews} reviews)</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-600 mb-6">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-slate-900">
                {formatPrice(product.price)}
              </span>
              {product.compare_price && (
                <span className="text-xl text-slate-400 line-through">
                  {formatPrice(product.compare_price)}
                </span>
              )}
            </div>

            {/* Options */}
            <div className="space-y-6 mb-8">
              {/* Size */}
              {sizes.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg text-sm border-2 transition-all ${
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

              {/* Color */}
              {colors.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">
                    Fabric Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg text-sm border-2 transition-all ${
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

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-3 block">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:border-slate-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:border-slate-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {features.map((feature: string) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full"
                  >
                    <Check className="w-4 h-4" />
                    {feature}
                  </span>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-slate-900 hover:bg-slate-800 h-14 text-lg"
              disabled={!product.in_stock}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
            </Button>

            {/* Stock status */}
            {!product.in_stock && (
              <p className="text-red-500 text-sm mt-2 text-center">
                This product is currently out of stock
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
