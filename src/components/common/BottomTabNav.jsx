import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 390px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: ${({ theme }) => theme.zIndex.tabNav};
`;

const NavItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: 1;
  height: 100%;
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.gray300};

  svg path, svg circle, svg rect {
    stroke: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.gray300};
  }
`;

const NavLabel = styled.span`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
`;

const PostButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: 1;
  height: 100%;
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.gray300};

  svg path {
    fill: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.gray300};
    stroke: none;
  }
`;

// 홈 아이콘
const HomeIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V16H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
      stroke={active ? '#F26E22' : '#DBDBDB'} strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

// 채팅 아이콘
const ChatIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
      stroke={active ? '#F26E22' : '#DBDBDB'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 게시글 작성 아이콘
const PostIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke={active ? '#F26E22' : '#DBDBDB'} strokeWidth="2"/>
    <path d="M12 8V16M8 12H16" stroke={active ? '#F26E22' : '#DBDBDB'} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// 프로필 아이콘
const ProfileIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke={active ? '#F26E22' : '#DBDBDB'} strokeWidth="2"/>
    <path d="M4 20C4 17.7909 7.58172 16 12 16C16.4183 16 20 17.7909 20 20"
      stroke={active ? '#F26E22' : '#DBDBDB'} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const BottomTabNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const tabs = [
    { label: '홈', path: '/feed', icon: HomeIcon },
    { label: '채팅', path: '/chat', icon: ChatIcon },
    { label: '게시글', path: '/post/create', icon: PostIcon, isPost: true },
    { label: '프로필', path: `/profile/${user?.accountname}`, icon: ProfileIcon },
  ];

  const isActive = (path) => {
    if (path === '/feed') return location.pathname === '/feed' || location.pathname === '/';
    if (path.startsWith('/profile/')) return location.pathname.startsWith('/profile/');
    return location.pathname === path;
  };

  return (
    <NavWrapper>
      {tabs.map((tab) => {
        const active = isActive(tab.path);
        const Icon = tab.icon;
        return (
          <NavItem key={tab.label} $active={active} onClick={() => navigate(tab.path)}>
            <Icon active={active} />
            <NavLabel>{tab.label}</NavLabel>
          </NavItem>
        );
      })}
    </NavWrapper>
  );
};

export default BottomTabNav;
