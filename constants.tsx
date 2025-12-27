
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'cigarette-deep-black',
    name: 'CIGARETTE - DEEP BLACK',
    price: 158.00,
    category: 'Sunglasses',
    images: [
      'https://picsum.photos/seed/blackglasses1/800/1000',
      'https://picsum.photos/seed/blackglasses1-alt/800/1000'
    ],
    description: 'Ultra-slim rectangular frame in polished black acetate with midnight lenses.',
    colors: ['Polished Black', 'Matte Black'],
    availableForSale: true,
    variants: [
      { id: 'gid://shopify/ProductVariant/101', title: 'Standard', price: 158.00, availableForSale: true }
    ]
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'noir-revolver',
    name: 'NOIR REVOLVER',
    price: 185.00,
    category: 'Optical',
    images: [
      'https://picsum.photos/seed/blackglasses2/800/1000',
      'https://picsum.photos/seed/blackglasses2-alt/800/1000'
    ],
    description: 'Classic oversized aviator reimagined in a heavy black obsidian finish.',
    colors: ['Obsidian'],
    availableForSale: true,
    variants: [
      { id: 'gid://shopify/ProductVariant/201', title: 'Standard', price: 185.00, availableForSale: true }
    ]
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'shadow-dream',
    name: 'SHADOW DREAM',
    price: 142.00,
    category: 'Sunglasses',
    images: [
      'https://picsum.photos/seed/blackglasses3/800/1000',
      'https://picsum.photos/seed/blackglasses3-alt/800/1000'
    ],
    description: 'Semi-transparent smoke frames with solid black gradient lenses.',
    colors: ['Smoke Black', 'Solid Black'],
    availableForSale: true,
    variants: [
      { id: 'gid://shopify/ProductVariant/301', title: 'Standard', price: 142.00, availableForSale: true }
    ]
  },
  {
    id: 'gid://shopify/Product/4',
    handle: 'onyx-architect',
    name: 'ONYX ARCHITECT',
    price: 210.00,
    category: 'Optical',
    images: [
      'https://picsum.photos/seed/blackglasses4/800/1000',
      'https://picsum.photos/seed/blackglasses4-alt/800/1000'
    ],
    description: 'Handcrafted black acetate frames with structural gunmetal details.',
    colors: ['Onyx Black'],
    availableForSale: true,
    variants: [
      { id: 'gid://shopify/ProductVariant/401', title: 'Standard', price: 210.00, availableForSale: true }
    ]
  },
  {
    id: 'gid://shopify/Product/5',
    handle: 'midnight-club',
    name: 'MIDNIGHT CLUB',
    price: 165.00,
    category: 'Sunglasses',
    images: [
      'https://picsum.photos/seed/blackglasses5/800/1000',
      'https://picsum.photos/seed/blackglasses5-alt/800/1000'
    ],
    description: 'Bold chunky black frames designed for the deep night and bright mornings.',
    colors: ['Pitch Black'],
    availableForSale: true,
    variants: [
      { id: 'gid://shopify/ProductVariant/501', title: 'Standard', price: 165.00, availableForSale: true }
    ]
  },
  {
    id: 'gid://shopify/Product/6',
    handle: 'jet-modernist-01',
    name: 'JET MODERNIST 01',
    price: 195.00,
    category: 'Collab',
    images: [
      'https://picsum.photos/seed/blackglasses6/800/1000',
      'https://picsum.photos/seed/blackglasses6-alt/800/1000'
    ],
    description: 'Limited edition collaboration featuring sandblasted matte black finishes.',
    colors: ['Matte Jet'],
    availableForSale: true,
    variants: [
      { id: 'gid://shopify/ProductVariant/601', title: 'Standard', price: 195.00, availableForSale: true }
    ]
  }
];
