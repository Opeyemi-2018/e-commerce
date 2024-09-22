import { RiDashboardLine } from "react-icons/ri";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { SlHandbag } from "react-icons/sl";
import { PiUsers } from "react-icons/pi";
import { MdCreateNewFolder } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardOrder from "./DashboardOrder";
import DashboardProduct from "./DashboardProduct";


const Dashboard = () => {
  let [tab, setTab] = useState()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="">
        <div className='fixed bg-gray-100 p-4 top-0 bottom-0 left-0 w-60 '>
            <Link  to={'/'}  className="my-4 text-[#ffa45c] font-extrabold text-2xl">XX99</Link>
            <div className="flex flex-col gap-4 mt-6">
                <Link className="flex items-center hover:bg-[#f8e7d8] p-1  gap-3 text-gray-600"> <span><RiDashboardLine size={25}/></span> Dashboard</Link>
                <Link to={'/admin-dashboard?tab=dash-order'} className={`flex items-center gap-3 text-gray-600 ${tab === 'dash-order' ? 'bg-[#f8e7d8] p-1 font-semibold' : null}`}> <span><HiOutlineShoppingCart size={25}/></span> Orders</Link>
                <Link to={'/admin-dashboard?tab=dash-products'}  className={`flex items-center gap-3 text-gray-600 ${tab === 'dash-products' ? 'bg-[#f8e7d8] p-1 font-semibold' : null}`}> <span><SlHandbag size={25}/></span> Products</Link>
                <Link className="flex items-center gap-3 text-gray-600"> <span><PiUsers size={25}/></span> Customers</Link>
                <Link className="flex items-center gap-3 text-gray-600"> <span><VscFeedback size={25}/></span> Feedback</Link>
                <Link to={'/create-product'} className="flex items-center gap-3 text-white transition-all hover:bg-black rounded-md p-2 bg-[#ffa45c]"> <span><MdCreateNewFolder size={25}/></span> Create Product</Link>
            </div>
        </div>

        <div className='ml-64'>
            { tab === 'dash-order' && <DashboardOrder/>}
            { tab === 'dash-products' && <DashboardProduct/>}
        </div>
    </div>
  )
}

export default Dashboard