import { useParams } from 'react-router-dom';

// Import product images from assets
import shoe5 from '../assets/sepatu-5.png';
import shoe6 from '../assets/sepatu-6.png';
import shoe7 from '../assets/sepatu-7.png';
import shoe8 from '../assets/sepatu-8.png';

// --- Types and Data ---
type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

const relatedProducts: Product[] = [
  { id: 1, name: 'Nike Air Max 270', image: shoe5, price: 199 },
  { id: 2, name: 'Nike Air VaporMax Utility', image: shoe6, price: 209 },
  { id: 3, name: 'Nike Air VaporMax Utility', image: shoe7, price: 219 },
  { id: 4, name: 'Nike Free RN Flyknit 3.0', image: shoe8, price: 189 },
];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '');

  // Find the product by id
  const product = relatedProducts.find((p) => p.id === productId);
    const recomended = relatedProducts.filter((p) => p.id !== productId);

  if (!product) {
    return (
      <div className="bg-white pt-[200px]">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-900">Product not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-white pt-[200px]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
          {/* --- Image Gallery --- */}
          <div className="relative">
            <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>
          
          {/* --- Product Info --- */}
          <div className="mt-8 lg:mt-0">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>
            
            <div className="mt-4 flex items-center justify-between">
              <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add to bag
            </button>
          </div>
        </div>
        <div className="mt-16 lg:mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-center text-gray-900">You May Also Like</h2>
            <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {recomended.map((product) => (
                    <div key={product.id} className="group relative text-center">
                        <div className="w-full aspect-square overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                            <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center" />
                        </div>
                        <h3 className="mt-4 text-sm font-medium text-gray-700">{product.name}</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;