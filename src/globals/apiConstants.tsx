export const BASE_URL = 'http://localhost:8000';
export const apiConstants = {
  GET_PRODUCTS: `${BASE_URL}/products`,
  Edit_Product: (productId: number) => `${BASE_URL}/products/${productId}`,
  Delete_Product: (productId: number) => `${BASE_URL}/products/${productId}`,
};
