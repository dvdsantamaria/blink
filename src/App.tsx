import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Collections } from '@/sections/Collections';
import { Products } from '@/sections/Products';
import { HowItWorks } from '@/sections/HowItWorks';
import { Reviews } from '@/sections/Reviews';
import { Features } from '@/sections/Features';
import { Footer } from '@/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: 'none',
          },
        }}
      />
      <Header />
      <main>
        <Hero />
        <Collections />
        <Products />
        <HowItWorks />
        <Reviews />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
