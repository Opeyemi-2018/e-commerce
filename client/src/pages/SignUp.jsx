import { useState, useEffect } from 'react';
import cartWoman from '../assests/cart-woman.webp';
import { Link, useNavigate } from 'react-router-dom';
import { LiaTimesSolid } from "react-icons/lia";
import { MdErrorOutline } from "react-icons/md";

const SignUp = () => {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isVendor: false, // Initialize isVendor as false
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 4000);

      // Cleanup function to clear the timeout if the component unmounts or if error changes
      return () => clearTimeout(timer);
    }
  }, [error]);

  let handleChange = (e) => {
    let { id, value, type, checked } = e.target;

    if (type === "checkbox") {
      // If the input is a checkbox, update the boolean value for isVendor
      setFormData({ ...formData, isVendor: checked });
    } else {
      // For other input types, update the formData with the new value
      setFormData({ ...formData, [id]: value });
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    // Validate form data
    if (!username || !email || !password) {
      setError('All fields are required');
      return; // Return early to prevent further execution
    }

    try {
      setLoading(true);
      console.log('Sending request to API with data:', formData);

      let res = await fetch('/api/auth/signup', { // Add leading slash to API path
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      let data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      console.log('Success:', data);
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      console.error('Fetch error:', error);
      setError('An error occurred. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className='sm:px-28 px-3 min-h-screen mt-20'>
      <div className='flex justify-between gap-10'>
        {/* Correct class names for visibility control and image styling */}
        <img
          src={cartWoman}
          alt="sign up image"
          className='hidden sm:inline rounded-lg w-40 h-[400px] flex-1 object-cover object-center'
        />

        <div className='flex-1'>
          <div className='mb-2'>
            <h1 className='text-3xl text-black font-semibold '>Welcome to XX99</h1>
            <p className='text-gray-600 text-[15px]'>Kindly sign up</p>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type="text" id='username' placeholder='Username' onChange={handleChange} className='w-full border p-2 rounded-md outline-none' />
            <input type="text" id='email' placeholder='Email' onChange={handleChange} className='w-full border p-2 rounded-md outline-none' />
            <input type="password" id='password' placeholder='Password' onChange={handleChange} className='w-full border p-2 rounded-md outline-none' />

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                {/* Use a checkbox instead of a radio button for toggling */}
                <input type="checkbox" checked={formData.isVendor} onChange={handleChange}
                  className="w-5 h-5"
                />
                <span className="font-semibold text-gray-600">Vendor</span>
              </div>
            </div>

            <button disabled={loading} className='bg-[#ffa45c] p-3 rounded-md text-white'>
              Sign up
            </button>
          </form>
          <div className="flex gap-2 mt-5">
            <p>Have an account?</p>
            <Link to={'/sign-in'}>
              <span className="text-blue-700">Sign in</span>
            </Link>
          </div>
          {error && (
            <p className='flex items-center justify-between bg-red-200 text-red-700 rounded-md p-2'>
              <span className='flex items-center gap-2'>
                <MdErrorOutline size={20} /> {error}
              </span>
              <LiaTimesSolid size={20} onClick={() => setError(null)} className='text-red-700 cursor-pointer' />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
