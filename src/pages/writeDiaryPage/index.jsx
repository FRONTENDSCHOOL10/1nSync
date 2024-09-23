import BackButton from '@/components/BackButton/BackButton';
import ModalDialog from '@/components/ModalDialog/ModalDialog';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { useAuthStore } from '@/stores/authStore';
import { useDiaryStore } from '@/stores/diaryStore';
import { useMediaStore } from '@/stores/mediaStore';
import { formatDate } from '@/utils';
import { memo, useCallback, useEffect, useId, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SaveButton from './components/SaveButton/SaveButton';
import styles from './WriteDiaryPage.module.css';
import { Helmet } from 'react-helmet-async';

function WriteDiaryPage() {
  const navigate = useNavigate();
  const desktop = useMediaStore((store) => store.desktop);
  const { emotion } = useParams();
  const formId = useId();
  const textAreaRef = useRef(null);
  const [currentModal, setCurrentModal] = useState('');
  const setDiary = useDiaryStore((store) => store.setDiary);
  const userInfo = useAuthStore((store) => store.userInfo);

  const today = new Date();
  const formattedDate1 = formatDate(today, 1); // 2024-09-18 형식
  const formattedDate2 = formatDate(today, 2); // 24.09.18 (Wed) 형식

  const handleResizeHeight = (e) => {
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
  };

  const openModal = useCallback(
    (modalName) => () => setCurrentModal(modalName),
    []
  );
  const closeModal = useCallback(() => setCurrentModal(null), []);
  const confirmModal = useCallback(() => {
    if (currentModal === 'back') {
      navigate(-1);
    }
    if (currentModal === 'save') {
      const message = textAreaRef.current.value;
      setDiary({ message, emotion, userId: userInfo.id });
      navigate('/write-diary/select-reply/1');
    }
  }, [currentModal, navigate, setDiary, emotion, userInfo.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal('save')();
  };

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  return (
    <div className={styles.page}>
      <Helmet>
        <title>일기 쓰기 - 해마디</title>
        <meta
          name="description"
          content="감정을 기록하며 일기를 작성해 보세요"
        />
        <meta property="og:title" content="일기 쓰기 - 해마디" />
        <meta
          property="og:description"
          content="감정을 기록하며 일기를 작성해 보세요"
        />
        <meta name="twitter:title" content="일기 쓰기 - 해마디" />
        <meta
          name="twitter:description"
          content="감정을 기록하며 일기를 작성해 보세요"
        />
      </Helmet>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <BackButton onClick={openModal('back')} tabIndex={1} />
          <h1>일기 작성하기</h1>
          <SaveButton form={formId} tabIndex={3} />
        </div>
        {desktop && <time dateTime={formattedDate1}>{formattedDate2}</time>}
      </header>

      <main className={styles.main}>
        {!desktop && <time dateTime={formattedDate1}>{formattedDate2}</time>}

        <form id={formId} className={styles.diary} onSubmit={handleSubmit}>
          <h2>오늘은 어떤 하루였나요?</h2>
          <SVGIcon
            {...icons[`shell_${emotion}`]}
            width={58}
            style={{ marginBottom: desktop ? '45px' : '38px' }}
          />
          <h3>오늘의 이야기를 들려주세요.</h3>
          <textarea
            ref={textAreaRef}
            onChange={handleResizeHeight}
            rows={10}
            required
            tabIndex={2}
            placeholder="당신의 이야기를 작성해주세요."
          ></textarea>
        </form>
      </main>

      <ModalDialog
        isOpen={currentModal === 'back' || currentModal === 'save'}
        closeModal={closeModal}
        confirmModal={confirmModal}
      >
        {currentModal === 'back' ? (
          <>
            <h2>정말 돌아가시나요?</h2>
            <p>{'저장하지 않은 일기의 내용은\n저장되지 않습니다.'}</p>
          </>
        ) : (
          <>
            <h2>일기 작성을 마무리하시나요?</h2>
            <p>{'작성한 일기에 받을 답장 선택 후,\n최종 저장됩니다.'}</p>
          </>
        )}
      </ModalDialog>
    </div>
  );
}

export default memo(WriteDiaryPage);
