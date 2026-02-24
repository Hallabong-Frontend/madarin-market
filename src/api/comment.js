import axiosInstance from './config';

// 댓글 목록
export const getComments = async (postId) => {
  const response = await axiosInstance.get(`/post/${postId}/comments`);
  return response.data;
};

// 댓글 작성
export const createComment = async (postId, content) => {
  const response = await axiosInstance.post(`/post/${postId}/comments`, {
    comment: { content },
  });
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (postId, commentId) => {
  const response = await axiosInstance.delete(`/post/${postId}/comments/${commentId}`);
  return response.data;
};

// 댓글 신고
export const reportComment = async (postId, commentId) => {
  const response = await axiosInstance.post(`/post/${postId}/comments/${commentId}/report`);
  return response.data;
};
