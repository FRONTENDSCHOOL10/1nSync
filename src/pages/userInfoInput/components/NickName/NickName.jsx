import styles from './NickName.module.css';
import PropTypes from 'prop-types';
import React, { useState, memo } from 'react';
import icons from '@/icons';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { useMediaStore } from '@/stores/mediaStore';

const NickName = ({ initialNickname }) => {
  const [nickname, setNickname] = useState(initialNickname || '');
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isDesktop = useMediaStore((store) => store.desktop);

  // 닉네임 유효성 검사
  const validateNickname = (name) => /^[가-힣a-zA-Z0-9 ]{4,9}$/.test(name);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Input name:", name);
    if (validateNickname(value)) {
      setNickname(value);
      setErrorMessage('');
    } else {
      setErrorMessage('닉네임은 공백 포함 4~9 글자이며, 특수 문자는 포함될 수 없습니다.');
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleClear = () => {
    setNickname('');
    setErrorMessage('');
  };

  return (
    <form className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id="nickname"
          name="nickname"
          defaultValue={nickname}
          placeholder="닉네임을 작성해주세요"
          className={styles.input}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="닉네임 지우기"
        >
          <SVGIcon 
            {...icons.remove} 
            color={isDesktop ? '#000' : icons.remove.color} 
          />
        </button>
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </form>
  );
};

NickName.propTypes = {
  initialNickname: PropTypes.string,
};

export default memo(NickName);
