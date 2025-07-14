

import { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import { removeItemFromCart } from '@/redux/slices/cartSlice';
import { stripePromise } from '../stripe';



const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ambil cart dan shipping method dari Redux/localStorage
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [shippingMethod] = useState<'pickup' | 'delivery'>(
    (localStorage.getItem('shippingMethod') as 'pickup' | 'delivery') || 'pickup'
  );

  // Hitung subtotal dan total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const shippingCost = shippingMethod === 'delivery' ? 9.0 : 0.0;
  const total = subtotal + shippingCost;

  useEffect(() => {
    // Buat PaymentIntent ketika halaman dibuka
    axios
      .post('http://localhost:3001/create-payment-intent', {
        amount: Math.round(total * 100), // Stripe expects cents
      })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [total]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      alert('Payment failed: ' + result.error.message);
    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      alert('Payment successful!');
      // Kosongkan cart
      cartItems.forEach(item => {
        dispatch(removeItemFromCart(item.id));
      });
      // Redirect ke halaman cart tanpa reload
      navigate('/my-cart');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow mt-[200px]">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <div className="mb-2">Total: <span className="font-semibold">${total.toFixed(2)}</span></div>
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full"
      >
        Bayar ${total.toFixed(2)}
      </button>
    </form>
  );
};


const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckoutPage;
