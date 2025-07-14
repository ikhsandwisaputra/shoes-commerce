
// --- Placeholder Icon Components ---
// You can replace these with your actual SVG icons or an icon library
const IconVisa = () => <svg className="w-10 h-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.3 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.7 0 35 0Z" fill="#282828"/><path d="M22.5 14.2L21.2 5.2H24.8L26.1 14.2H22.5ZM17.2 5.2L14.4 15.1C14.1 16.3 13.8 17 13.3 17.3C12.9 17.6 12.2 17.8 11.3 17.8C10.6 17.8 10.1 17.7 9.8 17.6L9.4 18.4C9.8 18.6 10.7 18.8 11.8 18.8C13.8 18.8 15.1 17.8 15.9 15.6L18.8 5.2H17.2ZM29.6 12.3C29.6 11.5 29.5 11 29.4 10.7C29.2 10.4 28.7 10.2 27.9 10.2C27.3 10.2 26.9 10.3 26.6 10.5L26.3 9.7C26.7 9.5 27.4 9.2 28.3 9.2C29.7 9.2 30.6 9.8 30.6 10.9C30.6 11.4 30.4 11.9 30.1 12.2C29.9 12.5 29.6 12.7 29.6 12.9C29.6 13.1 29.8 13.4 30.3 13.6L30.7 13.8C31.5 14.1 31.9 14.6 31.9 15.3C31.9 16.3 31 17.1 29.4 17.1C28.2 17.1 27.4 16.7 27 16.2L27.4 15.4C27.7 15.8 28.4 16.1 29.1 16.1C29.8 16.1 30.2 15.8 30.2 15.3C30.2 15 30.1 14.8 29.2 14.5L28.8 14.3C28 14 27.7 13.5 27.7 12.8C27.7 11.9 28.5 11.2 29.6 11.2C30.4 11.2 30.9 11.4 31.2 11.7L31.6 10.9C31.2 10.6 30.6 10.2 29.6 10.2C29.6 12.3 29.6 12.3 29.6 12.3ZM8.2 11.9L6.1 5.2H2.4L5.6 18.6C6 18.6 6.5 18.5 7 18.3L7.7 15.8L4.6 6.3L7.8 15.1L8.2 11.9Z" fill="#fff"/></svg>;
const IconMastercard = () => <svg className="w-10 h-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="38" height="24" rx="3" fill="#282828"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/><path d="M20 12C20 14.7614 17.7614 17 15 17C12.2386 17 10 14.7614 10 12C10 9.23858 12.2386 7 15 7C17.7614 7 20 9.23858 20 12Z" fill="#FF5F00"/></svg>;
const IconAmex = () => <svg className="w-10 h-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="38" height="24" rx="3" fill="#006FCF"/><path d="M12 7H26V17H12V7Z" fill="#fff"/><path d="M13 8V16H14.5L16 13.3137L17.5 16H19V8H17.5V13L16 10L14.5 13V8H13ZM20 8V16H25V14.5H21.5V12.5H24.5V11H21.5V9.5H25V8H20Z" fill="#006FCF"/></svg>;
const IconPaypal = () => <svg className="w-10 h-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="38" height="24" rx="3" fill="#282828"/><path d="M12.316 10.25H16.828C16.828 10.25 17.656 10.219 18.271 10.844C18.685 11.258 18.828 12.188 18.424 13.125C18.021 14.062 17.224 14.469 16.482 14.469H14.383L13.896 17.344H11.591L12.316 10.25ZM19.68 8.656C19.193 8.24204 18.497 8 17.539 8H11.232L10 16.406V17.344H12.924L13.06 16.406L13.128 16.438H13.44C13.44 16.438 15.341 16.344 16.966 14.938C18.247 13.844 18.904 12.125 19.128 10.75C19.351 9.71875 19.68 8.656 19.68 8.656ZM20.086 11.188C19.862 12.562 19.206 14.25 17.789 15.375C16.372 16.5 14.472 16.688 14.472 16.688H13.862L13.727 17.344H12.523L13.795 8H18.472C19.461 8 20.227 8.219 20.789 8.688C20.789 8.688 20.612 9.75 20.086 11.188Z" fill="#fff"/></svg>;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#282828] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-y-6">
          
          {/* Copyright - On mobile, it's at the bottom. On desktop, it's on the left. */}
          <div className="text-xs text-center md:text-left order-3 md:order-1">
            Copyright © {currentYear} Flare. All Rights Reserved.
          </div>

          {/* Logo - On mobile, it's at the top. On desktop, it's in the center. */}
          <div className="order-1 md:order-2">
            <a href="#" className="text-center text-white">
                <span className="text-xs tracking-widest opacity-80">SNEAKER</span>
                <span className="block text-3xl font-bold tracking-[0.2em]">FLARE</span>
            </a>
          </div>

          {/* Payment Icons - On mobile, it's in the middle. On desktop, it's on the right. */}
          <div className="flex items-center space-x-2 order-2 md:order-3">
            <IconVisa />
            <IconMastercard />
            <IconAmex />
            <IconPaypal />
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;