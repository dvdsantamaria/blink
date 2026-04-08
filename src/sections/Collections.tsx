import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/products';

export function Collections() {
  return (
    <section id="collections" className="py-20 lg:py-32 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 lg:mb-16">
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3 block">
            Collections
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Find your perfect style
          </h2>
          <p className="text-lg text-slate-600">
            From playful nurseries to sophisticated living spaces, explore our 
            curated collections designed for every taste and room.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <a
              key={collection.id}
              href={`#products`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group relative overflow-hidden rounded-2xl bg-slate-100 ${
                index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              {/* Image */}
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full">
                <img
                  src={collection.image}
                  alt={`${collection.name} - Custom printed blinds collection`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={index < 2 ? "eager" : "lazy"}
                  width={800}
                  height={600}
                  decoding="async"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-3"
                      style={{ backgroundColor: collection.color }}
                    >
                      {collection.productCount} designs
                    </span>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">
                      {collection.name}
                    </h3>
                    <p className="text-white/80 text-sm max-w-xs hidden sm:block">
                      {collection.description}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all">
                    <ArrowRight className="w-5 h-5 text-white group-hover:text-slate-900" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
