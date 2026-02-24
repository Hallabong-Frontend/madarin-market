import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 60px 34px 40px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.xxl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 40px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.gray400};
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid ${({ $focused, theme }) => $focused ? theme.colors.primary : theme.colors.border};
  padding: 8px 0;
  font-size: ${({ theme }) => theme.fonts.size.base};
  color: ${({ theme }) => theme.colors.black};
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.xs};
  color: ${({ theme }) => theme.colors.error};
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  width: 100%;
  padding: 14px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  background-color: ${({ disabled, theme }) => disabled ? theme.colors.gray200 : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  transition: ${({ theme }) => theme.transitions.base};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};

  &:not(:disabled):hover { opacity: 0.9; }
`;

const SignUpLink = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.gray400};
  cursor: pointer;

  &:hover { text-decoration: underline; }
`;

const LoginEmail = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [focused, setFocused] = useState({ email: false, password: false });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isActive = form.email.trim() && form.password.trim();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isActive || isLoading) return;

    setIsLoading(true);
    try {
      const data = await login(form.email, form.password);
      // 새 API: flat 구조 { token, ... } / 구 API: { user: { token, ... } }
      const token = data.token ?? data.user?.token;
      const userData = data.token ? data : data.user;
      if (token) {
        authLogin(token, userData);
        navigate('/feed', { replace: true });
      } else {
        console.error('[Login] token 없음:', data);
        setError(data.message || '로그인에 실패했습니다.');
      }
    } catch (err) {
      console.error('[Login Failed]', err.response?.status, err.response?.data);
      setError(err.response?.data?.message || '이메일 또는 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>이메일</Label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onFocus={() => setFocused({ ...focused, email: true })}
            onBlur={() => setFocused({ ...focused, email: false })}
            $focused={focused.email}
            autoComplete="email"
          />
        </Field>
        <Field>
          <Label>비밀번호</Label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onFocus={() => setFocused({ ...focused, password: true })}
            onBlur={() => setFocused({ ...focused, password: false })}
            $focused={focused.password}
            autoComplete="current-password"
          />
          {error && <ErrorText>{error}</ErrorText>}
        </Field>
        <SubmitButton type="submit" disabled={!isActive || isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </SubmitButton>
      </Form>
      <SignUpLink onClick={() => navigate('/signup')}>
        이메일로 회원가입
      </SignUpLink>
    </Wrapper>
  );
};

export default LoginEmail;
