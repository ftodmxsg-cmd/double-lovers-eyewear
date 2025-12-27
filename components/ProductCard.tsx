
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group cursor-pointer flex flex-col items-center w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] w-full bg-neutral-50 overflow-hidden mb-6">
        <img 
          src={isHovered ? product.images[1] : product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out scale-100 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/5 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className="absolute top-4 left-4 border border-black px-2 py-0.5 text-[9px] font-black tracking-widest uppercase bg-white/90">
          25FW
        </div>
      </div>
      
      <div className="flex flex-col gap-1 items-center text-center px-2">
        <h3 className="text-[14px] font-[900] tracking-tight uppercase leading-tight">{product.name}</h3>
        <p className="text-[12px] text-neutral-400 font-bold mt-1 tracking-tight">${product.price.toFixed(2)}</p>
        
        <div className="flex gap-2 mt-3">
          {product.colors.map(color => (
            <div 
              key={color} 
              className={`w-3.5 h-3.5 rounded-full border border-neutral-200 transition-transform duration-300 hover:scale-125 ${
                color.toLowerCase().includes('black') ? 'bg-black' : 
                color.toLowerCase().includes('smoke') ? 'bg-neutral-600' : 
                color.toLowerCase().includes('onyx') ? 'bg-neutral-900' :
                'bg-neutral-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
