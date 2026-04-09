import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

// Admin pages
import { AdminLogin } from '@/pages/admin/Login';
import { AdminLayout } from '@/pages/admin/Layout';
import { AdminDashboard } from '@/pages/admin/Dashboard';

// Public Layout
function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
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

function App() {
  return (
    <BrowserRouter>
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
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          {/* TODO: Add Products and Categories management pages */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
