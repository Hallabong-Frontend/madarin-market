import axiosInstance from './config';

// 유저 프로필 가져오기
export const getUserProfile = async (accountname) => {
  const response = await axiosInstance.get(`/profile/${accountname}`);
  return response.data;
};

// 팔로잉 목록
export const getFollowingList = async (accountname) => {
  const response = await axiosInstance.get(`/profile/${accountname}/following`);
  return response.data;
};

// 팔로워 목록
export const getFollowerList = async (accountname) => {
  const response = await axiosInstance.get(`/profile/${accountname}/follower`);
  return response.data;
};

// 팔로우
export const followUser = async (accountname) => {
  const response = await axiosInstance.post(`/profile/${accountname}/follow`);
  return response.data;
};

// 언팔로우
export const unfollowUser = async (accountname) => {
  const response = await axiosInstance.delete(`/profile/${accountname}/unfollow`);
  return response.data;
};

// 유저 검색
export const searchUser = async (keyword) => {
  const response = await axiosInstance.get(`/user/searchuser/?keyword=${keyword}`);
  return response.data;
};

// 유저가 올린 게시글
export const getUserPosts = async (accountname) => {
  const response = await axiosInstance.get(`/post/${accountname}/userpost`);
  return response.data;
};
