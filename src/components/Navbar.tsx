import  { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { NavLink } from 'react-router-dom';
import { type RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import UserProfileMenu from './UserProfileMenu';
import {FaCartShopping} from 'react-icons/fa6'
// You can replace these with your preferred icon library, e.g., react-icons
const IconFacebook = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>;
const IconX = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
const IconYoutube = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814a2.506 2.506 0 0 1-1.768 1.768c-1.594.42-7.812.42-7.812.42s-6.218 0-7.812-.42a2.506 2.506 0 0 1-1.768-1.768C2 15.22 2 12 2 12s0-3.22.42-4.814a2.506 2.506 0 0 1 1.768-1.768C5.782 5 12 5 12 5s6.218 0 7.812.418ZM9.75 15.5V8.5l6.5 3.5z" clipRule="evenodd" /></svg>;
const IconInstagram = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 0 1-1.153 1.772 4.902 4.902 0 0 1-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 6.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm-1.002 6.363a4.942 4.942 0 1 1-3.483 8.822 4.942 4.942 0 0 1 3.483-8.822zM12 15.437a3.442 3.442 0 1 0 0-6.884 3.442 3.442 0 0 0 0 6.884zm5.038-8.122a1.237 1.237 0 1 1-2.475 0 1.237 1.237 0 0 1 2.475 0z" clipRule="evenodd" /></svg>;
const IconSearch = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const IconMenu = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const IconClose = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

const navLinks = [
  { name: 'HOME', href: '/', },
  { name: 'COLLECTION', href: '#' },
  { name: 'FOR HIM', href: '#' },
  { name: 'FOR HER', href: '#' },
  { name: 'FOR KIDS', href: '#' },
  { name: 'BRANDS', href: '#' },
];

const socialLinks = [
  { name: 'Facebook', href: '#', icon: <IconFacebook /> },
  { name: 'X', href: '#', icon: <IconX /> },
  { name: 'YouTube', href: '#', icon: <IconYoutube /> },
  { name: 'Instagram', href: '#', icon: <IconInstagram /> },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  // const [login, setLogin] = useState(false);
  const user = useSelector((state: RootState) => state.user.selectedUser);  
 
  // Adjust the selector to match your Redux state structure
  const cartTotal = useSelector((state: RootState) => state.cart?.totalQuantity ?? 0);
  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide navbar only if scrolled past a certain threshold (e.g., 50px)
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);



  return (
    <>
    
      <header
        className={`fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm z-40 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar: Logo */}
          <div className="flex justify-center items-center py-4">
             <a href="#" className="text-center">             
                <span className="text-xs tracking-widest">SNEAKER</span>
                <span className="block text-2xl font-bold tracking-[0.2em]">FLARE</span>
            </a>
          </div>
          
          <hr className="border-t border-gray-200" />

          {/* Bottom Bar: Nav and Actions */}
          <div className="flex justify-between items-center h-16">
            
            {/* Left: Social Media Icons (Desktop) */}
            <div className="hidden lg:flex items-center space-x-5 text-gray-700">
               {socialLinks.map((item) => (
                <a key={item.name} href={item.href} className="hover:text-black transition-colors">
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>

            {/* Center: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex flex-grow justify-center items-center space-x-8">
              {navLinks.map((item) => (
                <NavLink key={item.name} to={item.href} className="text-sm font-medium tracking-wider text-gray-600 hover:text-black transition-colors">
                  {item.name}
                </NavLink>
              ))}
            </nav>

             {/* Mobile: Placeholder for layout balance - ensures right icons stay right */}
            <div className="lg:hidden flex-1"></div>

             {/* Right: Search and Menu Icons */}
            <div className="flex items-center space-x-4">
              <button type="button" className="p-2 text-gray-700 hover:text-black transition-colors">
                <span className="sr-only">Search</span>
                <IconSearch />
              </button>
              {!user[0]?.login && (
                <>
                <NavLink to="/login">
                  <Button variant="outline" size={"sm"} className="cursor-pointer">Login</Button>
                </NavLink>
                <NavLink to="/register">
                  <Button className="cursor-pointer">Register</Button>
                </NavLink>
                </>
              )}
              {user[0]?.login && (
                <>
                <UserProfileMenu></UserProfileMenu>
                <NavLink to={"/my-cart"}>

                <FaCartShopping />
                </NavLink>
                <span id='total-cart'>{cartTotal}</span>
                </>
              )}
              
              {/* Hamburger Menu Button (Mobile) */}
              <button
                onClick={() => setIsMenuOpen(true)}
                type="button"
                className="lg:hidden p-2 text-gray-700 hover:text-black transition-colors"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <IconMenu />
              </button>
            </div>
            
          </div>
        </div>
      </header>

      {/* --- Mobile Menu Overlay --- */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-white"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex justify-between items-center p-4 border-b">
               <a href="#" className="text-left" onClick={() => setIsMenuOpen(false)}>
                    <span className="text-xs tracking-widest">SNEAKER</span>
                    <span className="block text-2xl font-bold tracking-[0.2em]">FLARE</span>
                </a>
              <button
                onClick={() => setIsMenuOpen(false)}
                type="button"
                className="p-2 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <IconClose />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col items-center justify-center flex-grow space-y-8">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-semibold text-gray-800"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Menu Footer: Social Links */}
             <div className="flex justify-center items-center space-x-6 p-6 border-t">
               {socialLinks.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-500 hover:text-black">
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;