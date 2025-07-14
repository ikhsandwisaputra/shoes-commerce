

// Import the images you need. We'll use the same ones from before.
import shoe1 from '../assets/sepatu-1.png';
import shoe2 from '../assets/sepatu-2.png';
import shoe3 from '../assets/sepatu-3.png';
import shoe4 from '../assets/sepatu-4.png';
import shoe5 from '../assets/sepatu-5.png';
import shoe6 from '../assets/sepatu-6.png';
import shoe7 from '../assets/sepatu-7.png';

type Product = {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  salePrice?: number;
};

// Data for this specific layout. The first product is the large one.
const mainProduct: Product = { id: 1, name: 'Porsche Sneaker', image: shoe3, rating: 5, price: 120.00, salePrice: 91.92 };

const otherProducts: Product[] = [
  { id: 2, name: 'Yezzy Style Sneaker', image: shoe5, rating: 4, price: 14.42 },
  { id: 3, name: 'White Sneaker', image: shoe1, rating: 4, price: 88.65 },
  { id: 4, name: 'Ninja Style Sneaker', image: shoe4, rating: 4, price: 14.42, salePrice: 11.54 },
  { id: 5, name: 'Creative Sneaker', image: shoe7, rating: 3, price: 14.42, salePrice: 11.54 },
  { id: 6, name: 'Blow Sneaker', image: shoe2, rating: 4, price: 88.65 },
  { id: 7, name: 'Apuzzle Sneaker', image: shoe6, rating: 4, price: 14.42 },
];


const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex justify-center text-sm text-black">
    {[...Array(5)].map((_, i) => (
      <span key={i}>{i < rating ? '★' : '☆'}</span>
    ))}
  </div>
);

const ProductPrice = ({ price, salePrice }: { price: number; salePrice?: number }) => (
  <div className="mt-2 text-md text-gray-600">
    {salePrice ? (
      <span>
        <span className="line-through text-gray-400">${price.toFixed(2)}</span>{' '}
        <span className="text-red-600 font-bold">${salePrice.toFixed(2)}</span>
      </span>
    ) : (
      <span>${price.toFixed(2)}</span>
    )}
  </div>
);


const BestSeller = () => {
  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- Section Title --- */}
        <div className="relative text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black relative z-10">
            best seller
          </h2>
          <p className="text-sm font-medium text-gray-500 tracking-[0.2em] uppercase relative z-10">
            PRODUCTS
          </p>
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[7rem] sm:text-[10rem] font-black text-gray-100/80 -z-0 pointer-events-none">
            PRODUCT
          </span>
        </div>

        {/* --- Main Grid Container --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">

          {/* Left Column: Large Product (Mobile: Full Width, Desktop: Spans 2 Cols) */}
          <div className="lg:col-span-2 mb-12 lg:mb-0 text-center">
            <div className="group relative">
              <div className="w-full bg-gray-100 rounded-md p-8">
                <img
                  src={mainProduct.image}
                  alt={mainProduct.name}
                  className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
               {mainProduct.salePrice && (
                  <span className="absolute top-4 left-4 bg-white text-black text-xs font-semibold px-2 py-1 rounded-full">
                    sale!
                  </span>
                )}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">{mainProduct.name}</h3>
            <div className="mt-2">
              <StarRating rating={mainProduct.rating} />
            </div>
            <ProductPrice price={mainProduct.price} salePrice={mainProduct.salePrice} />
          </div>

          {/* Right Column: Small Products Grid (Mobile: 2-Col Grid, Desktop: 2-Col Grid inside a single parent col) */}
          <div className="lg:col-span-1 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6">
            {otherProducts.map((product) => (
              <div key={product.id} className="group relative text-center">
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center" />
                   {product.salePrice && (
                    <span className="absolute top-2 left-2 bg-white text-black text-xs font-semibold px-2 py-1 rounded-full">
                      sale!
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-gray-900">{product.name}</h3>
                <div className="mt-1">
                  <StarRating rating={product.rating} />
                </div>
                <ProductPrice price={product.price} salePrice={product.salePrice} />
              </div>
            ))}
          </div>
        </div>

        {/* --- View All Button --- */}
        <div className="mt-16 text-center">
          <button
            type="button"
            className="px-8 py-3 border border-gray-300 bg-white text-sm font-medium text-gray-800 hover:bg-black hover:text-white hover:border-black transition-colors duration-300"
          >
            VIEW ALL PRODUCTS
          </button>
        </div>

      </div>
    </section>
  );
};

export default BestSeller;