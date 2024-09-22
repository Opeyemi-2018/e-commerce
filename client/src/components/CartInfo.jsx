// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RiDeleteBin6Line } from "react-icons/ri";


// import Cookies from 'js-cookie';
// const CartInfo = () => {
//     const { loggedInUser } = useSelector((state) => state.user);
//     const [cart, setCart] = useState({ items: [] });
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const fetchCart = async () => {
//         try {
//           const token = Cookies.get('access_token'); // Get the JWT token from cookies
  
//           const response = await fetch('/api/cart/getcart', {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`, // Include the token in the headers if required
//             },
//           });
  
//           if (!response.ok) {
//             const errorText = await response.text();
//             throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//           }
  
//           const data = await response.json();
//           setCart(data);
//         } catch (err) {
//           console.error('Fetch error:', err);
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       if (loggedInUser) {
//         fetchCart(); // Fetch cart data only if user is logged in
//       } else {
//         setLoading(false); // No need to fetch cart if user is not logged in
//       }
//     }, [loggedInUser]);
  
//     if (!loggedInUser) {
//       return <div>You need to be logged in to see your cart.</div>; // Message for logged-out users
//     }
  
//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;
  
//     return (
//       <div className='my-4 bg-white rounded-md p-6'>
//         <h2 className='font-semibold text-2xl mb-3'>summary</h2>
//         {cart.items.length > 0 ? (
//           <ul>
//             {cart.items.map((item) => (
//               <div key={item.productId._id} className='flex border-gray-200 border-b-2 justify-between'>
//                 <div className='flex gap-6 my-2'>
//                     <div className='bg-gray-100 px-3 py-2 rounded-md flex items-center justify-center'>
//                       <img className='w-10 h-10 object-cover' src={item.productId.imageUrls} alt="" />
//                     </div>
//                     <div>
//                         <h1 className='font-semibold text-1xl'>{item.productId.name}</h1> 
//                         <h1 className='font-semibold text-[13px] text-gray-500'>${item.productId.price}</h1>   
//                         <span className='text-red-700 flex items-center gap-1'><RiDeleteBin6Line size={20} /> remove </span>
//                     </div> 
//                 </div>
//                  <div>
//                     <h1 className='text-gray-500 font-semibold'>X{item.quantity}</h1>
//                  </div>
//               </div>
//             ))}
//           </ul>
//         ) : (
//           <p>Your cart is empty.</p>
//         )}
//       </div>
//     );
  
// }

// export default CartInfo



