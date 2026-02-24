import axiosInstance from './config';

// 피드 게시글 목록
export const getFeedPosts = async (limit = 10, skip = 0) => {
  const response = await axiosInstance.get(`/post/feed/?limit=${limit}&skip=${skip}`);
  return response.data;
};

// 게시글 상세
export const getPost = async (postId) => {
  const response = await axiosInstance.get(`/post/${postId}`);
  return response.data;
};

// 게시글 작성
export const createPost = async (content, image) => {
  const response = await axiosInstance.post('/post', {
    post: { content, image },
  });
  return response.data;
};

// 게시글 수정
export const updatePost = async (postId, content, image) => {
  const response = await axiosInstance.put(`/post/${postId}`, {
    post: { content, image },
  });
  return response.data;
};

// 게시글 삭제
export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`/post/${postId}`);
  return response.data;
};

// 게시글 신고
export const reportPost = async (postId) => {
  const response = await axiosInstance.post(`/post/${postId}/report`);
  return response.data;
};

// 좋아요
export const likePost = async (postId) => {
  const response = await axiosInstance.post(`/post/${postId}/heart`);
  return response.data;
};

// 좋아요 취소
export const unlikePost = async (postId) => {
  const response = await axiosInstance.delete(`/post/${postId}/unheart`);
  return response.data;
};
