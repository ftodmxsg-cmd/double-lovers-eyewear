
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import SupportPage from './components/SupportPage';
import VirtualStylist from './components/VirtualStylist';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { fetchShopifyProducts } from './services/shopifyService';

type View = 'home' | 'productDetail' | 'support';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial data fetch simulation
  useEffect(() => {
    const initData = async () => {
      try {
        const data = await fetchShopifyProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setIsLoading(false);
      }
    };
    initData();
  }, []);

  // Handle-based "Routing" logic
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedProduct]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('productDetail');
  };

  const navigateToHome = () => {
    setSelectedProduct(null);
    setView('home');
  };

  const navigateToSupport = () => {
    setSelectedProduct(null);
    setView('support');
  };

  const navigateToOptical = () => {
    setSelectedProduct(null);
    setView('home');
    setTimeout(() => {
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const addToCart = (product: Product, variantId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.variantId === variantId);
      if (existing) {
        return prev.map(item => item.variantId === variantId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { product, variantId, quantity: 1 }];
    });
  };

  const isHeaderSolid = view !== 'home';
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="relative w-16 h-16">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f3f3" strokeWidth="4" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" className="progress-ring-circle" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <Header 
        onLogoClick={navigateToHome} 
        onSupportClick={navigateToSupport}
        onOpticalClick={navigateToOptical}
        isSolid={isHeaderSolid}
        cartCount={cartCount}
      />
      
      <main className={view === 'home' ? 'pt-0' : 'pt-[110px]'}>
        {view === 'productDetail' && selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={navigateToHome} 
            onAddToCart={(vId) => addToCart(selectedProduct, vId)}
          />
        ) : view === 'support' ? (
          <SupportPage />
        ) : (
          <>
            <Hero />

            <section id="products-section" className="container mx-auto px-6 lg:px-12 py-24 lg:py-40">
              <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-black tracking-[0.4em] text-neutral-300 uppercase">Archive Series 25</span>
                  <h2 className="text-5xl lg:text-[80px] font-[900] tracking-tighter uppercase leading-[0.85] brand-font">
                    BLACK<br/>VISION
                  </h2>
                </div>
                <div className="flex gap-10">
                  <button className="text-[12px] font-[900] border-b-2 border-black pb-1 uppercase tracking-[0.2em] transition-all hover:opacity-50">All</button>
                  <button onClick={navigateToOptical} className="text-[12px] font-[900] text-neutral-300 hover:text-black transition-all pb-1 uppercase tracking-[0.2em]">Optical</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            </section>

            <section className="bg-black py-24 overflow-hidden select-none">
              <div className="whitespace-nowrap flex animate-marquee">
                 {[...Array(8)].map((_, i) => (
                   <div key={i} className="text-[8rem] lg:text-[10rem] font-[900] text-white leading-none tracking-tighter uppercase mx-14 italic">
                     DOUBLE LOVERS 25FW / THE NOIR ARCHIVE /
                   </div>
                 ))}
              </div>
            </section>

            <section className="py-32 lg:py-52 bg-white">
               <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                  <div className="lg:col-span-7 aspect-[16/10] bg-black overflow-hidden group">
                    <img 
                      src="https://picsum.photos/seed/double-editorial-new/1600/1000" 
                      alt="Noir Editorial" 
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 transition-all duration-1000"
                    />
                  </div>
                  <div className="lg:col-span-5 flex flex-col items-start gap-10 lg:pl-10">
                    <span className="text-[11px] font-[900] uppercase tracking-[0.6em] text-neutral-300">Curated Design</span>
                    <h3 className="text-5xl lg:text-7xl font-[900] tracking-tighter uppercase leading-[0.85] brand-font">
                      THE BLACK<br/>MANIFESTO
                    </h3>
                    <p className="text-[15px] leading-relaxed text-neutral-500 font-medium max-w-sm">
                      Exploring the depth of shadows through high-grade acetate. Precision-cut silhouettes that define the modern aesthetic.
                    </p>
                    <button className="group flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em]">
                      <span className="border-b-2 border-black pb-1 group-hover:opacity-40 transition-all">Explore Journal</span>
                      <svg className="w-6 h-6 transform group-hover:translate-x-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
               </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-white pt-40 pb-20 border-t border-neutral-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between gap-24 mb-32">
            <div className="flex flex-col gap-10">
              <h1 className="text-[32px] font-[900] tracking-tighter uppercase leading-none cursor-pointer" onClick={navigateToHome}>DOUBLE LOVERS</h1>
              <div className="flex flex-col gap-3">
                <p className="text-[12px] font-[900] tracking-[0.2em] uppercase">Seoul Base Eyewear Label</p>
                <p className="text-[13px] leading-relaxed text-neutral-400 font-medium max-w-xs">
                  Classic aesthetics fused with contemporary visions. Handcrafted details for the global citizen.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 lg:gap-32">
              <div className="flex flex-col gap-8">
                <h4 className="text-[11px] font-[900] uppercase tracking-widest text-black">Collections</h4>
                <ul className="flex flex-col gap-4 text-[13px] text-neutral-400 font-semibold uppercase tracking-tight">
                  <li><button onClick={navigateToOptical} className="hover:text-black transition-colors text-left uppercase">Optical</button></li>
                  <li><a href="#" className="hover:text-black transition-colors uppercase">25FW Lookbook</a></li>
                  <li><a href="#" className="hover:text-black transition-colors uppercase">Archive</a></li>
                </ul>
              </div>
              <div className="flex flex-col gap-8">
                <h4 className="text-[11px] font-[900] uppercase tracking-widest text-black">Support</h4>
                <ul className="flex flex-col gap-4 text-[13px] text-neutral-400 font-semibold uppercase tracking-tight">
                  <li><button onClick={navigateToSupport} className="hover:text-black transition-colors text-left uppercase">CS Center</button></li>
                  <li><a href="#" className="hover:text-black transition-colors uppercase">Shipping</a></li>
                  <li><a href="#" className="hover:text-black transition-colors uppercase">Returns</a></li>
                </ul>
              </div>
              <div className="hidden md:flex flex-col gap-8">
                <h4 className="text-[11px] font-[900] uppercase tracking-widest text-black">About</h4>
                <ul className="flex flex-col gap-4 text-[13px] text-neutral-400 font-semibold uppercase tracking-tight">
                  <li><a href="#" className="hover:text-black transition-colors uppercase">Journal</a></li>
                  <li><a href="#" className="hover:text-black transition-colors uppercase">Collaboration</a></li>
                  <li><a href="#" className="hover:text-black transition-colors uppercase">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-10">
            <span className="text-[10px] text-neutral-300 font-[900] tracking-[0.3em] uppercase">© 2024 DOUBLE LOVERS CORP. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-12">
               <span className="text-[10px] font-black tracking-[0.4em] uppercase">Seoul</span>
               <span className="text-[10px] font-black tracking-[0.4em] uppercase">Tokyo</span>
               <span className="text-[10px] font-black tracking-[0.4em] uppercase">Paris</span>
            </div>
          </div>
        </div>
      </footer>

      <VirtualStylist />
    </div>
  );
};

export default App;
