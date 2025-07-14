import  { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '@/redux/slices/cartSlice';

// Import all 8 shoe images
import shoe1 from '../assets/sepatu-1.png';
import shoe2 from '../assets/sepatu-2.png';
import shoe3 from '../assets/sepatu-3.png';
import shoe4 from '../assets/sepatu-4.png';
import shoe5 from '../assets/sepatu-5.png';
import shoe6 from '../assets/sepatu-6.png';
import shoe7 from '../assets/sepatu-7.png';
import shoe8 from '../assets/sepatu-8.png';
import { FaCartShopping } from 'react-icons/fa6';
import { Badge } from './ui/badge';
import { NavLink } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  salePrice?: number;
};

// Sample product data
const products: Product[] = [
  { id: 1, name: 'Cloud White Sneaker', image: shoe1, rating: 5, price: 88.65 },
  { id: 2, name: 'Urban Runner', image: shoe2, rating: 5, price: 95.50 },
  { id: 3, name: 'Porsche Design Evo', image: shoe3, rating: 5, price: 120.00, salePrice: 91.92 },
  { id: 4, name: 'Air Hurache Sunset', image: shoe4, rating: 4, price: 88.65 },
  { id: 5, name: 'Classic Leather Gum', image: shoe5, rating: 5, price: 110.25 },
  { id: 6, name: 'Retro High', image: shoe6, rating: 5, price: 150.00 },
  { id: 7, name: 'All-Terrain Black', image: shoe7, rating: 4, price: 135.00, salePrice: 105.00 },
  { id: 8, name: 'Suede Vintage Pink', image: shoe8, rating: 5, price: 85.00 },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex justify-center text-sm text-black">
    {[...Array(5)].map((_, i) => (
      <span key={i}>{i < rating ? '★' : '☆'}</span>
    ))}
  </div>
);

const Featured = () => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calculate the total scrollable width
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  const handleAddToCart = (product: Product) => {
   try {
     dispatch(
       addItemToCart({
         id: product.id.toString(),
         name: product.name,
         price: product.price,
         image: product.image,
         quantity: 1,
       })
     );

     alert('Product added to cart!');

   } catch (error) {
    console.error(error);
   }
  };

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Section Title --- */}
        <div className="relative text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black relative z-10">
            featured
          </h2>
          <p className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase relative z-10">
            PRODUCTS
          </p>
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[7rem] sm:text-[10rem] font-black text-gray-100/80 -z-0 pointer-events-none">
            SNEAKER
          </span>
        </div>

        {/* --- Mobile Swipe Carousel --- */}
        
      <motion.div ref={carousel} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex space-x-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="min-w-[70vw] sm:min-w-[40vw] lg:min-w-[25vw] text-center relative"
            >
           
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100 relative" >
                 {/* <NavLink to={'/product-details/' + product.id}
            onPointerDownCapture={(e) => e.stopPropagation()}
             
            > */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center pointer-events-none"
                />
                {/* </NavLink> */}
                {product.salePrice && (
                  <span className="absolute top-2 left-0">
                    
                    <Badge className='text-sm'>Sale!</Badge>
                  </span>
                )}
              </div>
               <NavLink to={'/product-details/' + product.id}
            onPointerDownCapture={(e) => e.stopPropagation()}
            >
              <h3 className="mt-4 text-md font-semibold text-gray-900">{product.name}</h3>
                </NavLink>
              <div className="mt-1">
                <StarRating rating={product.rating} />
              </div>
              <div className="mt-2 text-md text-gray-600">
                {product.salePrice ? (
                  <span>
                    <span className="line-through text-gray-400">${product.price.toFixed(2)}</span>{' '}
                    <span className="text-red-600 font-bold">${product.salePrice.toFixed(2)}</span>
                  </span>
                ) : (
                  <span>${product.price.toFixed(2)}</span>
                )}
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="absolute top-2 right-2 bg-black cursor-pointer text-white p-2 rounded-full"
              >
                <FaCartShopping></FaCartShopping>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      </div>
    </section>
  );
};

export default Featured;