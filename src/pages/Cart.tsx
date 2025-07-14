import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart } from '@/redux/slices/cartSlice';
// Define types based on the provided Redux state structure
interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity?: number; // Assuming quantity is managed in state, default to 1 if not present
}

// Placeholder RootState for demonstration
interface RootState {
  cart: {
    items: CartItem[];
  };
}

// --- Icon Components (Placeholders) ---
const IconArrowLeft = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const IconClose = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const IconPlus = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const IconMinus = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>;

const Cart = () => {
    const dispatch = useDispatch();
  // Fetch cart items from Redux state
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // State for shipping method
  const [shippingMethod, setShippingMethod] = useState<'pickup' | 'delivery'>('pickup');

  // Placeholder functions for actions (would typically dispatch to Redux)
  const handleRemoveItem = (id: number) =>{
      try {
        confirm("Are you sure you want to remove this item from the cart?");
       dispatch(removeItemFromCart(id.toString()));
       alert("Item removed from cart!");    
   } catch (error) {
    console.error(error);
   }
  }
  const handleQuantityChange = (id: number, change: number) => console.log(`Change quantity for ${id} by ${change}`);

  // Calculations
  const shippingCost = shippingMethod === 'delivery' ? 9.00 : 0.00;
  
  // Calculate subtotal based on provided data structure (assuming quantity 1 if not present in data)
  const subtotal = cartItems.reduce((acc, item) => {
    const quantity = item.quantity || 1;
    return acc + item.price * quantity;
  }, 0);

  const total = subtotal + shippingCost;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 ">
      <div className="max-w-6xl mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-xl">
        
        {/* --- Header --- */}
        <div className="flex justify-between items-center mb-8 pt-[150px]">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Cart</h1>
          <a href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-black transition">
            <IconArrowLeft />
            Continue shopping
          </a>
        </div>

        {/* --- Desktop Table Headers --- */}
        <div className="hidden md:grid grid-cols-12 gap-4 border-b pb-2 text-sm font-semibold text-gray-500 uppercase">
          <div className="col-span-5">Product</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-3 text-center">Qty</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        {/* --- Cart Items --- */}
        <div className="divide-y">
          {cartItems.length === 0 ? (
            <p className="py-8 text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => {
              const quantity = item.quantity || 1;
              const itemTotal = item.price * quantity;

              return (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-center">
                  
                  {/* Product Info (Mobile & Desktop) */}
                  <div className="flex items-center col-span-12 md:col-span-5">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain bg-gray-100 p-2 rounded-md" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">ID: #{item.id}</p>
                    </div>
                  </div>

                  {/* Price (Desktop only) */}
                  <div className="hidden md:block col-span-2 text-right font-medium text-gray-800">
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Quantity Adjuster (Mobile & Desktop) */}
                  <div className="col-span-6 md:col-span-3 flex justify-start md:justify-center">
                    <div className="flex items-center border rounded-md">
                      <button onClick={() => handleQuantityChange(item.id, -1)} className="p-2 text-gray-600 hover:bg-gray-100">
                        <IconMinus />
                      </button>
                      <span className="px-4 text-sm font-medium">{quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)} className="p-2 text-gray-600 hover:bg-gray-100">
                        <IconPlus />
                      </button>
                    </div>
                  </div>

                  {/* Total & Remove Button (Mobile & Desktop) */}
                  <div className="col-span-6 md:col-span-2 flex items-center justify-end space-x-4">
                    <span className="text-lg font-bold text-gray-900">${itemTotal.toFixed(2)}</span>
                    <button onClick={() => handleRemoveItem(item.id)} className="text-gray-400 hover:text-red-500">
                      <IconClose />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* --- Footer: Shipping and Summary --- */}
        <div className="mt-10 pt-6 border-t flex flex-col lg:flex-row justify-between gap-8">
          
          {/* Shipping Mode */}
          <div className="lg:w-1/2">
            <h3 className="text-lg font-semibold mb-4">Choose shipping mode:</h3>
            
            <div className="space-y-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value="pickup"
                  checked={shippingMethod === 'pickup'}
                  onChange={() => setShippingMethod('pickup')}
                  className="form-radio h-5 w-5 text-red-500 focus:ring-red-500"
                />
                <div className="ml-4">
                  <p className="text-sm font-medium">
                    Store pickup (in 20 min) · <span className="font-bold text-green-600">FREE</span>
                  </p>
                </div>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value="delivery"
                  checked={shippingMethod === 'delivery'}
                  onChange={() => setShippingMethod('delivery')}
                  className="form-radio h-5 w-5 text-red-500 focus:ring-red-500"
                />
                <div className="ml-4">
                  <p className="text-sm font-medium">
                    Delivery at home (Under 2-4 days) · <span className="font-bold">${(9.00).toFixed(2)}</span>
                  </p>
                  <p className="text-xs text-gray-500">At 45 Glenridge Ave. Brooklyn, NY 11230</p>
                </div>
              </label>
            </div>
          </div>

          {/* Summary & Checkout */}
          <div className="lg:w-1/3">
            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal TTC</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium">{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'Free'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold flex justify-between items-center hover:bg-red-600 transition"
              disabled={cartItems.length === 0}
              onClick={() => {
                // Simpan shipping method ke localStorage agar bisa diakses di halaman Checkout
                localStorage.setItem('shippingMethod', shippingMethod);
                window.location.href = '/checkout';
              }}
            >
              <span>Checkout</span>
              <span>${total.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;