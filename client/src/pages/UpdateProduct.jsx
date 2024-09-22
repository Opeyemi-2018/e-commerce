import { useState, useEffect } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { MdErrorOutline } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import {useNavigate, useParams} from 'react-router-dom'


const UpdateProduct = () => {
    const [error, setError] = useState(null); // Start with null for no error
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState([]); // Add this line to declare the files state

    let navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        price: '',
    });



    

    let handleImageSubmit = () => {
        if(files.length > 0 && files.length + formData.imageUrls.length < 7){
            setUploading(true)
            setImageUploadError(false)
            let promises = []
            
            for (let i = 0; i < files.length;  i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({... formData, imageUrls: formData.imageUrls.concat(urls)});
                setImageUploadError(false)
                setUploading(false)
            })
            .catch((error) => {
                setImageUploadError('Image upload failed (2 mb max per image)')
                setUploading(false)
            })
        } else {
            setImageUploadError('you can only upload 6 images per listing')
            setUploading(false)
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage(app);
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };
      
      const { productId } = useParams();

      useEffect(() => {
        let fetchProduct = async () => {
            try {
                let res = await fetch(`/api/product/getproduct/${productId}`)
                if (!res.ok) {
                    throw new Error('Failed to fetch product')
                }
                let data = await res.json()
                setFormData(data)
            } catch (error) {
                setError('Failed to fetch product details');
            }
        }
        fetchProduct();
    }, [productId]);
    

    let handleChange = (e) => {
        let {id, value} = e.target
        setFormData({...formData, [id]: value})
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear any existing errors before submitting
      
        try {
          // Validation checks
          if (formData.imageUrls.length < 1) {
            setTimeout(() => setError(null), 3000)
            return setError('You must upload at least one image');
          }
          if (!formData.name || !formData.description || !formData.price) {
            setTimeout(() => setError(null), 3000)
            return setError('All fields are required');
          }
      
          // Fetch request to update product
          let res = await fetch(`/api/product/updateproduct/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
      
          // Check HTTP status level error
          if (!res.ok) {
            const errorData = await res.json(); // Parse error response body
            console.error('Error:', errorData); // Log the detailed error message from the server
            setError(errorData.message || 'Failed to edit product'); // Set error state with the message from the response, or a generic message
            setTimeout(() => setError(null), 3000)
            return; // Exit early after setting the error
          }
      
          // Parse JSON response
          let data = await res.json();
      
          // Check application-level error
          if (data.success === false) {
            setError(data.message); // Set the error state with the error message from the server response
            setTimeout(() => setError(null), 3000);
            return; // Exit early after setting the error
          }
      
          // Navigate to the desired route
          navigate(`/admin-dashboard?tab=dash-products`);
        } catch (error) {
          // Catch any thrown errors and set the error state
          console.error('Submit error:', error);
          setError(error.message); // Set the error state with the error message
        }
      };
      
      
      
      return (
        <main className='mt-6 min-h-screen'>
          <h1 className='text-3xl text-gray-500 font-semibold text-center my-7'> Update a Product </h1>
          <div className='p-3 flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-6'>
              <div className='flex flex-col gap-4 flex-1'>
                <input  type='text'  placeholder='Name'  value={formData.name}  onChange={handleChange}
                  className='border p-3 rounded-lg'  id='name'
                />
                <textarea  type='text'  placeholder='Description'  value={formData.description}  onChange={handleChange}
                  className='border p-3 rounded-lg'  id='description'  required
                />
                <input  type='text'  value={formData.price}  onChange={handleChange}  placeholder='Price'
                  className='border p-3 rounded-lg'  id='price'
                />
              </div>
      
              <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>
                  Images:
                  <span className='font-normal text-gray-600 ml-2'>
                    The first image will be the main (max 6)
                  </span>
                </p>
                <div className='flex gap-4'>
                <input
  onChange={(e) => setFiles(Array.from(e.target.files))} // Ensure files are stored as an array
  className='p-3 border border-gray-300 rounded w-full'
  type='file'
  id='images'
  accept='image/*'
  multiple
/>
                  <button  type='button'  disabled={uploading}  onClick={handleImageSubmit}
                    className='md:px-3 px-2 text-gray-700 border border-gray-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
      
                {formData.imageUrls.length > 0 &&
                  formData.imageUrls.map((url, index) => (
                    <div key={url} className='flex justify-between px-2 border items-center'>
                      <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg' />
                      <button
                        type='button'
                        onClick={() => handleRemoveImage(index)}
                        className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                <button
                  className='p-3 bg-black text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                > Update
                </button>
      
                {error && (
                  <p className='flex items-center justify-between text-nowrap text-[15px] bg-red-100 text-red-600 rounded-md p-2'>
                    <span className='flex items-center gap-2'>
                      <MdErrorOutline size={20} /> {error}
                    </span>
                    <LiaTimesSolid size={20} onClick={() => setError(null)} className='cursor-pointer' />
                  </p>
                )}
      
                {imageUploadError && imageUploadError && (
                  <p className='text-nowrap text-[15px] bg-red-100 text-red-600 rounded-md p-2'>
                    {imageUploadError}
                  </p>
                )}
              </div>
            </form>
          </div>
        </main>
      );
      
    }      
export default UpdateProduct

// some modification in my api 