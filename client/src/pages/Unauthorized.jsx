import { Link } from "react-router-dom"

const Unauthorized = () => {
  return (
    <div className='flex items-center flex-col gap-2 justify-center min-h-screen'>
        <p className=' text-red-600 text-2xl'>
           You are not <span className='font-semibold'>authorized!</span>
        </p>
        <Link to={'/sign-in'} className="bg-[#ffa45c] p-2 rounded-sm text-white">Sign-in</Link>
    </div>
  )
}

export default Unauthorized