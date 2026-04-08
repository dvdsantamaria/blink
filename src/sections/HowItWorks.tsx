import { howItWorks } from '@/data/products';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3 block">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Your perfect blind in 4 steps
          </h2>
          <p className="text-lg text-slate-600">
            We've made it simple to transform your windows. From browsing to installation, 
            we've got you covered.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector Line */}
              {index < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-slate-100" />
              )}

              <div className="relative text-center">
                {/* Step Number */}
                <div className="w-24 h-24 mx-auto mb-6 bg-slate-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-4xl font-bold text-slate-900">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video/Image Section */}
        <div className="mt-20 relative rounded-3xl overflow-hidden">
          <img
            src="/images/hero-bedroom.jpg"
            alt="Beautiful bedroom with printed blinds"
            className="w-full aspect-video object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                See the transformation
              </h3>
              <p className="text-white/80 max-w-md mx-auto mb-6">
                Watch how our customers have transformed their spaces with custom printed blinds.
              </p>
              <button 
                onClick={() => {
                  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
                }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white text-slate-900 rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 5.84a.75.75 0 00-1.06 1.06l4.78 4.78-4.78 4.78a.75.75 0 101.06 1.06l5.25-5.25a.75.75 0 000-1.06L6.3 5.84z" />
                </svg>
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
