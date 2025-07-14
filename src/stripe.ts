import { loadStripe } from '@stripe/stripe-js';

// Ganti dengan publishable key Stripe Anda
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_xxx');
