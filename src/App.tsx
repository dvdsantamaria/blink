import { Toaster } from '@/components/ui/sonner';
import { SEO } from '@/components/SEO';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Collections } from '@/sections/Collections';
import { Products } from '@/sections/Products';
import { HowItWorks } from '@/sections/HowItWorks';
import { Reviews } from '@/sections/Reviews';
import { Features } from '@/sections/Features';
import { FAQ } from '@/sections/FAQ';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <SEO />
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
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
