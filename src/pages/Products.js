

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        setUserEmail(email || '');

        const response = await axios.get('https://intern-task-api.bravo68web.workers.dev/api/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  // Pagination Logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < filteredProducts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-8 border border-gray-300 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Listing</h1>
      <div className="mb-4 text-center">
        <p className="text-lg font-semibold">Logged in as: {userEmail}</p>
      </div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6 p-2 border border-gray-300 rounded-lg w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-105">
            <img
              src={product.imageUrl || 'https://via.placeholder.com/150'}
              alt={product.title}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-500">{product.description}</p>
            <p className="mt-2 text-xl font-bold text-blue-500 transform rotate-3">${product.price}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handlePrevPage}
          className="px-4 py-2 border border-gray-300 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 mr-2"
        >
          &larr;
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 border border-gray-300 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 ml-2"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default Products;
