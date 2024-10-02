import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { decrement, increment, resetQuantity } from "../redux/countSlice";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineDone } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import { IoIosShareAlt } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";

const ProductInfo = () => {
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successmessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null); // State for the main image
  const { productId } = useParams();
  let [copied, setCopied] = useState(false);

  const { quantity } = useSelector((state) => state.quantity);
  console.log(typeof quantity);

  const { loggedInUser } = useSelector((state) => state.user) || {}; // Destructure with fallback

  const dispatch = useDispatch();

  useEffect(() => {
    const getProductInfo = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/product/getproduct/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch the product");

        const data = await res.json();
        if (data.success === false) throw new Error(data.message);

        setProductInfo(data);

        setMainImage(data.imageUrls[0]); // Set the initial main image
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProductInfo();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!productInfo?._id) {
      alert("Product information is not available. Please try again.");
      return;
    }

    try {
      if (!loggedInUser) {
        setError("You need to be logged in to add items to the cart.");
        setTimeout(() => setError(null), 3000);
        return;
      }
      const res = await fetch("/api/cart/additemtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUser,
          productId: productInfo._id,
          quantity: quantity,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add item to cart");
      }

      const data = await res.json();
      setSuccessMessage("Item added successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
      dispatch(resetQuantity());
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding item to cart");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen">
        {" "}
        <div className="h-8 w-8 rounded-full animate-ping bg-[#ffa45c] absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2"></div>
      </div>
    );
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-3 md:my-10 my-4 min-h-screen">
      <div className="fixed top-[13%] md:right-[6%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
        <IoIosShareAlt
          className="text-slate-500"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        />
      </div>

      {copied && (
        <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
          Link copied!
        </p>
      )}

      <div className="flex justify-center max-w-4xl mx-auto ">
        {productInfo ? (
          <div
            key={productInfo._id}
            className="flex flex-col items-center text-left md:flex-row gap-4"
          >
            <div className="flex flex-col ">
              {/* Main Image */}
              <img
                src={mainImage}
                alt={productInfo.name}
                className="w-full h-72  object-contain"
              />

              {/* Thumbnails */}
              <div className="flex justify-center gap-2">
                {productInfo.imageUrls.length > 1 &&
                  productInfo.imageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Thumbnail ${index}`}
                      className="w-14 h-14 object-contain cursor-pointer border  border-gray-300 rounded"
                      onClick={() => setMainImage(url)}
                    />
                  ))}
              </div>
            </div>
            <div className="flex flex-col sm:gap-3 gap-1">
              <h1 className="md:text-3xl sm:font-semibold font-normal text-2xl">
                {productInfo.name}
              </h1>
              <p>{productInfo.description}</p>
              <p className="font-semibold">{productInfo.price}</p>
              <div className="flex items-center gap-6">
                <div className="flex gap-4 bg-gray-200 p-2 rounded-sm">
                  <button onClick={() => dispatch(decrement())}>
                    <FiMinus />
                  </button>
                  <h1>{quantity}</h1>
                  <button onClick={() => dispatch(increment())}>
                    <IoIosAdd />
                  </button>
                </div>
                <button
                  className="bg-[#ffa45c] w-full text-white uppercase font-semibold p-2 rounded-sm"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>

              {/* div for success message */}
              <div className="fixed top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {successmessage && (
                  <p className="flex items-center justify-between gap-3 text-white bg-green-500 rounded-md px-2 p-1">
                    <span>
                      <MdOutlineDone className="bg-white rounded-full p-1 text-3xl text-green-600" />
                    </span>{" "}
                    <span>{successmessage}</span>
                  </p>
                )}
              </div>

              {error && (
                <p className="flex items-center justify-between text-nowrap text-[15px] bg-red-100 text-red-600 rounded-md p-2">
                  <span className="flex items-center gap-2">
                    <MdErrorOutline size={20} /> {error}
                  </span>
                  <LiaTimesSolid
                    size={20}
                    onClick={() => setError(null)}
                    className="  cursor-pointer"
                  />
                </p>
              )}
            </div>
          </div>
        ) : (
          <div>No product found</div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
