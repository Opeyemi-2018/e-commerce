import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import { IoCartOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
// import Cookies from 'js-cookie';
import CheckOut from "../components/CheckOut";
import { Link } from "react-router-dom";
// import { setCartLength } from '../redux/cartLength';

const Cart = () => {
  const [amountToPay, setamountToPay] = useState(0);

  const { loggedInUser } = useSelector((state) => state.user);
  const [cart, setCart] = useState({ items: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let [deletedmsg, setDeletedMsg] = useState("");
  let dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // const token = Cookies.get('access_token'); // Get the JWT token from cookies

        const response = await fetch("/api/cart/getcart", {
          // method: 'GET',
          // headers: {
          //   'Content-Type': 'application/json',
          //   'Authorization': `Bearer ${token}`, // Include the token in the headers if required
          // },
        });

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
        setCart({ ...data, items: validItems });
        // let totalAmount = v
        let totalAmount = 0;
        validItems.map((item) => {
          totalAmount += item.productId.price;
          // console.log(item.productId.price);
        });
        setamountToPay(totalAmount);
        // console.log(totalAmount);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser) {
      fetchCart(); // Fetch cart data only if user is logged in
    } else {
      setLoading(false); // No need to fetch cart if user is not logged in
    }
  }, [dispatch]);

  let handleDeleteCart = async (productId) => {
    try {
      let res = await fetch(`api/cart/deletecart/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("failed to delete item");
      }

      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter(
          (item) => item.productId._id !== productId
        ),
      }));

      setDeletedMsg("deleted successfully");
      setTimeout(() => setDeletedMsg(""), 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!loggedInUser) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white max-w-4xl mx-auto  gap-4 p-3 flex items-center mt-24">
          You need to be logged in to see your cart.
          <Link
            to={"/sign-in"}
            className="text-[#ffa45c] flex items-center gap-2"
          >
            sign in <FaArrowTrendUp className="text-[#ffa456]" />
          </Link>
        </div>
        ;
      </div>
    );
  }

  if (loading)
    return (
      <div className="min-h-screen">
        {" "}
        <div className="h-8 w-8 rounded-full animate-ping  bg-[#ffa45c]  absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 "></div>
      </div>
    );
  // if (error) return <div>Error: {error}</div>;
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="px-3 ">
        <div className="flex md:flex-row  flex-col-reverse gap-4 max-w-6xl mx-auto">
          <div className="flex-1">
            <CheckOut
              amountToPay={amountToPay}
              user={loggedInUser.email}
              setamountToPay={setamountToPay}
            />
          </div>

          <div className="md:max-w-2xl flex-1  md:mx-auto">
            <div
              className={`my-4 ${
                cart.items.length === 0 ? "bg-none" : "bg-white shadow-md"
              }  rounded-md p-6 `}
            >
              <h2 className="font-semibold text-2xl mb-3 capitalize">
                {cart.items.length === 0 ? "" : "summary"}
              </h2>
              {cart.items.length > 0 ? (
                <div>
                  {cart.items.map((item) => (
                    <div
                      key={item.productId._id}
                      className="flex border-gray-200 border-b-2 justify-between"
                    >
                      <div className="flex gap-6 my-2">
                        <div className="bg-gray-100 px-3 py-2 rounded-md flex items-center justify-center">
                          <img
                            className="w-10 h-10 object-cover"
                            src={item.productId.imageUrls}
                            alt=""
                          />
                        </div>
                        <div>
                          <h1 className="font-semibold text-1xl">
                            {item.productId.name}
                          </h1>
                          <h1 className="font-semibold  text-[13px] text-gray-500">
                            ${item.productId.price}
                          </h1>
                          <button
                            onClick={() => handleDeleteCart(item.productId._id)}
                            className="text-red-700 flex items-center gap-1"
                          >
                            <RiDeleteBin6Line size={20} /> remove{" "}
                          </button>
                        </div>
                      </div>
                      <div>
                        <h1 className="text-gray-500 z- font-semibold">
                          X{item.quantity}
                        </h1>
                      </div>
                    </div>
                  ))}
                  {deletedmsg && (
                    <p className="flex items-center justify-between bg-red-100 text-red-700 rounded-md p-2">
                      <span className="flex items-center gap-2">
                        <MdOutlineDone size={20} /> {deletedmsg}
                      </span>
                      <LiaTimesSolid
                        size={20}
                        onClick={() => setError(null)}
                        className="text-red-700 cursor-pointer"
                      />
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <h1 className="text-gray-600 uppercase">total</h1>
                    <h1 className="font-semibold">${amountToPay}</h1>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center flex-col gap-2 mt-20">
                  <p className="text-2xl text-gray-500">Your cart is empty.</p>
                  <div className="bg-gray-600 p-5 rounded-full flex items-center justify-center">
                    <IoCartOutline
                      size={30}
                      className="text-white animate-spin"
                    />
                  </div>
                  <Link
                    to={"/"}
                    className="bg-[#ffa45c] text-white py-2 px-3 rounded-sm"
                  >
                    Browse our collection and discover new deal
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
