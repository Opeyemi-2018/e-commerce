import { Link, useNavigate } from "react-router-dom";
import cartLady from "../assets/cart-lady.jpg";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";

const SignIn = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { loading, error } = useSelector((state) => state.user);
  let [formData, setFormData] = useState({ email: "", password: "" });

  let handleChange = (e) => {
    e.preventDefault();
    let { id, value } = e.target;
    const formattedValue =
      id === "email" || id === "name" ? value.toLowerCase() : value;

    setFormData({ ...formData, [id]: formattedValue });
    console.log(formData);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      dispatch(signInFailure("all fields are required"));
    }
    try {
      dispatch(signInStart());
      let res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      let data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="sm:px-28 px-3 min-h-screen mt-20">
      <div className="flex justify-between gap-10">
        {/* Correct class names for visibility control and image styling */}
        <img
          src={cartLady}
          alt="sign up image"
          className="hidden sm:inline rounded-lg w-40 h-[400px] flex-1 object-cover  object-center"
        />

        <div className="flex-1">
          <div className="mb-2">
            <h1 className="text-3xl text-black font-semibold ">Welcome back</h1>
            <p className="text-gray-600 text-[15px]">kindly sign in</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              id="email"
              onChange={handleChange}
              placeholder="email"
              className="w-full border p-2 rounded-md outline-none"
            />
            <input
              type="text"
              id="password"
              onChange={handleChange}
              placeholder="password"
              className="w-full border p-2 rounded-md outline-none"
            />

            <button
              disabled={loading}
              className="bg-[#ffa45c] p-3 rounded-md text-white"
            >
              Sign in
            </button>
          </form>
          {/* {error && (
            <p className='flex items-center justify-between bg-red-200 text-red-700 rounded-md mt-3 p-2'>
              <span className='flex items-center gap-2'>
                <MdErrorOutline size={20} /> {error}
              </span>
              <LiaTimesSolid size={20} onClick={() => setError(null)} className='text-red-700 cursor-pointer' />
            </p>
          )} */}
          <div className="flex gap-2 mt-5">
            <p>Don't have an account?</p>
            <Link to={"/sign-up"}>
              <span className="text-blue-700 ">Sign up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
