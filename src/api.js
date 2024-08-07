// // src/api.js
// import axiosInstance from './axiosInstance';

// // Registration
// export const register = async (userData) => {
//   try {
//     const response = await axiosInstance.post('/auth/signup', userData);
//     return response.data;
//   } catch (error) {
//     console.error('Error registering user:', error);
//     throw error;
//   }
// };

// // Login
// export const login = async (credentials) => {
//   try {
//     const response = await axiosInstance.post('/auth/login', credentials);
//     return response.data;
//   } catch (error) {
//     console.error('Error logging in:', error);
//     throw error;
//   }
// };

// // Fetch Products
// export const fetchProducts = async (token) => {
//   try {
//     const response = await axiosInstance.get('/api/products', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// };
