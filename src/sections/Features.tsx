import { Ruler, Package, Shield, Wrench } from 'lucide-react';
import { features } from '@/data/products';

const iconMap: Record<string, React.ReactNode> = {
  ruler: <Ruler className="w-6 h-6" />,
  package: <Package className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  wrench: <Wrench className="w-6 h-6" />,
};

export function Features() {
  return (
    <section className="py-16 bg-slate-900">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 text-white"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                {iconMap[feature.icon]}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
