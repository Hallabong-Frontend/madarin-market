import axiosInstance from './config';

// 이메일 로그인
export const login = async (email, password) => {
  const response = await axiosInstance.post('/user/login', {
    user: { email, password },
  });
  return response.data;
};

// 이메일 유효성 검사
export const checkEmailValid = async (email) => {
  const response = await axiosInstance.post('/user/emailvalid', {
    user: { email },
  });
  return response.data;
};

// 계정 ID 유효성 검사
export const checkAccountValid = async (accountname) => {
  const response = await axiosInstance.post('/user/accountnamevalid', {
    user: { accountname },
  });
  return response.data;
};

// 회원가입
export const register = async (userData) => {
  const response = await axiosInstance.post('/user', {
    user: userData,
  });
  return response.data;
};

// 내 정보 가져오기
export const getMyInfo = async () => {
  const response = await axiosInstance.get('/user/myinfo');
  // 응답이 배열 형태 [{ user: {...} }]
  return Array.isArray(response.data) ? response.data[0] : response.data;
};

// 토큰 유효성 검사
export const checkTokenValid = async () => {
  const response = await axiosInstance.get('/user/checktoken');
  return response.data;
};

// 이미지 업로드 (단일)
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await axiosInstance.post('/image/uploadfile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  const data = response.data;
  // filename을 풀 URL로 변환하여 반환
  return { ...data, filename: `https://estapi.mandarin.weniv.co.kr/${data.filename}` };
};

// 내 프로필 수정
export const updateMyProfile = async (userData) => {
  const response = await axiosInstance.put('/user', {
    user: userData,
  });
  return response.data;
};
