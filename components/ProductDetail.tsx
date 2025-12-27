
import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (variantId: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(selectedVariant.id);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div className="bg-white min-h-screen pb-24 animate-in fade-in duration-700">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] uppercase mb-12 hover:opacity-50 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="aspect-[4/5] bg-neutral-50 overflow-hidden shadow-sm">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`aspect-[4/5] bg-neutral-50 cursor-pointer overflow-hidden border-2 transition-all ${activeImage === img ? 'border-black' : 'border-transparent hover:border-neutral-200'}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-32 h-fit">
            <div className="border-b border-neutral-100 pb-10 mb-10">
              <span className="text-[10px] font-black tracking-[0.5em] text-neutral-300 uppercase mb-4 block">Shopify Authenticated • 25FW</span>
              <h1 className="text-4xl lg:text-5xl font-[900] tracking-tighter uppercase leading-[0.9] mb-4">{product.name}</h1>
              <p className="text-2xl font-[900] tracking-tight">${selectedVariant.price.toFixed(2)}</p>
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-neutral-400">Selection</h4>
                <div className="flex gap-4">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`group flex flex-col items-center gap-2`}
                    >
                      <div className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${selectedColor === color ? 'border-black' : 'border-transparent hover:border-neutral-200'}`}>
                        <div className={`w-full h-full rounded-full ${
                          color.toLowerCase().includes('black') ? 'bg-black' : 
                          color.toLowerCase().includes('smoke') ? 'bg-neutral-600' : 
                          color.toLowerCase().includes('onyx') ? 'bg-neutral-900' :
                          'bg-neutral-300'
                        }`} />
                      </div>
                      <span className={`text-[8px] font-bold uppercase tracking-widest transition-opacity ${selectedColor === color ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>{color}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-neutral-400">Description</h4>
                <p className="text-[14px] leading-relaxed text-neutral-500 font-medium">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={!product.availableForSale || isAdding}
                  className="w-full py-5 bg-black text-white text-[11px] font-[900] uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all disabled:bg-neutral-300 relative overflow-hidden"
                >
                  <span className={isAdding ? 'opacity-0' : 'opacity-100'}>
                    {product.availableForSale ? 'Add to Cart' : 'Sold Out'}
                  </span>
                  {isAdding && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  )}
                </button>
              </div>

              <div className="flex flex-col gap-2 pt-10 border-t border-neutral-100">
                <details className="group">
                  <summary className="list-none flex justify-between items-center cursor-pointer text-[10px] font-black uppercase tracking-widest py-2">
                    Shipping & Returns
                    <span className="group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <div className="text-[12px] text-neutral-400 font-medium py-4">
                    Secure checkout powered by Shopify. Returns accepted within 14 days.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
