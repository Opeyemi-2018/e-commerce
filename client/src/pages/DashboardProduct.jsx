import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { PiWarningCircle } from "react-icons/pi";
import { LiaTimesSolid } from "react-icons/lia";

const DashboardProduct = () => {
  let [dashProducts, setDashProducts] = useState([]);
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let [deleteId, setDeleteId] = useState(null);
  let [deleteProductName, setDeleteProductName] = useState("");

  useEffect(() => {
    let handleShowProducts = async () => {
      setLoading(true);
      try {
        let res = await fetch("/api/product/dashboardProduct");
        if (!res.ok) {
          throw new Error("Failed to fetch products"); // Set custom error message
        }
        let data = await res.json();
        setDashProducts(data);
        setError("");
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    handleShowProducts();
  }, []);

  // logic for deletion
  let handleDelete = async () => {
    try {
      let res = await fetch(`api/product/deleteproduct/${deleteId}`, {
        method: "DELETE",
      });
      let data = res.json();
      if (res.ok) {
        let updatedProduct = dashProducts.filter(
          (product) => product._id !== deleteId
        );
        setDashProducts(updatedProduct);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setShowModal(false);
      setDeleteProductName("");
      setDeleteId(null);
    }
  };

  let openModal = (dashProduct) => {
    setShowModal(true);
    setDeleteId(dashProduct._id);
    setDeleteProductName(dashProduct.name);
  };

  let closeModal = () => {
    setShowModal(false);
    setDeleteId(null);
    setDeleteProductName("");
  };

  if (loading)
    return (
      <div className="min-h-screen">
        {" "}
        <div className="h-8 w-8 rounded-full animate-ping bg-[#ffa45c] absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2"></div>
      </div>
    );

  return (
    <div className="bg-white rounded-lg mt-6 md:mx-4 mx-2 relative overflow-x-auto p-3">
      <h1 className="md:font-bold font-normal md:text-3xl text-1xl text-gray-500">
        Available product
      </h1>

      <div className="min-w-full mt-4">
        {dashProducts.length === 0 ? (
          <div className="flex items-center justify-center">
            <h1 className="text-3xl text-gray-500">No product!!!</h1>
          </div>
        ) : (
          dashProducts.map((dashProduct) => {
            let { name, imageUrls, _id } = dashProduct;
            return (
              <div
                key={_id}
                className="flex items-center justify-between mb-4  border-b-2  border-gray-100"
              >
                <Link to={`/product/${_id}`} className="flex-1">
                  <h1 className="truncate text-gray-500 sm:font-semibold font-normal">
                    {name}
                  </h1>
                </Link>
                <div className="flex-1">
                  <img
                    src={imageUrls}
                    className="h-10 w-10 object-cover "
                    alt=""
                  />
                </div>
                <Link to={`/update-product/${_id}`} className="flex-1">
                  <BiEdit size={25} className="text-green-600" />
                </Link>
                <button onClick={() => openModal(dashProduct)}>
                  <RiDeleteBin6Line size={25} className="text-red-700" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* div for modal popup */}
      {showModal && (
        <div className="fixed md:w-[600px] max-w- w-[300px] mx-4 sm:mx-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-md bg-[#101010] p-4 sm:py-8 sm:px-10">
          <div className="relative">
            <LiaTimesSolid
              onClick={closeModal}
              size={25}
              className="absolute right-4 top-4 text-white"
            />
            <span className=" sm:text-5xl text-4xl text-red-600">
              <PiWarningCircle />
            </span>
            <h1 className="sm:text-2xl text-[18px] mb-3 text-white">
              Are you sure ?
            </h1>
            <p className="text-gray-400 sm:text-[17px] text-[15px] ">
              did you really want to delete{" "}
              <span className="font-semibold text-white underline ml-1">
                {deleteProductName}
              </span>
              ? process cannot be undone
            </p>

            <div className="flex gap-8  mt-6">
              <button
                onClick={closeModal}
                className="bg-white w-32 rounded-md sm:py-2 py-0 px-4"
              >
                cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 w-32 rounded-md sm:py-2 py- px-4 text-white"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProduct;
