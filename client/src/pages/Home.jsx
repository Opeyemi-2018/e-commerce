import { Link } from 'react-router-dom';
import HeadSet from '../assests/Head-Set-2.png'
import { ReactTyped } from "react-typed";
import { MdPhoneIphone } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { GrPersonalComputer } from "react-icons/gr";
import { BsSpeaker } from "react-icons/bs";
import { BsUsbSymbol } from "react-icons/bs";
import { BsSmartwatch } from "react-icons/bs";


const Home = ({showNav, setShowNav}) => {
  return (
    <main className='h-screen'>
     <div className='bg-black'>
       <div className='w-full py-6 hidden sm:block px-3 '>
          <div className='max-w-6xl mx-auto flex gap-10 justify-center '>
            <div className='bg-white px-10 rounded-sm'>
              <div className='flex flex-col gap-4 mt-4'>
                <p className='flex items-center gap-3 text-gray-700'> <span><MdPhoneIphone size={25}/></span> Phones</p>
                <p className='flex items-center gap-3 text-gray-700'> <span><IoGameControllerOutline size={25}/></span>Gaming</p>
                <p className='flex items-center gap-3 text-gray-700'> <span><GrPersonalComputer size={25}/></span>Laptops</p>
                <p className='flex items-center gap-3 text-gray-700'> <span><BsSpeaker size={25}/></span>Speaker</p>
                <p className='flex items-center gap-3 text-gray-700'> <span><BsUsbSymbol size={25}/></span>Phone Accessories</p>
                <p className='flex items-center gap-3 text-gray-700'> <span><BsSmartwatch size={25}/></span>Series</p>
              </div>
            </div>
            <div className='py-2 flex-1'>
                <p className='text-1xl py-3  text-[15px] space-x-10 text-gray-800'>NEW PRODUCT</p>
                <h1 className='md:text-5xl space-x-10 text-white text-2xl font-extrabold'>XX99 MARK II</h1>
                <h1  className='md:text-5xl space-x-10 text-white  text-2xl font-extrabold'>GADGETS</h1>
              <div className='py-4'>
                  <p className='text-white'>shop with us today</p>
                  <ReactTyped className='text-[#ffa45c]' strings={['For Exclusive deal', 'and Enjoy quality products']} typeSpeed={100} backSpeed={20} loop/>
              </div>
              <Link className='bg-[#ffa45c] text-white  p-3'>SEE PRODUCT</Link>
            </div>

            <div>
              <img src={HeadSet} alt="" />
            </div>

          </div>
        </div>

       {/* Landing content for mobile */}
       <div className={`${showNav ? 'absolute z-30 left-0 top-16 inline sm:hidden' : 'absolute z-30 left-[-100%] top-16 inline sm:hidden '}`}>
          <div className='bg-white  px-6 py-4 rounded-sm'>
                <div className='flex flex-col gap-4 mt-4'>
                  <p className='flex items-center gap-3 text-gray-700'> <span><MdPhoneIphone size={25}/></span> Phones</p>
                  <p className='flex items-center gap-3 text-gray-700'> <span><IoGameControllerOutline size={25}/></span>Gaming</p>
                  <p className='flex items-center gap-3 text-gray-700'> <span><GrPersonalComputer size={25}/></span>Laptops</p>
                  <p className='flex items-center gap-3 text-gray-700'> <span><BsSpeaker size={25}/></span>Speaker</p>
                  <p className='flex items-center gap-3 text-gray-700'> <span><BsUsbSymbol size={25}/></span>Phone Accessories</p>
                  <p className='flex items-center gap-3 text-gray-700'> <span><BsSmartwatch size={25}/></span>Series</p>
                </div>
          </div>
        </div>
      <div className='sm:hidden relative w-full py-8 flex items-center justify-center'>
        {/* Content Wrapper */}
       
        <div className='py-2 flex items-center flex-col justify-center z-20'>
          <p className='text-1xl py-3 text-[15px] space-x-10 text-gray-800'>NEW PRODUCT</p>
          <h1 className='md:text-5xl text-white text-2xl font-extrabold'>XX99 MARK II</h1>
          <h1 className='md:text-5xl text-white text-2xl font-extrabold'>GADGETS</h1>
          <div className='py-4 flex items-center flex-col'>
            <p className='text-white'>shop with us today</p>
            <ReactTyped className='text-[#ffa45c]' strings={['For Exclusive deal', 'and Enjoy quality products']} typeSpeed={100} backSpeed={20} loop />
          </div>
          <Link className='bg-[#ffa45c] text-white px-2 py-1'>SEE PRODUCT</Link>
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

// when i'm back i will be implementing the sign out func for my estate app