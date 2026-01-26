import axios from "axios";

let API_BASE_URL = import.meta.env.DEV ? "/api" : "https://fakestoreapi.com";

let axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch products: " + error.message);
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch product: " + error.message);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get(`/products/categories`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch categories: " + error.message);
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch products: " + error.message);
  }
};

export const createProduct = async (product) => {
  try {
    const response = await axiosInstance.post(`/products`, product);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to create product: " + error.message);
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to update product: " + error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to delete product: " + error.message);
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get(`/users`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch users: " + error.message);
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch user: " + error.message);
  }
};

export const createUser = async (user) => {
  try {
    const response = await axiosInstance.post(`/users`, user);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to create user: " + error.message);
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to update user: " + error.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to delete user: " + error.message);
  }
};

export const fetchCarts = async () => {
  try {
    const response = await axiosInstance.get(`/carts`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch carts: " + error.message);
  }
};

export const fetchCartById = async (id) => {
  try {
    const response = await axiosInstance.get(`/carts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch cart: " + error.message);
  }
};

export const fetchUserCarts = async (userId) => {
  try {
    const response = await axiosInstance.get(`/carts/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch user carts: " + error.message);
  }
};

export const createCart = async (cart) => {
  try {
    const response = await axiosInstance.post(`/carts`, cart);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to create cart: " + error.message);
  }
};

export const updateCart = async (id, cart) => {
  try {
    const response = await axiosInstance.put(`/carts/${id}`, cart);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to update cart: " + error.message);
  }
};

export const deleteCart = async (id) => {
  try {
    const response = await axiosInstance.delete(`/carts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to delete cart: " + error.message);
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, { username, password });
    const data = response.data;
    if (!data.token) {
      throw new Error("No token received from server");
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
