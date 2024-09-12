import { memo } from 'react';
import { Link } from 'react-router-dom';
import { number, string, oneOf, oneOfType } from 'prop-types';

import styles from './OtherSettingButton.module.css';
import icons from '@/icons';
import SVGIcon from '@/components/SVGIcon/SVGIcon';

OtherSettingButton.propTypes = {
  type: oneOf([
    'announcement',
    'headset',
    'question',
    'list',
    'information',
    'version',
  ]),
  navigateTo: oneOfType([number, string]),
};

const OtherSettingPageList = {
  announcement: '공지사항',
  headset: '문의하기',
  question: '자주 묻는 질문',
  list: '이용약관',
  information: '개인정보 처리방침',
  version: '버전정보(1.00)',
};

function OtherSettingButton({ type = 'announcement', navigateTo = '/error' }) {
  const iconStyle = icons[type];

  return (
    <Link className={styles.settingButton} to={navigateTo}>
      <div className={styles.settingTitle}>
        <SVGIcon {...iconStyle} />
        <span>{OtherSettingPageList[type]}</span>
      </div>
      <SVGIcon {...icons.nextArrow} />
    </Link>
  );
}

export default memo(OtherSettingButton);