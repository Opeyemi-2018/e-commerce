import { MdFacebook } from "react-icons/md";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagramSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='bg-black p-10'>
      <div className='max-w-6xl mx-auto'>
        <div className="flex sm:flex-row flex-col gap-3 items-center justify-between">
          <h1 className='text-white uppercase font-bold  underline'>xx99</h1>
          <ul className='uppercase  flex items-center gap-3 text-white'>
            <Link to={'/'}>Home</Link>
            <Link to={'/cart'}>cart</Link>
            <Link>about</Link>
          </ul>
        </div>

        <div className="flex sm:flex-row flex-col gap-3 justify-between text-white mt-5">
          <p className="text-gray-500 text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores, nobis?</p>
          <div className="flex items-center sm:mt-0 mt-4 gap-4  justify-center">
            <MdFacebook size={20}/>
            <RiTwitterXFill size={20}/>
            <FaInstagramSquare size={20}/>
          </div>
        </div>
        <p className="mt-6 text-gray-500 sm:text-left text-center capitalize">copyright &copy;{new Date().getFullYear()}. all right reserved</p>
      </div>
    </div>
  )
}

export default Footer