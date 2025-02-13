import { memo, useCallback, useEffect, useId, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { createDiary, updateDiary } from '@/api/diaries';
import generateAIReply from '@/api/gemini';
import { createReply } from '@/api/replies';
import { searchVideo } from '@/api/youtube';
import Button from '@/components/Button/Button';
import SendingCompleteScreen from '@/components/SendingCompleteScreen/SendingCompleteScreen';
import SendingScreen from '@/components/SendingScreen/SendingScreen';
import { useDiaryStore } from '@/stores/diaryStore';
import { useToaster } from '@/stores/ToasterStore';
import ContentsRadioGroup from './components/ContentsRadioGroup/ContentsRadioGroup';
import ReplierRadioGroup from './components/ReplierRadioGroup/ReplierRadioGroup';
import styles from './SelectReplyPage.module.css';

function SelectReplyPage() {
  const navigate = useNavigate();
  const toast = useToaster();
  const { step } = useParams();
  const { diary, resetDiary } = useDiaryStore();
  const formId = useId();
  const [status, setStatus] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [showComplete, setShowComplete] = useState(null);

  const handleSelect = useCallback((value) => setSelectedValue(value), []);

  useEffect(() => {
    setSelectedValue(null);
  }, [step]);

  const renderContent = () => {
    if (step === '1')
      return (
        <>
          <h1>누구에게 답장을 받고 싶은가요?</h1>
          <ReplierRadioGroup
            selectedValue={selectedValue}
            onSelect={handleSelect}
          />
        </>
      );
    if (step === '2')
      return (
        <>
          <h1>Ai 마디에게 어떤 답장을 받아볼까요?</h1>
          <ContentsRadioGroup
            selectedValue={selectedValue}
            onSelect={handleSelect}
          />
        </>
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let AIData; // AIData 변수를 상위 범위에서 정의

    if (step === '1') {
      if (selectedValue === 'ai') {
        setSelectedValue(null);
        navigate('/write-diary/select-reply/2');
        return;
      } else {
        createDiary(diary)
          .then(() => {
            setStatus('success');
            resetDiary();
          })
          .catch((error) => {
            setStatus('error');
            throw new Error(error);
          });
      }
    }

    if (step === '2') {
      /* Ai 답장 */
      generateAIReply(
        `${selectedValue}으로 답장해줘. 내 일기: ` + diary.message
      )
        .then((result) => {
          AIData = {
            ...JSON.parse(result.response.text()),
            replier: 'ai',
          };

          // selectedValue가 'music'인 경우 유튜브 영상 ID 추가
          if (selectedValue === 'music') {
            return searchVideo(
              `${AIData.content.musicArtist} ${AIData.content.musicTitle}`
            ).then((videoId) => {
              AIData.content = {
                ...AIData.content,
                musicId: videoId.items[0]?.id?.videoId || null,
              };
            });
          }
        })
        .then(() => createDiary(diary))
        .then((diaryData) => {
          return createReply({
            ...AIData, // 이제 AIData가 정의됨
            diaryId: diaryData.id,
            typeOfContent: selectedValue,
          });
        })
        .then((replyData) => {
          return updateDiary({
            id: replyData.diaryId,
            replyId: replyData.id,
          });
        })
        .then(() => {
          setStatus('success');
          resetDiary();
        })
        .catch((error) => {
          console.error(error);
          toast('warn', '잠시 후 다시 시도해주세요.');
          setStatus('error');
        });
    }

    setStatus('loading'); // 상태를 맨 아래로 이동
  };

  const onComplete = (value) => {
    if (value !== showComplete) {
      // 무한 루프 방지
      setShowComplete(value);
    }
  };

  // 서버 요청 중 유리병 보내는 화면
  if (status === 'loading') return <SendingScreen onComplete={onComplete} />;
  // 서버 요청 성공 후 잠시동안 완료 화면 보여줌
  if (status === 'success' && showComplete) return <SendingCompleteScreen />;
  // 완료 화면 끝나면 홈 화면으로 이동
  if (status === 'success' && !showComplete) return <Navigate to="/" />;

  return (
    <div className={styles.pageBackground}>
      <Helmet>
        <title>답장 선택 - 해마디</title>
        <meta
          name="description"
          content="해마디에서 다양한 답장 중 선택하세요"
        />
        <meta property="og:title" content="답장 선택 - 해마디" />
        <meta
          property="og:description"
          content="해마디에서 다양한 답장 중 선택하세요"
        />
        <meta name="twitter:title" content="답장 선택 - 해마디" />
        <meta
          name="twitter:description"
          content="해마디에서 다양한 답장 중 선택하세요"
        />
      </Helmet>
      <div className={styles.page}>
        <form id={formId} onSubmit={handleSubmit}>
          {renderContent()}
        </form>

        <Button
          role="submit"
          state={selectedValue ? 'default' : 'disabled'}
          form={formId}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
}

export default memo(SelectReplyPage);
