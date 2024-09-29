import { IoCartOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { TiShoppingBag } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/userSlice";

const Header = () => {
  let [showPopup, setShowPopup] = useState(false);
  let [showSearchInput, setShowSearchInput] = useState(false);
  let { loggedInUser, error: errorMessage } = useSelector(
    (state) => state.user
  );
  let dispatch = useDispatch();
  let imageRef = useRef(null);
  let popupRef = useRef(null);
  let navigate = useNavigate();
  let [searchTerm, setSearchTerm] = useState(""); // Define state for searchTerm

  useEffect(() => {
    let handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !imageRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  let handleLogOut = async () => {
    try {
      dispatch(signOutStart());

      let res = await fetch("/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });
      let data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(
        signOutFailure("An error occurred during sign-out. Please try again.")
      );
      console.error("Error during sign-out:", error);
    }
  };

  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/cart/getcart");
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Message: ${errorText}`
          );
        }

        const data = await response.json();

        let validItems = data.items.filter(
          (item) => item.productId && item.productId._id
        );
        setCartLength(validItems.length); // Update the cart length
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    if (loggedInUser) {
      fetchCart();
    }
  }, [cartLength]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="w-full bg-black p-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link to={"/"} className="font-bold md:text-2xl text-[20px] text-white">
          XX99
        </Link>

        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white  p-2 rounded-lg"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search..."
            className="focus:outline-none border-none w-24 sm:w-64"
          />
          <button>
            <IoSearchSharp size={25} className="text-gray-600" />
          </button>
        </form>

        {/* <button onClick={()=> setShowSearchInput(!showSearchInput)} className="bg-white p-1 sm:hidden inline rounded-full"><IoSearchSharp size={20}/></button> */}
        {loggedInUser ? (
          <div className="relative">
            <div
              ref={imageRef}
              onClick={() => setShowPopup(!showPopup)}
              className="flex gap-1 items-start text-white cursor-default hover:text-[#ffa45c]"
            >
              <FaUserCheck size={20} />
              <span className=" font-semibold capitalize">
                Hi, {loggedInUser.username}
              </span>
              <IoIosArrowDown
                className={`font-bold text-2xl transform transition-transform ${
                  showPopup ? "rotate-180" : ""
                }`}
              />
            </div>
            {showPopup && (
              <div
                ref={popupRef}
                className="absolute z-40 top-10 w-48  right-1 rounded-sm p-4 bg-white shadow-lg"
              >
                <div className="flex flex-col gap-3">
                  {loggedInUser.isAdmin ? (
                    <Link
                      to={"admin-dashboard?tab=dash-overview"}
                      className="flex items-center gap-2 text-1xl text-gray-700 hover:font-semibold hover:bg-gray-200 p-1"
                    >
                      <MdDashboard size={20} /> <span>Dashboard</span>{" "}
                    </Link>
                  ) : (
                    <Link className="flex items-center text-1xl gap-2 text-gray-700 hover:font-semibold hover:bg-gray-200 p-1">
                      <CgProfile size={25} /> <span>My Account</span>{" "}
                    </Link>
                  )}
                  <Link className="flex items-center text-1xl gap-2 text-gray-700 hover:font-semibold hover:bg-gray-200 p-1 ">
                    {" "}
                    <span>
                      <TiShoppingBag size={25} />
                    </span>{" "}
                    Orders
                  </Link>
                  <Link className="flex items-center text-1xl gap-2 text-gray-700 hover:font-semibold hover:bg-gray-200 p-1 ">
                    <span>
                      <FaRegHeart size={20} />
                    </span>
                    Saved items
                  </Link>
                </div>
                <button
                  onClick={handleLogOut}
                  className="text-[#ffa45c] mt-4 font-semibold text-1xl"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to={"sign-in"} className="bg-white px-2 py-1 rounded-md mb-1">
            Sign in
          </Link>
        )}
        <Link to={"/cart"} className="relative">
          <IoCartOutline size={25} className="text-white" />
          <div className="w-6 h-6 absolute bottom-3 left-4 bg-white rounded-full p-2 flex items-center justify-center">
            <p className=" text-black">{cartLength}</p>
          </div>
        </Link>
      </div>

      <hr className="mt-2 max-w-6xl mx-auto" />

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
  );
};

export default Header;
