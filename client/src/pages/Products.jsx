import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/product/getproducts?searchTerm=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        setProducts(data);  // Set the fetched products to state
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  if (error) {
    return <div>{error}</div>;
  }

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
          <img src={product.imageUrls} alt={product.name} className="w-full h-48 object-cover rounded-t-lg"/>
          <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
          <p className="mt-1 text-gray-600">{product.description}</p>
          <p className="mt-2 font-bold text-xl">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
