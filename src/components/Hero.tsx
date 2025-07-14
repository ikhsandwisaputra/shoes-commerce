
import { motion, useScroll, useTransform } from "framer-motion";
// Make sure to place your image in the specified path
// You can use the original shoe from the design or the Jordan as requested
import ShoeImage from '../assets/jordan-shoes.png';

const Hero = () => {
   // 1. Inisialisasi useScroll untuk melacak progres scroll halaman
  const { scrollYProgress } = useScroll();

  // 2. Gunakan useTransform untuk memetakan progres scroll (0 sampai 1) ke nilai animasi
  // Saat scroll dari atas (0) ke bawah (1), gambar akan bergerak ke atas (dari 0px ke -150px)
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // Anda juga bisa menambahkan efek lain, misalnya rotasi
  const rotate = useTransform(scrollYProgress, [0, 1], [-30, 150]);
 return (
   <section className="relative w-full h-fit mt-[100px] flex items-center justify-center bg-[#f0f0f0] overflow-hidden p-4">
     <div className="relative flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl">

       {/* --- Left Text Block ("snea") --- */}
       <motion.div
         className="w-full lg:w-auto"
         initial={{ opacity: 0, x: -50 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
       >
         <div className="relative text-center lg:text-right">
           <h1 className="hidden md:block text-[28vw] sm:text-[200px] lg:text-[250px] font-extrabold tracking-tighter text-black leading-none">
             snea
           </h1>
           <h1 className="md:hidden text-[22vw] sm:text-[100px] lg:text-[250px] font-extrabold tracking-tighter text-black leading-none">
             Sneaker
           </h1>
           <motion.div
             className="absolute -bottom-4 sm:bottom-0 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:bottom-10 lg:-translate-x-0 whitespace-nowrap"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
           >
             <span className="bg-black text-white text-xs sm:text-sm font-bold py-2 px-5">
               NEW CONCEPT FOR SUMMER
             </span>
           </motion.div>
         </div>
       </motion.div>

       {/* --- Shoe Image (Animated) --- */}
      <motion.div
      className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg z-10 my-[-10vw] sm:my-[-80px] lg:my-0 lg:mx-[-100px]"
      // Animasi awal saat komponen muncul tetap ada
      initial={{ opacity: 0, y: -200, rotate: 45 }}
      animate={{ opacity: 1, y: 0, rotate: -30, x: -80 }}
      transition={{
        type: "spring",
        stiffness: 45,
        damping: 20,
        delay: 0.2,
      }}
      // 3. Terapkan nilai dari useTransform ke properti `style`
      // Ini akan menimpa properti 'y' dan 'rotate' dari 'animate' setelah animasi awal selesai
      // dan akan terus diperbarui saat scroll
      style={{ y, rotate }}
    >
      <img
        src={ShoeImage}
        alt="Promotional Sneaker"
        className="w-full h-auto object-contain"
      />
    </motion.div>

       {/* --- Right Text Block ("ker") --- */}
       <motion.div
         className="w-full lg:w-auto"
         initial={{ opacity: 0, x: 50 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
       >
         <div className="relative text-center lg:text-left">
            <motion.div
             className="absolute top-0 left-1/2 -translate-x-1/2 lg:left-0 lg:-translate-x-0 lg:-top-2"
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
           >
             <span className="text-gray-700 font-semibold tracking-[0.2em] text-sm sm:text-base">
               PORSCHE
             </span>
           </motion.div>
           <h1 className="hidden md:block text-[28vw] sm:text-[200px] lg:text-[250px] font-extrabold tracking-tighter text-black leading-none">
             ker
           </h1>
         </div>
       </motion.div>
     </div>
   </section>
 );
};

export default Hero;