import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/products';

export function Reviews() {
  return (
    <section id="reviews" className="py-20 lg:py-32 bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-xl">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3 block">
              Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Loved by thousands
            </h2>
            <p className="text-lg text-slate-600">
              See what our customers are saying about their new blinds.
            </p>
          </div>

          {/* Overall Rating */}
          <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-sm">
            <div className="text-center">
              <p className="text-4xl font-bold text-slate-900">4.9</p>
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-current"
                  />
                ))}
              </div>
            </div>
            <div className="h-12 w-px bg-slate-200" />
            <div>
              <p className="font-semibold text-slate-900">500+ Reviews</p>
              <p className="text-sm text-slate-500">Verified customers</p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-slate-200 mb-4" />

              {/* Rating */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i <= testimonial.rating
                        ? 'text-amber-400 fill-current'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full bg-slate-100"
                />
                <div>
                  <p className="font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Product Image */}
              {testimonial.productImage && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-2">Purchased:</p>
                  <img
                    src={testimonial.productImage}
                    alt="Purchased product"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 lg:gap-16">
          {[
            { label: 'Australian Made', sublabel: 'Since 2019' },
            { label: '5 Year Warranty', sublabel: 'Peace of mind' },
            { label: 'Free Shipping', sublabel: 'Australia wide' },
            { label: 'Easy Returns', sublabel: '30 day policy' },
          ].map((badge) => (
            <div key={badge.label} className="text-center">
              <p className="font-semibold text-slate-900">{badge.label}</p>
              <p className="text-sm text-slate-500">{badge.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
