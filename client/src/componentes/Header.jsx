import { IoCartOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { TiShoppingBag } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";


const Header = ({showNav, setShowNav}) => {
    let [showPopup, setShowPopup] = useState(false)
    let {loggedInUser} = useSelector((state) => state.user)
  return (
    <header className="w-full bg-black">
        <div className="flex items-center justify-between max-w-6xl mx-auto p-3">
            <div className="font-bold text-2xl text-white">XX99</div>
            
            <nav className="sm:inline hidden">
                <ul className=" flex items-center gap-4 font-semibold text-white">
                    <Link to={'/'}>Home</Link>
                    <Link to={'/product'}>Products</Link>
                    <Link >New Collection</Link>
                </ul>
            </nav>
            

            <div className="flex items-center sm:gap-6 gap-10">
                {loggedInUser ? (
                    <div className="relative">
                        <img onClick={()=> setShowPopup(!showPopup)} src={loggedInUser.avatar} alt="" className="w-6 h-6 rounded-full" />
                        {showPopup && (
                            <div className="absolute z-40 top-12 w-48  -right-2 rounded-sm p-4 bg-white shadow-lg">
                               <div className="flex flex-col gap-3">
                                    <p className="flex items-center text-1xl gap-2 text-gray-700 hover:font-semibold hover:bg-gray-200 p-1"> <span><CgProfile size={20}/></span>My Account</p>
                                    <p className="flex items-center text-1xl gap-2 text-gray-700 hover:font-semibold hover:bg-gray-200 p-1 "> <span><TiShoppingBag size={25}/></span> Orders</p>
                                    <p className="flex items-center text-1xl gap-2 text-gray-700 hover:font-semibold hover:bg-gray-200 p-1 "><span><FaRegHeart size={20}/></span>Saved items</p>
                               </div>
                              <p className="text-[#ffa45c] text-center mt-4 font-semibold text-1xl">LOGOUT</p>
                            </div>
                        )}
                    </div>
                ) : (
                <Link to={'sign-in'} className="bg-white px-2 py-1 rounded-md">Sign-in</Link>
                )}  
                <Link to={'/cart'}><IoCartOutline size={25} className="text-white"/></Link>
                <button className="sm:hidden inline" onClick={()=> setShowNav(!showNav)}>
                   {showNav ?<LiaTimesSolid size={25} className="text-white"/> : <FaBars size={25} className="text-white"/>   
}
                </button>
            </div>
        </div>
        <hr />

        {/* nav for mobile screen */}
        {/* <div className={`sm:hidden overflow-hidden transition-all duration-300
             ${showNav ? 'max-h-screen block' : 'max-h-0'}`}>
            <ul className="flex flex-col gap-4 text-white p-3">
                <Link to={'/'}>Home</Link>
                <Link to={'/product'}>Products</Link>
                <Link >New Collection</Link>
            </ul>
        </div> */}
    </header>
  )
}

export default Header