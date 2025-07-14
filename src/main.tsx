import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ProductDetails from './pages/ProductDetails';
import NotFoundPage from './pages/NotFoundPage';
import Cart from './pages/Cart';
import CheckoutPage from './pages/Checkout';


createRoot(document.getElementById('root')!).render(
      
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/shoes-commerce">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product-details/:id" element={<ProductDetails />}/>
            <Route path="*" element={<NotFoundPage />}></Route>
            <Route path='/my-cart' element={<Cart />}></Route>
            <Route path='/checkout' element={<CheckoutPage />}></Route>
            
          </Routes>
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
