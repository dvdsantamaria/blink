import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const scrollToProducts = () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      {/* Background Image - Optimized for LCP */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/collection-nature.jpg"
          alt="Vibrant tropical parrot printed blinds - Custom printed blinds Australia"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-20">
        <div className="max-w-2xl py-20 lg:py-32">
          {/* Value Proposition Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-white">
              Australian Made • 5 Year Warranty • FREE Delivery
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Custom Printed{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">
              Blinds
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2 8C50 4 100 2 150 4C200 6 250 8 298 4"
                  stroke="#14b8a6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-600 mb-4 leading-relaxed max-w-lg">
            Transform your windows with <strong>custom printed roller blinds</strong> delivered 
            Australia-wide. From playful dinosaurs to serene coastlines, we create the perfect 
            design for every room in your home.
          </p>
          
          <p className="text-base text-slate-500 mb-8 max-w-lg">
            Sydney • Melbourne • Brisbane • Perth • Adelaide • Hobart • Darwin • Canberra. 
            FREE measure & quote available. Call{' '}
            <a href="tel:1800676583" className="text-blue-600 hover:underline font-medium">1800 676 583</a>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={scrollToProducts}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-base h-12 px-8 group shadow-lg shadow-emerald-500/25"
              aria-label="Shop custom blind collections"
            >
              Shop Collections
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={scrollToHowItWorks}
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 hover:border-emerald-500 hover:text-emerald-600 text-base h-12 px-8 transition-colors"
              aria-label="See how custom blinds work"
            >
              <Play className="w-4 h-4 mr-2" />
              See How It Works
            </Button>
          </div>

          {/* Trust Badges - E-E-A-T signals */}
          <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-slate-600">
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-semibold text-slate-900">2,500+</p>
                <p className="text-sm text-slate-500">Happy customers</p>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-200 hidden sm:block" />
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-current"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-slate-500">4.9/5 from 500+ reviews</p>
            </div>
            <div className="h-10 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-slate-900">Australian Made</p>
                <p className="text-sm text-slate-500">Since 2019</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        <span className="text-sm text-slate-500">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-slate-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
