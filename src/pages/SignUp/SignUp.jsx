import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { checkEmailValid } from '../../api/auth';
import { validateEmail } from '../../utils/format';

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 60px 34px 40px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.xxl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 32px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  border-bottom: 1px solid ${({ $focused, $error, theme }) =>
    $error ? theme.colors.error : $focused ? theme.colors.primary : theme.colors.border};
  padding: 8px 0;
  font-size: ${({ theme }) => theme.fonts.size.base};
  color: ${({ theme }) => theme.colors.black};
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder { color: ${({ theme }) => theme.colors.gray300}; }
`;

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.xs};
  color: ${({ theme }) => theme.colors.error};
`;

const NextButton = styled.button`
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
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [focused, setFocused] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isChecking, setIsChecking] = useState(false);

  const isValid = !errors.email && !errors.password && form.email && form.password;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmailBlur = async () => {
    setFocused((prev) => ({ ...prev, email: false }));
    if (!form.email) return;

    if (!validateEmail(form.email)) {
      setErrors((prev) => ({ ...prev, email: '이메일 형식이 올바르지 않습니다.' }));
      return;
    }

    setIsChecking(true);
    try {
      const data = await checkEmailValid(form.email);
      if (data.message.includes('사용 가능한')) {
        setErrors((prev) => ({ ...prev, email: '' }));
      } else {
        setErrors((prev) => ({ ...prev, email: data.message }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, email: err.response?.data?.message || '이미 사용 중인 이메일입니다.' }));
    } finally {
      setIsChecking(false);
    }
  };

  const handlePasswordBlur = () => {
    setFocused((prev) => ({ ...prev, password: false }));
    if (!form.password) return;
    if (form.password.length < 6) {
      setErrors((prev) => ({ ...prev, password: '비밀번호는 6자 이상이어야 합니다.' }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    navigate('/signup/profile', { state: { email: form.email, password: form.password } });
  };

  return (
    <Wrapper>
      <Title>이메일로 회원가입</Title>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>이메일</Label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onFocus={() => setFocused({ ...focused, email: true })}
            onBlur={handleEmailBlur}
            $focused={focused.email}
            $error={!!errors.email}
            placeholder="이메일을 입력하세요"
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </Field>
        <Field>
          <Label>비밀번호</Label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onFocus={() => setFocused({ ...focused, password: true })}
            onBlur={handlePasswordBlur}
            $focused={focused.password}
            $error={!!errors.password}
            placeholder="비밀번호를 입력하세요 (6자 이상)"
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </Field>
        <NextButton type="submit" disabled={!isValid || isChecking}>
          다음
        </NextButton>
      </Form>
    </Wrapper>
  );
};

export default SignUp;
