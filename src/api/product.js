import axiosInstance from './config';

// 내 상품 목록
export const getMyProducts = async (accountname) => {
  const response = await axiosInstance.get(`/product/${accountname}`);
  return response.data;
};

// 상품 상세
export const getProduct = async (productId) => {
  const response = await axiosInstance.get(`/product/detail/${productId}`);
  return response.data;
};

// 상품 등록
export const createProduct = async (productData) => {
  const response = await axiosInstance.post('/product', {
    product: productData,
  });
  return response.data;
};

// 상품 수정
export const updateProduct = async (productId, productData) => {
  const response = await axiosInstance.put(`/product/${productId}`, {
    product: productData,
  });
  return response.data;
};

// 상품 삭제
export const deleteProduct = async (productId) => {
  const response = await axiosInstance.delete(`/product/${productId}`);
  return response.data;
};
