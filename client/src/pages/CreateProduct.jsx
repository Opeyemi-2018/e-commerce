import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { MdOutlineDone } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
  let [files, setFiles] = useState([]);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  let [successmessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 5) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (4 mb max per image)");
          setTimeout(() => setImageUploadError(null), 3000);
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 4 images per product");
      setTimeout(() => setImageUploadError(null), 3000);
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
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

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        setTimeout(() => setError(null), 3000);
        return setError("You must upload at least one image");
      }
      if (!formData.name || !formData.description || !formData.price) {
        setTimeout(() => setError(null), 3000);
        return setError("all fields are required");
      }

      if (isNaN(formData.price)) {
        setTimeout(() => setError(null), 3000);
        return setError("price must be in number");
      }
      const res = await fetch("/api/product/createproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
      }
      setFormData({ imageUrls: [], name: "", description: "", price: "" });
      setFiles([]);
      setSuccessMessage("successfuly created");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="mt-6 min-h-screen">
      <h1 className="text-3xl text-gray-500 font-semibold text-center my-7">
        {" "}
        Create a Product{" "}
      </h1>
      <div className="p-3 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-6"
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              id="name"
            />
            <textarea
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              id="description"
              required
            />
            <input
              type="text"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="border p-3 rounded-lg"
              id="price"
            />
          </div>

          <div className="flex flex-col flex-1 gap-4">
            <select
              id="category"
              defaultValue=""
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 focus:outline-none p-1 font-semibold rounded-md bg-gray-200 text-gray-900"
            >
              <option disabled value="">
                select category
              </option>
              <option value="phone">phone</option>
              <option value="powerbank">powerbank</option>
              <option value="headset">headset</option>
              <option value="airbod">airbod</option>
              <option value="mouse">mouse</option>
              <option value="speaker">speaker</option>
              <option value="tripod">tripod</option>
              <option value="watch">watch</option>
            </select>
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the main (max 4)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                // we change the type to button because we don't want to submit the overall form
                disabled={uploading}
                onClick={handleImageSubmit}
                className="md:px-3 px-2 text-gray-700 border border-gray-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between px-2 border items-center"
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              disabled={loading || uploading}
              className="p-3 bg-black text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Creating..." : "Create product"}
            </button>
            {error && (
              <p className="flex items-center justify-between text-nowrap text-[15px] bg-red-100 text-red-600 rounded-md p-2">
                <span className="flex items-center gap-2">
                  <MdErrorOutline size={20} /> {error}
                </span>
                <LiaTimesSolid
                  size={20}
                  onClick={() => setError(null)}
                  className=" text-nowrap cursor-pointer"
                />
              </p>
            )}

            {imageUploadError && (
              <p className="flex items-center justify-between gap-3-4 bg-red-100 text-red-700  rounded-md p-2">
                <span className="text-nowrap text-[14px]">
                  {imageUploadError}
                </span>

                <LiaTimesSolid
                  size={20}
                  onClick={() => setImageUploadError(null)}
                  className="text-red-700 cursor-pointer"
                />
              </p>
            )}

            {successmessage && (
              <p className="flex items-center justify-between gap-3 text-white bg-green-500 rounded-md px-2 p-1">
                <span>
                  <MdOutlineDone className="bg-white rounded-full p-1 text-3xl text-green-600" />
                </span>{" "}
                <span>{successmessage}</span>
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateOrder;
