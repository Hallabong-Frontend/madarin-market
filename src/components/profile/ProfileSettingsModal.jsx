import {
  SettingsOverlay,
  SettingsSheet,
  SettingsTopBar,
  SettingsTitle,
  SettingsCloseIconBtn,
  SettingRow,
  SettingLabel,
  ThemeToggle,
  ThemeToggleKnob,
  PrivacyToggleRow,
  PrivacyChevron,
  PrivacyDetails,
  PrivacyItem,
  PrivacyKey,
  PrivacyValue,
} from '../../pages/Profile/Profile.styles';

const ProfileSettingsModal = ({
  showSettingsModal,
  setShowSettingsModal,
  isDark,
  toggleMode,
  showPrivacyInfo,
  setShowPrivacyInfo,
  privacyEmail,
  me,
}) => {
  if (!showSettingsModal) return null;

  return (
    <SettingsOverlay onClick={() => setShowSettingsModal(false)}>
      <SettingsSheet onClick={(e) => e.stopPropagation()}>
        <SettingsTopBar>
          <SettingsTitle>설정 및 개인정보</SettingsTitle>
          <SettingsCloseIconBtn type="button" aria-label="설정 닫기" onClick={() => setShowSettingsModal(false)}>
            ×
          </SettingsCloseIconBtn>
        </SettingsTopBar>

        <SettingRow>
          <SettingLabel>다크모드</SettingLabel>
          <ThemeToggle
            type="button"
            $active={isDark}
            role="switch"
            aria-checked={isDark}
            aria-label="다크모드 토글"
            onClick={toggleMode}
          >
            <ThemeToggleKnob $active={isDark} />
          </ThemeToggle>
        </SettingRow>

        <PrivacyToggleRow type="button" onClick={() => setShowPrivacyInfo((prev) => !prev)}>
          <span>개인정보</span>
          <PrivacyChevron>{showPrivacyInfo ? '▲' : '▼'}</PrivacyChevron>
        </PrivacyToggleRow>

        {showPrivacyInfo && (
          <PrivacyDetails>
            <PrivacyItem>
              <PrivacyKey>email</PrivacyKey>
              <PrivacyValue>{privacyEmail || '정보 없음'}</PrivacyValue>
            </PrivacyItem>
            <PrivacyItem>
              <PrivacyKey>username</PrivacyKey>
              <PrivacyValue>{me?.username || '정보 없음'}</PrivacyValue>
            </PrivacyItem>
            <PrivacyItem>
              <PrivacyKey>accountname</PrivacyKey>
              <PrivacyValue>{me?.accountname || '정보 없음'}</PrivacyValue>
            </PrivacyItem>
          </PrivacyDetails>
        )}
      </SettingsSheet>
    </SettingsOverlay>
  );
};

export default ProfileSettingsModal;
