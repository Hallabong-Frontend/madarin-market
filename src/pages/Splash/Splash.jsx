import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const SplashWrapper = styled.div`
  position: fixed;
  inset: 0;
  max-width: 390px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  animation: ${fadeIn} 0.5s ease;
`;

const LogoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const AppName = styled.h1`
  font-size: 28px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.5px;
`;

/* 감귤마켓 로고 SVG - 주황 바탕 + 초록 잎 + 흰 채팅말풍선 */
const MandarinLogo = () => (
  <svg width="100" height="115" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 초록 잎 */}
    <path d="M50 16 C50 16 40 4 28 9 C28 9 38 7 44 20 Z" fill="#4CAF50" />
    <path d="M50 16 C50 16 60 4 72 9 C72 9 62 7 56 20 Z" fill="#66BB6A" />
    {/* 주황 원형 */}
    <circle cx="50" cy="62" r="36" fill="#F26E22" />
    {/* 흰 채팅 말풍선 */}
    <ellipse cx="50" cy="60" rx="24" ry="22" fill="white" />
    {/* 말풍선 꼬리 */}
    <path d="M38 78 L32 92 L50 82 Z" fill="white" />
    {/* 눈 (세 점) */}
    <circle cx="42" cy="60" r="3" fill="#F26E22" />
    <circle cx="50" cy="60" r="3" fill="#F26E22" />
    <circle cx="58" cy="60" r="3" fill="#F26E22" />
  </svg>
);

const Splash = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/feed', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <SplashWrapper>
      <LogoArea>
        <MandarinLogo />
        <AppName>감귤마켓</AppName>
      </LogoArea>
    </SplashWrapper>
  );
};

export default Splash;
