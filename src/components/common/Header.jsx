import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 뒤로가기 아이콘
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6" stroke="#767676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 점 세개 아이콘
const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="5" cy="12" r="2" fill="#767676"/>
    <circle cx="12" cy="12" r="2" fill="#767676"/>
    <circle cx="19" cy="12" r="2" fill="#767676"/>
  </svg>
);

// 검색 아이콘
const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="8" stroke="#767676" strokeWidth="2"/>
    <path d="M21 21L16.65 16.65" stroke="#767676" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const BackButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size.md};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.black};
  flex: 1;
  text-align: center;
`;

const RightButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TextButton = styled.button`
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ disabled, theme }) => disabled ? theme.colors.gray300 : theme.colors.primary};
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  transition: ${({ theme }) => theme.transitions.base};
  &:disabled {
    pointer-events: none;
  }
`;

const UploadButton = styled.button`
  background-color: ${({ disabled, theme }) => disabled ? theme.colors.gray200 : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  padding: 6px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  transition: ${({ theme }) => theme.transitions.base};
  &:disabled {
    pointer-events: none;
  }
`;

// type: 'back-search' | 'back-more' | 'back-title' | 'back-title-more' | 'back-title-upload' | 'back-title-save'
const Header = ({
  type = 'back-title',
  title = '',
  onBack,
  onMore,
  onSearch,
  rightText,
  onRightText,
  rightDisabled = false,
  showUpload = false,
  uploadDisabled = true,
  onUpload,
  saveDisabled = true,
  onSave,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <HeaderWrapper>
      <BackButton onClick={handleBack} aria-label="뒤로가기">
        <BackIcon />
      </BackButton>

      {title && <Title>{title}</Title>}
      {!title && <div style={{ flex: 1 }} />}

      {type === 'back-search' && (
        <RightButton onClick={onSearch} aria-label="검색">
          <SearchIcon />
        </RightButton>
      )}
      {type === 'back-more' && (
        <RightButton onClick={onMore} aria-label="더보기">
          <MoreIcon />
        </RightButton>
      )}
      {(type === 'back-title-more' || type === 'back-more') && onMore && (
        <RightButton onClick={onMore} aria-label="더보기">
          <MoreIcon />
        </RightButton>
      )}
      {type === 'back-title-upload' && (
        <UploadButton disabled={uploadDisabled} onClick={onUpload}>
          업로드
        </UploadButton>
      )}
      {type === 'back-title-save' && (
        <TextButton disabled={saveDisabled} onClick={onSave}>
          저장
        </TextButton>
      )}
      {type === 'back-title-text' && (
        <TextButton disabled={rightDisabled} onClick={onRightText}>
          {rightText}
        </TextButton>
      )}
      {!['back-search', 'back-more', 'back-title-more', 'back-title-upload', 'back-title-save', 'back-title-text'].includes(type) && (
        <div style={{ width: 32 }} />
      )}
    </HeaderWrapper>
  );
};

export default Header;
