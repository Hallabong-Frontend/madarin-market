import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { searchUser } from '../../api/user';
import UserItem from '../../components/user/UserItem';
import Spinner from '../../components/common/Spinner';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
`;

const SearchHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BackButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  padding: 8px 12px;
  gap: 8px;
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  font-size: ${({ theme }) => theme.fonts.size.base};
  color: ${({ theme }) => theme.colors.black};

  &::placeholder { color: ${({ theme }) => theme.colors.gray300}; }
`;

const EmptySearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 32px;
`;

const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.base};
  color: ${({ theme }) => theme.colors.gray400};
`;

const ResultList = styled.ul``;

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6" stroke="#767676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchIconSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="8" stroke="#767676" strokeWidth="2"/>
    <path d="M21 21L16.65 16.65" stroke="#767676" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 디바운스 처리
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce(async (value) => {
      if (!value.trim()) {
        setResults([]);
        setHasSearched(false);
        return;
      }
      setIsLoading(true);
      setHasSearched(true);
      try {
        const data = await searchUser(value);
        setResults(data || []);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 400),
    []
  );

  const handleChange = (e) => {
    setKeyword(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <Wrapper>
      <SearchHeader>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon />
        </BackButton>
        <SearchInputWrapper>
          <SearchIconSvg />
          <SearchInput
            type="text"
            value={keyword}
            onChange={handleChange}
            placeholder="계정을 검색해보세요"
            autoFocus
          />
        </SearchInputWrapper>
      </SearchHeader>

      {isLoading ? (
        <Spinner />
      ) : hasSearched && results.length === 0 ? (
        <EmptySearch>
          <EmptyText>검색 결과가 없습니다.</EmptyText>
        </EmptySearch>
      ) : (
        <ResultList>
          {results.map((user) => (
            <li key={user.accountname}>
              <UserItem userData={user} keyword={keyword} />
            </li>
          ))}
        </ResultList>
      )}
    </Wrapper>
  );
};

export default Search;
