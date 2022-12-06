// packages
import axios from 'axios';

// components
import { ProductDataProps } from '../components/UserCard/types';

// globals
import { BASE_URL } from '../globals/apiConstants';

const productApi = axios.create({
  baseURL: `${BASE_URL}`,
});

export const getProducts = async () => {
  const response = await productApi.get('/products');
  return response.data;
};

export const createProduct = async (product: ProductDataProps) => {
  const response = await productApi.post('/products', product);
  return response.data;
};

export const updateProduct = async (product: ProductDataProps) => {
  const response = await productApi.patch(`/products/${product.id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await productApi.delete(`/products/${id}`);
  return response.data;
};
