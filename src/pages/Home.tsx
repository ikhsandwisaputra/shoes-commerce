
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import BestSeller from '../components/BestSeller'
import useLenis from '@/components/Lenis';

const Home = () => {
    useLenis();
  return (
    <>
    <div className='overflow-x-hidden'>
    <Hero></Hero>
    <Featured></Featured>
    <BestSeller/>
    </div>
  
    </>
  )
}

export default Home