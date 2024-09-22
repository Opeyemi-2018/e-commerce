import { useState } from "react"
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";


const DashboardProduct = () => {
    let [dashProducts, setDashProducts] = useState([])
    let [error, setError] = useState('')
    console.log(dashProducts);
    

    let handleShowProducts = async () => {
        try {
            let res = await fetch('/api/product/dashboardProduct')
            if (!res.ok) {
                throw new Error('Failed to fetch products'); // Set custom error message
              }
            let data = await res.json()
            setDashProducts(data)
            setError('')
        } catch (error) {
            setError(error.message)
        }
    }
    handleShowProducts()

    let handleDelete = async (productId)=> {
        let res = await fetch(`api/product/deleteproduct/${productId}`,{
            method: 'DELETE'
        })
        if(!res.ok){
            throw new Error("cannot delete");
        }
        setDashProducts(dashProducts.filter(product => product._id !== productId))
    }
    
  return (
    <div className="my-4 min-h-screen">
        <h1 className="font-bold text-3xl text-gray-500">Available product</h1>
        <div className="max-w-4xl mx-auto mt-4">
            { dashProducts.length > 0 ?  (
               dashProducts.map(({ name, imageUrls, _id }) => (  
                      
                        <div key={_id} className="flex items-center justify-between mb-4 border-b-2  border-gray-100">
                            <Link to={`/product/${_id}`} className="flex-1">
                              <h1 className=" text-gray-500 font-semibold">{name}</h1>
                            </Link>  
                            <div className="flex-1">                      
                               <img src={imageUrls} className="h-10 w-10 object-cover "  alt="" />
                            </div>
                            <Link to={`/update-product/${_id}`} className="flex-1"><BiEdit size={25} className="text-green-600"/></Link>
                            <button onClick={()=> handleDelete(_id)} ><RiDeleteBin6Line size={25} className="text-red-700"/></button>
                        </div>  
                  
                ))
            ) : (
                <div className="flex items-center justify-center">
                    <h1 className="text-3xl text-gray-500">No product!!!</h1>
                </div>
            )}
        </div>
    </div>
  )
}

export default DashboardProduct