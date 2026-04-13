import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getProducts = async (query?: string) => {
  const endpoint = query ? `/products/search?q=${encodeURIComponent(query)}` : "/products";
  const res = await API.get(endpoint);
  return res.data.products;
};