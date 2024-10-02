import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiWarningCircle } from "react-icons/pi";
import { MdOutlineDone } from "react-icons/md";

const DashboardCustomers = () => {
  let [users, setUsers] = useState([]);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let [deleteSuccess, setDeleteSuccess] = useState(null);
  let { loggedInUser } = useSelector((state) => state.user);
  let [showModal, setShowModal] = useState(false);
  let [deleteId, setDeleteId] = useState(null);
  let [deleteUsername, setDeleteUsername] = useState("");

  useEffect(() => {
    let fetchUser = async () => {
      setLoading(true);
      try {
        let res = await fetch("/api/users/getusers");
        if (!res.ok) {
          throw new Error("network error");
        }
        let data = await res.json();
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.log("fail to fetch user", error);
        setError("error while fetching data");
      }
    };

    if (loggedInUser.isAdmin) {
      fetchUser();
    }
  }, [loggedInUser]);

  let handleDelete = async () => {
    if (!deleteId) return;

    try {
      let res = await fetch(`/api/users/deleteuser/${deleteId}`, {
        method: "DELETE",
      });
      let data = await res.json();
      if (res.ok) {
        let updatedUser = users.filter((user) => user._id !== deleteId);
        setUsers(updatedUser);
        setDeleteSuccess("customer successfully deleted");
        setTimeout(() => setDeleteSuccess(null), 3000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setShowModal(false);
      setDeleteId(null);
      setDeleteUsername("");
    }
  };

  let openModal = (user) => {
    setShowModal(true);
    setDeleteId(user._id);
    setDeleteUsername(user.username);
  };

  let closeModal = () => {
    setShowModal(false);
    setDeleteId(null);
    setDeleteUsername("");
  };

  if (loading)
    return (
      <div className="min-h-screen">
        {" "}
        <div className="h-8 w-8 rounded-full animate-ping bg-[#ffa45c] absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2"></div>
      </div>
    );

  return (
    <div className="p-3 relative bg-white rounded-lg mt-6 md:mx-4 mx-2  overflow-x-auto">
      <h1 className="md:text-3xl text-gray-500 underline font-semibold text-[17px]">
        List of customers
      </h1>
      <div>
        {error && <p>{error}</p>}
        {users.length === 0 ? (
          <p>no user</p>
        ) : (
          <table className="min-w-full mt-4 table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 md:text-2xl text-16px  font-normal">
                  Username
                </th>
                <th className="px-4 py-2 md:text-2xl text-16px font-normal">
                  Email
                </th>
                <th className="px-4 py-2 md:text-2xl text-16px font-normal">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                let { email, username, id, isAdmin } = user;
                return (
                  <tr key={id} className="">
                    <td className="border px-4  py-2 text-center text-gray-500">
                      {username}
                    </td>
                    <td className="border px-4 py-2 text-center text-gray-500">
                      {email}
                    </td>
                    <td
                      className={`border px-4 py-2 capitalize text-center sm:text-1xl text-[13px] ${
                        isAdmin ? "bg-green-500 font-semibold text-white" : ""
                      }`}
                    >
                      {isAdmin ? "admin" : "customer"}
                    </td>
                    <td className="border py-2 flex  justify-center items-center text-red-600 sm:text-2xl text-[19px]">
                      <RiDeleteBin6Line
                        onClick={() => openModal(user)}
                        className=" "
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* deleted message popup */}
      <div className="fixed top-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {deleteSuccess && (
          <p className="flex items-center justify-between gap-3 text-white bg-green-500 rounded-md px-2 py-1">
            <span>
              <MdOutlineDone className="bg-white rounded-full p-1 text-3xl text-green-600" />
            </span>{" "}
            <span>{deleteSuccess}</span>
          </p>
        )}
      </div>

      {showModal && (
        <div className="fixed md:w-[600px]  w-[350px] mx-4 sm:mx-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-md bg-red-100 p-4 sm:py-8 sm:px-10">
          <div className="">
            <span className="flex justify-center items-center sm:text-5xl text-4xl text-red-600">
              <PiWarningCircle />
            </span>
            <h1 className="text-center sm:text-2xl  text-[18px] mb-3">
              Are you sure ?
            </h1>
            <p className="text-center  text-gray-600 sm:text-[17px]  text-[15px] ">
              did you really want to delete{" "}
              <span className="font-semibold text-black underline ml-1">
                {deleteUsername}
              </span>
              ? this process cannot be undone
            </p>

            <div className="flex gap-8 justify-center mt-6">
              <button
                onClick={closeModal}
                className="bg-white rounded-md sm:py-2 py-[7px] px-4"
              >
                cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 rounded-md sm:py-2 py-[7px] px-4 text-white"
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

export default DashboardCustomers;
