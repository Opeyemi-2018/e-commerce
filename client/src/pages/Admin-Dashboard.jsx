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
import DashboardCustomers from "./DashboardCustomers";
import DashFeedback from "./DashFeedback";
import DashOverview from "./DashOverview";
import { FaBars } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { IoIosArrowForward } from "react-icons/io";

const Dashboard = () => {
  let [tab, setTab] = useState();
  let [showSideBar, setShowSidebar] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="relative bg-gray-100 min-h-screen">
      {/* <span
        onClick={() => setShowSidebar(!showSideBar)}
        className="absolute right-3 top-3 text-2xl md:hidden cursor-pointer z-30"
        // absolute positioning for independent placement
      >
        {showSideBar ? <LiaTimesSolid /> : <FaBars />}
      </span> */}

      <div className="">
        <div
          className={`fixed z-20 md:inline hidden bg-[#ffa45c] rounded-md  p-4  top-3 bottom-3  left-3 w-60  `}
        >
          <Link to={"/"} className="my-4  text-white font-extrabold text-2xl">
            XX99
          </Link>

          <div className="flex flex-col gap-4 mt-6 ">
            <Link
              to={"/admin-dashboard?tab=dash-overview"}
              className={`flex items-center gap-3 p-1 font-semibold rounded-md text-white  hover:bg-[#fdcda6] ${
                tab === "dash-overview" ? "bg-[#fdcda6] " : null
              }`}
            >
              {" "}
              <span>
                <RiDashboardLine size={25} />
              </span>{" "}
              <h1 className="">Dashboard</h1>
            </Link>
            <Link
              onClick={() => setShowSidebar(showSideBar)}
              to={"/admin-dashboard?tab=dash-order"}
              className={`flex items-center gap-3 p-1 font-semibold rounded-md text-white  hover:bg-[#fdcda6] ${
                tab === "dash-order" ? "bg-[#fdcda6] " : null
              }`}
            >
              {" "}
              <span>
                <HiOutlineShoppingCart size={25} />
              </span>{" "}
              <h1 className="">Orders</h1>
            </Link>
            <Link
              onClick={() => setShowSidebar(showSideBar)}
              to={"/admin-dashboard?tab=dash-products"}
              className={`flex items-center gap-3 p-1 font-semibold rounded-md text-white  hover:bg-[#fdcda6] ${
                tab === "dash-products" ? "bg-[#fdcda6] " : null
              }`}
            >
              {" "}
              <span>
                <SlHandbag size={25} />
              </span>{" "}
              <h1 className="">Products</h1>
            </Link>
            <Link
              onClick={() => setShowSidebar(showSideBar)}
              to={"/admin-dashboard?tab=dash-customers"}
              className={`flex items-center gap-3 p-1 font-semibold rounded-md text-white  hover:bg-[#fdcda6] ${
                tab === "dash-customers" ? "bg-[#fdcda6] " : null
              }`}
            >
              {" "}
              <span>
                <PiUsers size={25} />
              </span>{" "}
              <h1 className="">Customers</h1>{" "}
            </Link>

            <Link
              to={"/admin-dashboard?tab=dash-feedback"}
              className={`flex items-center gap-3 p-1 font-semibold rounded-md text-white  hover:bg-[#fdcda6] ${
                tab === "dash-feedback" ? "bg-[#fdcda6] " : null
              }`}
            >
              {" "}
              <span>
                <VscFeedback size={25} />
              </span>{" "}
              <h1 className="">Feedback</h1>
            </Link>
            <Link
              to={"/create-product"}
              className="flex items-center gap-3 text-black transition-all hover:text-white hover:bg-black rounded-md md:p-2 p-1 bg-white"
            >
              {" "}
              <span>
                <MdCreateNewFolder size={25} />
              </span>{" "}
              <h1 className="">Create Product</h1>
            </Link>
          </div>
        </div>
      </div>

      {/* mobile side bar  */}

      <div
        className={`fixed z-20 md:hidden inline bg-[#ffa45c]  rounded-none  px-1 py-3  top-0  bottom-0  left-0 transition-all duration-300 ${
          showSideBar ? "w-52" : "w-10"
        }  `}
      >
        <Link to={"/"} className=" text-white font-extrabold text-2xl">
          <h1 className={`${showSideBar ? "inline" : "hidden"} `}>XX99</h1>
        </Link>

        <span onClick={() => setShowSidebar(!showSideBar)}>
          {showSideBar ? (
            <LiaTimesSolid
              className={`bg-[#ffa45c]  border  border-white text-3xl  rounded-full p-1 text-white absolute -right-4 top-4 transition-all duration-300 ${
                showSideBar ? "transform rotate-180" : ""
              }`}
            />
          ) : (
            <IoIosArrowForward
              className={`bg-[#ffa45c]  border  border-white text-3xl  rounded-full p-1 text-white absolute -right-4 top-4 transition-all duration-300 ${
                showSideBar ? "transform rotate-180" : ""
              }`}
            />
          )}
        </span>

        <div
          className={`flex flex-col gap-3 ${showSideBar ? "mt-8" : "mt-14"}`}
        >
          <Link
            onClick={() => setShowSidebar(false)}
            to={"/admin-dashboard?tab=dash-overview"}
            className={`flex items-center gap-3 p-1 font-semibold rounded-md text-white  hover:bg-[#fdcda6] ${
              tab === "dash-overview" ? "bg-[#fdcda6] " : null
            }`}
          >
            {" "}
            <span>
              <RiDashboardLine size={25} />
            </span>{" "}
            <h1 className={`${showSideBar ? "inline" : "hidden"} `}>
              Dashboard
            </h1>
          </Link>
          <Link
            onClick={() => setShowSidebar(false)}
            to={"/admin-dashboard?tab=dash-order"}
            className={`flex items-center gap-3 p-1 font-semibold rounded-md text-white  hover:bg-[#fdcda6] ${
              tab === "dash-order" ? "bg-[#fdcda6] " : null
            }`}
          >
            {" "}
            <span>
              <HiOutlineShoppingCart size={25} />
            </span>{" "}
            <h1 className={`${showSideBar ? "inline" : "hidden"} `}>Orders</h1>{" "}
          </Link>
          <Link
            onClick={() => setShowSidebar(false)}
            to={"/admin-dashboard?tab=dash-products"}
            className={`flex items-center gap-3 p-1 font-semibold rounded-md text-white  hover:bg-[#fdcda6] ${
              tab === "dash-products" ? "bg-[#fdcda6] " : null
            }`}
          >
            {" "}
            <span>
              <SlHandbag size={25} />
            </span>{" "}
            <h1 className={`${showSideBar ? "inline" : "hidden"} `}>
              Products
            </h1>{" "}
          </Link>
          <Link
            onClick={() => setShowSidebar(false)}
            to={"/admin-dashboard?tab=dash-customers"}
            className={`flex items-center gap-3 p-1 font-semibold rounded-md text-white  hover:bg-[#fdcda6] ${
              tab === "dash-customers" ? "bg-[#fdcda6] " : null
            }`}
          >
            {" "}
            <span>
              <PiUsers size={25} />
            </span>{" "}
            <h1 className={`${showSideBar ? "inline" : "hidden"} `}>
              Customers
            </h1>{" "}
          </Link>

          <Link
            onClick={() => setShowSidebar(false)}
            to={"/admin-dashboard?tab=dash-feedback"}
            className={`flex items-center gap-3 p-1 font-semibold rounded-md text-white  hover:bg-[#fdcda6] ${
              tab === "dash-feedback" ? "bg-[#fdcda6] " : null
            }`}
          >
            {" "}
            <span>
              <VscFeedback size={25} />
            </span>{" "}
            <h1 className={`${showSideBar ? "inline" : "hidden"} `}>
              Feedback
            </h1>{" "}
          </Link>
          <Link
            onClick={() => setShowSidebar(false)}
            to={"/create-product"}
            className="flex items-center gap-3 text-black transition-all hover:text-white hover:bg-black rounded-md  p-1 bg-white"
          >
            {" "}
            <span>
              <MdCreateNewFolder size={25} />
            </span>{" "}
            <h1 className={`${showSideBar ? "inline" : "hidden"} `}>
              Create Product
            </h1>{" "}
          </Link>
        </div>
      </div>

      <div
        className={`md:ml-64 ml-10  overflow-x-auto transition-all duration-300 ${
          showSideBar ? "blur-sm md:blur-none" : ""
        }`}
      >
        <div className="">
          {tab === "dash-overview" && <DashOverview />}
          {tab === "dash-order" && <DashboardOrder />}
          {tab === "dash-products" && <DashboardProduct />}
          {tab === "dash-customers" && <DashboardCustomers />}
          {tab === "dash-feedback" && <DashFeedback />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
