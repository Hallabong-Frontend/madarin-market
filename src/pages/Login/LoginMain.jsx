import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const LogoSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoSvg = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* leaf */}
    <path d="M60 14 C60 14 52 6 44 10 C44 10 52 8 56 18 Z" fill="white" />
    <path d="M60 14 C60 14 68 6 76 10 C76 10 68 8 64 18 Z" fill="white" />
    {/* outer circle */}
    <circle cx="60" cy="60" r="38" stroke="white" strokeWidth="8" fill="none" />
    {/* chat bubble tail */}
    <path d="M44 90 L38 104 L56 94 Z" fill="white" />
    {/* eyes */}
    <circle cx="50" cy="60" r="4" fill="white" />
    <circle cx="62" cy="60" r="4" fill="white" />
    <circle cx="74" cy="60" r="4" fill="white" />
  </svg>
);

const BottomSheet = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 30px 30px 0 0;
  padding: 40px 32px 48px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 14px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  border: 1.5px solid ${({ $borderColor }) => $borderColor};
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};

  &:hover {
    opacity: 0.85;
  }
`;

const IconWrap = styled.span`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0;
`;

const ButtonLabel = styled.span`
  flex: 1;
  text-align: center;
`;

/* Kakao speech bubble icon */
const KakaoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <ellipse cx="11" cy="10" rx="9" ry="8" fill="#3A1D1D" />
    <path d="M5 16 L8 12 Q11 18 14 12 L17 16" fill="#3A1D1D" />
    <path d="M7.5 9.5 Q7.5 8 9 8 Q11 8 11 10 Q11 12 9 12 Q7.5 12 7.5 10.5 Z" fill="#FEE500" />
    <circle cx="11" cy="9.8" r="1.2" fill="#FEE500" />
    <path d="M8 9.8 Q8 8.2 11 8.2 Q14 8.2 14 9.8 Q14 11.6 11.8 12.4 L13 14 L10 13 Q8 12.2 8 9.8 Z" fill="#FEE500" />
  </svg>
);

/* Google G icon */
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.38a4.6 4.6 0 01-2 3.02v2.5h3.24c1.9-1.75 3-4.33 3-7.31z" fill="#4285F4" />
    <path d="M10 20c2.7 0 4.96-.9 6.62-2.43l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H1.08v2.58A10 10 0 0010 20z" fill="#34A853" />
    <path d="M4.41 11.91A6.02 6.02 0 014.1 10c0-.66.11-1.3.31-1.91V5.51H1.08A10 10 0 000 10c0 1.61.39 3.14 1.08 4.49l3.33-2.58z" fill="#FBBC04" />
    <path d="M10 3.97c1.47 0 2.79.5 3.83 1.5l2.87-2.87C14.96.99 12.7 0 10 0A10 10 0 001.08 5.51L4.41 8.09C5.2 5.73 7.4 3.97 10 3.97z" fill="#EA4335" />
  </svg>
);

/* Facebook f icon */
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#1877F2" />
    <path d="M13.17 10H11V18H8V10H6V7.5h2V6c0-2 1.2-3 3-3 .85 0 1.72.07 2.17.13V5.5H11.9c-.95 0-1.1.45-1.1 1.1V7.5h2.5l-.33 2.5z" fill="white" />
  </svg>
);

const TextLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 4px;
`;

const TextLink = styled.button`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.gray400};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: underline;
  }
`;

const TextDivider = styled.span`
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fonts.size.sm};
`;

const LoginMain = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <LogoSection>
        <LogoSvg />
      </LogoSection>

      <BottomSheet>
        <SocialButton $borderColor="#FEE500">
          <IconWrap>
            <KakaoIcon />
          </IconWrap>
          <ButtonLabel>카카오톡 계정으로 로그인</ButtonLabel>
        </SocialButton>

        <SocialButton $borderColor="#DBDBDB">
          <IconWrap>
            <GoogleIcon />
          </IconWrap>
          <ButtonLabel>구글 계정으로 로그인</ButtonLabel>
        </SocialButton>

        <SocialButton $borderColor="#1877F2">
          <IconWrap>
            <FacebookIcon />
          </IconWrap>
          <ButtonLabel>페이스북 계정으로 로그인</ButtonLabel>
        </SocialButton>

        <TextLinks>
          <TextLink onClick={() => navigate('/login/email')}>이메일로 로그인</TextLink>
          <TextDivider>|</TextDivider>
          <TextLink onClick={() => navigate('/signup')}>회원가입</TextLink>
        </TextLinks>
      </BottomSheet>
    </PageWrapper>
  );
};

export default LoginMain;
