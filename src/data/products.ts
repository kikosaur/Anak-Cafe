import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Signature Blend Coffee',
    category: 'beans',
    price: 14.99,
    description: 'Our signature house blend combines carefully selected Arabica beans from Ethiopia and Colombia, creating a perfectly balanced coffee with notes of chocolate, caramel, and a hint of citrus.',
    image: 'https://images.pexels.com/photos/4920603/pexels-photo-4920603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: true,
    inStock: true,
  },
  {
    id: 2,
    name: 'Ethiopia Yirgacheffe',
    category: 'beans',
    price: 16.99,
    description: 'This exceptional single-origin coffee from the highlands of Ethiopia offers a bright, floral cup with notes of bergamot, jasmine, and lemon zest. A truly remarkable coffee experience.',
    image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: true,
    inStock: true,
  },
  {
    id: 3,
    name: 'Cold Brew Concentrate',
    category: 'ready-to-drink',
    price: 12.99,
    description: 'Our smooth, ready-to-drink cold brew is steeped for 18 hours to create a naturally sweet, less acidic coffee experience. Just add water or milk to your preference.',
    image: 'https://images.pexels.com/photos/2615323/pexels-photo-2615323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    inStock: true,
  },
  {
    id: 4,
    name: 'Ceramic Pour Over Set',
    category: 'equipment',
    price: 42.99,
    description: 'This elegant ceramic pour-over set includes a dripper, server, and reusable filter. The perfect way to brew a clean, flavorful cup that highlights the nuances of your favorite coffee.',
    image: 'https://images.pexels.com/photos/6542554/pexels-photo-6542554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: true,
    inStock: true,
  },
  {
    id: 5,
    name: 'Guatemala Antigua',
    category: 'beans',
    price: 15.99,
    description: 'Grown in volcanic soil at high altitude, this Guatemalan coffee delivers a rich, full-bodied cup with notes of chocolate, spice, and a subtle smoky finish.',
    image: 'https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    inStock: true,
  },
  {
    id: 6,
    name: 'Espresso Blend',
    category: 'beans',
    price: 15.99,
    description: 'Specially formulated for espresso, this blend creates a rich crema and balanced flavor profile with notes of dark chocolate, hazelnut, and caramel.',
    image: 'https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    inStock: true,
  },
  {
    id: 7,
    name: 'Hand Grinder',
    category: 'equipment',
    price: 34.99,
    description: 'This premium manual coffee grinder features ceramic conical burrs for a consistent grind, adjustable settings, and a sleek, portable design perfect for home or travel.',
    image: 'https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    inStock: true,
  },
  {
    id: 8,
    name: 'Colombia Supremo',
    category: 'beans',
    price: 14.99,
    description: 'Sourced from high-altitude farms in the Huila region, this Colombian coffee offers a smooth, well-balanced cup with notes of caramel, apple, and a honey-like sweetness.',
    image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    inStock: true,
  },
  {
    id: 9,
    name: 'Travel Tumbler',
    category: 'equipment',
    price: 29.99,
    description: 'Keep your coffee hot for up to 6 hours with this vacuum-insulated stainless steel tumbler. Featuring a leak-proof lid and sleek design in our signature colors.',
    image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    inStock: true,
  },
  {
    id: 10,
    name: 'Decaf Process Blend',
    category: 'beans',
    price: 15.99,
    description: 'Our Swiss Water Process decaf offers all the flavor without the caffeine. Enjoy notes of chocolate, nuts, and caramel with a smooth finish any time of day.',
    image: 'https://images.pexels.com/photos/2252000/pexels-photo-2252000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    featured: false,
    inStock: true,
  },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};