import { Link } from 'react-router-dom';
import HeadSet from '../assests/Head-Set-2.png'
import { ReactTyped } from "react-typed";

const Home = () => {
  return (
    <main className='h-screen'>
     <div className='bg-black'>
       <div className='w-full py-6 hidden sm:block px-3 '>
          <div className='max-w-6xl mx-auto flex  justify-between '>
            <div className='py-2'>
                <p className='text-1xl py-3  text-[15px] space-x-10 text-gray-800'>NEW PRODUCT</p>
                <h1 className='md:text-5xl space-x-10 text-white text-2xl font-extrabold'>XX99 MARK II</h1>
                <h1  className='md:text-5xl space-x-10 text-white  text-2xl font-extrabold'>GADGETS</h1>
              <div className='py-4'>
                  <p className='text-white'>shop with us today</p>
                  <ReactTyped className='text-[#ffa45c]' strings={['For Exclusive deal', 'and Enjoy quality products']} typeSpeed={100} backSpeed={20} loop/>
              </div>
              <Link className='bg-[#ffa45c] text-white  p-3'>SEE Product</Link>
            </div>

            <div>
              <img src={HeadSet} alt="" className='md:animate-spin'/>
            </div>

          </div>
        </div>

       {/* Landing content for mobile */}
      <div className='sm:hidden relative w-full py-8 flex items-center justify-center'>
        {/* Content Wrapper */}
        <div className='py-2 flex items-center flex-col justify-center z-30'>
          <p className='text-1xl py-3 text-[15px] space-x-10 text-gray-800'>NEW PRODUCT</p>
          <h1 className='md:text-5xl text-white text-2xl font-extrabold'>XX99 MARK II</h1>
          <h1 className='md:text-5xl text-white text-2xl font-extrabold'>GADGETS</h1>
          <div className='py-4 flex items-center flex-col'>
            <p className='text-white'>shop with us today</p>
            <ReactTyped className='text-[#ffa45c]' strings={['For Exclusive deal', 'and Enjoy quality products']} typeSpeed={100} backSpeed={20} loop />
          </div>
          <Link className='bg-[#ffa45c] text-white px-2 py-1'>SEE Product</Link>
        </div>

        {/* Background Image */}
        <div className='absolute inset-0 flex items-center justify-center z-10'>
          <img src={HeadSet} alt="Headset" className=' md:animate-spin' />
        </div>
      </div>

      </div>
      <div>ggggggggggg</div>
    </main>
  )
}

export default Home