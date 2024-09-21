import { memo } from 'react';

import styles from './ProgressContents.module.css';
import NickNameInput from '../NickNameInput/NickNameInput';

function SetNickName() {
  return (
    <div className={styles.setNickName}>
      <p className={styles.title}>
        만나서 반가워요!
        <br />
        먼저 사용하실
        <br />
        닉네임을 알려주세요!
      </p>
      <NickNameInput></NickNameInput>
    </div>
  );
}

export default memo(SetNickName);