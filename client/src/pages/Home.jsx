import { Link } from "react-router-dom";
import HeadSet from "../assets/head.png";
import { ReactTyped } from "react-typed";
import { MdPhoneIphone } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { GrPersonalComputer } from "react-icons/gr";
import { BsSpeaker } from "react-icons/bs";
import { BsUsbSymbol } from "react-icons/bs";
import { BsSmartwatch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import laptop from "../assets/laptop-pic.webp";

const Home = () => {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    let getProducts = async () => {
      try {
        let res = await fetch("/api/product/getproducts");
        let data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  return (
    <main className="min-h-screen">
      <div
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.3) 90%), url(${laptop}) center/cover no-repeat`,
        }}
      >
        <div className="top-home-div w-full py-6  px-3 md:inline hidden ">
          <div className="max-w-6xl mx-auto flex md:gap-10 gap-2 justify-center ">
            <div className="bg-white md:px-10 px-4 rounded-sm">
              <div className="flex flex-col gap-4 my-4">
                <p className="flex items-center gap-3 text-gray-700">
                  {" "}
                  <span>
                    <MdPhoneIphone size={25} />
                  </span>{" "}
                  Phones
                </p>
                <p className="flex items-center gap-3 text-gray-700">
                  {" "}
                  <span>
                    <IoGameControllerOutline size={25} />
                  </span>
                  Gaming
                </p>
                <p className="flex items-center gap-3 text-gray-700">
                  {" "}
                  <span>
                    <GrPersonalComputer size={25} />
                  </span>
                  Laptops
                </p>
                <p className="flex items-center gap-3 text-gray-700">
                  {" "}
                  <span>
                    <BsSpeaker size={25} />
                  </span>
                  Speaker
                </p>
                <p className="flex items-center gap-3 text-gray-700">
                  {" "}
                  <span>
                    <BsUsbSymbol size={25} />
                  </span>
                  Phone Accessories
                </p>
                <p className="flex items-center gap-3 text-gray-700">
                  {" "}
                  <span>
                    <BsSmartwatch size={25} />
                  </span>
                  Series
                </p>
              </div>
            </div>
            <div className="py-2 flex-1">
              <p className="text-1xl py-3  text-[15px] space-x-10 text-gray-500">
                NEW PRODUCT
              </p>
              <h1 className="md:text-5xl space-x-10 text-white text-2xl font-extrabold">
                XX99 MARK II
              </h1>
              <h1 className="md:text-5xl space-x-10 text-white  text-2xl font-extrabold">
                GADGETS
              </h1>
              <div className="py-4">
                <p className="text-white">shop with us today</p>
                <ReactTyped
                  className="text-[#ffa45c]"
                  strings={["For Exclusive deal", "and Enjoy quality products"]}
                  typeSpeed={100}
                  backSpeed={20}
                  loop
                />
              </div>
              <Link className="bg-[#ffa45c] text-white rounded-sm  p-3">
                SEE PRODUCT
              </Link>
            </div>

            <div>
              <img src={HeadSet} alt="" className="md:w-full w-40" />
            </div>
          </div>
        </div>

        {/* Landing content for mobile */}
        <div className="sm:hidden inline">
          <div className=" relative w-full py-8 flex items-center justify-center">
            {/* Content Wrapper */}

            <div className="py-2 flex items-center flex-col justify-center z-20">
              <p className="text-1xl py-3 text-[15px] space-x-10 text-gray-500">
                NEW PRODUCT
              </p>
              <h1 className="md:text-5xl text-white text-2xl font-extrabold">
                XX99 MARK II
              </h1>
              <h1 className="md:text-5xl text-white text-2xl font-extrabold">
                GADGETS
              </h1>
              <div className="py-4 flex items-center flex-col">
                <p className="text-white">shop with us today</p>
                <ReactTyped
                  className="text-[#ffa45c]"
                  strings={["For Exclusive deal", "and Enjoy quality products"]}
                  typeSpeed={100}
                  backSpeed={20}
                  loop
                />
              </div>
              <Link className="bg-[#ffa45c] text-white px-2 py-1">
                SEE PRODUCT
              </Link>
            </div>

            {/* Background Image */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <img src={HeadSet} alt="Headset" className=" " />
            </div>
          </div>
        </div>
      </div>

      {/* product div */}
      <div className="px-3 mt-6 mb-10">
        <div className="max-w-6xl grid md:grid-cols-4 grid-cols-2 mx-auto gap-4">
          {products.map((product) => {
            // Destructure 'name', 'imageUrls', and '_id' from the 'product' object
            let { name, imageUrls, price, _id } = product;

            return (
              <Link to={`/product/${_id}`} key={_id}>
                {" "}
                {/* Corrected the Link path */}
                <div className="bg-white shadow-md rounded-sm overflow-hidden flex flex-col">
                  <div className="relative w-full h-32 flex items-center justify-center">
                    <img
                      src={imageUrls}
                      alt={name}
                      className="w-full h-32 mt-2 object-contain"
                    />
                  </div>
                  <div className=" flex flex-col px-3 py-1 gap-1">
                    <h3 className=" md:font-semibold font-normal capitalize text-gray-600">
                      {name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <h3 className=" md:font-semibold font-normal  text-gray-600">
                        ${price}
                      </h3>
                      <IoMdArrowDropright
                        size={25}
                        className="text-[#ffa45c]"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Home;

// when i'm back i will be implementing the sign out func for my estate app
