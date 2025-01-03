import { Link } from "react-router-dom";
import HeadSet from "../assets/head.png";
import { ReactTyped } from "react-typed";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import laptop from "../assets/laptop-pic.webp";

const Home = () => {
  const productSectionRef = useRef(null);
  let [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  console.log(searchItem);

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

  const handleScrollToSection = () => {
    productSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProduct = products.filter((product) =>
    product.name.toLowerCase().includes(searchItem.toLowerCase())
  );
  return (
    <main className="min-h-screen">
      <div
        style={{
          padding: "0px 5px",
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.3) 90%), url(${laptop}) center/cover no-repeat`,
        }}
      >
        <div className="top-home-div w-full py-3  px-3 sm:inline hidden ">
          <div className="max-w-6xl mx-auto flex md:gap-10 gap-2 justify-between ">
            <div className=" ">
              <p className="text-1xl  text-[15px] space-x-10 text-gray-500">
                NEW PRODUCT
              </p>
              <h1 className="md:text-5xl space-x-10 text-white text-2xl font-extrabold">
                XX99 MARK II GADGETS
              </h1>

              <div className="py-4">
                <p className="text-white">
                  shop with us today{" "}
                  <ReactTyped
                    className="text-[#ffa45c]"
                    strings={[
                      "For Exclusive deal",
                      "and Enjoy quality products",
                    ]}
                    typeSpeed={100}
                    backSpeed={20}
                    loop
                  />
                </p>
                <button
                  onClick={handleScrollToSection}
                  className="bg-[#ffa45c] text-white rounded-sm  p-3"
                >
                  SEE PRODUCT
                </button>
              </div>
            </div>

            <div>
              <img src={HeadSet} alt="" className="md:w-52 w-40" />
            </div>
          </div>
        </div>

        {/* Landing content for mobile */}
        <div className="sm:hidden inline">
          <div className=" relative w-full py-4 flex items-center justify-center">
            {/* Content Wrapper */}

            <div className="py-2 flex items-center flex-col justify-center z-20">
              <p className="text-1xl py-1 text-[15px] space-x-10 text-gray-500">
                NEW PRODUCT
              </p>
              <h1 className="md:text-5xl text-white text-2xl font-extrabold">
                XX99 MARK II
              </h1>
              <h1 className="md:text-5xl text-white text-2xl font-extrabold">
                GADGETS
              </h1>
              <div className="py-2 flex items-center flex-col">
                <p className="text-white">shop with us today</p>
                <ReactTyped
                  className="text-[#ffa45c]"
                  strings={["For Exclusive deal", "and Enjoy quality products"]}
                  typeSpeed={100}
                  backSpeed={20}
                  loop
                />
              </div>
              <button
                onClick={handleScrollToSection}
                className="bg-[#ffa45c] w-full text-white px-2 py-1"
              >
                SEE PRODUCT
              </button>
            </div>

            {/* Background Image */}
            <div className="absolute inset-0 flex items-center justify-center ">
              <img src={HeadSet} alt="Headset" className=" " />
            </div>
          </div>
        </div>
        <div className="max-w-6xl z-40 mx-auto sm:pt-3 pt-5 pb-2 px-3">
          <form>
            <input
              type="text"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="type name of product here"
              className="w-full md:p-3 p-2 rounded-md focus:outline-none"
            />
          </form>
        </div>
      </div>

      {/* product div */}
      <div className="px-3 mt-6 mb-10">
        <div
          ref={productSectionRef}
          className="max-w-6xl grid md:grid-cols-6 grid-cols-2 mx-auto gap-4"
        >
          {filteredProduct.map((product) => {
            let { name, imageUrls, price, _id } = product;

            return (
              <Link to={`/product/${_id}`} key={_id}>
                {" "}
                <div className="bg-white shadow-sm hover:shadow-md rounded-sm overflow-hidden flex flex-col">
                  <div className="relative w-full h-32 flex items-center justify-center">
                    <img
                      src={imageUrls}
                      alt={name}
                      className="w-full h-32 mt-2 object-contain"
                    />
                  </div>
                  <div className=" flex flex-col px-3 py-1 gap-1">
                    <h3 className="capitalize text-gray-600">{name}</h3>
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
