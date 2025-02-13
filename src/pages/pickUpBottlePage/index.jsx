import { useRef, useEffect, memo, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

import styles from './PickUpBottlePage.module.css';
import { readDiaries } from '@/api/diaries';
import { useAuthStore } from '@/stores/authStore';
import { getRandomNumbers } from '@/utils';
import BackButton from '@/components/BackButton/BackButton';
import Button from '@/components/Button/Button';
import BottleRadioGroup from './components/BottleRadioGroup/BottleRadioGroup';
import { isSameDay } from 'date-fns';
import { readReplies } from '@/api/replies';
import { useToaster } from '@/stores/ToasterStore';

function PickUpBottlePage() {
  const navigate = useNavigate();
  const desktop = useMediaQuery({ query: '(min-width: 960px)' });
  const userInfo = useAuthStore((store) => store.userInfo);
  const toast = useToaster();

  /* --------------------------------- 스타일 객체 --------------------------------- */
  const backButtonStyle = useMemo(
    () => ({
      position: 'absolute',
      top: desktop ? '8vh' : '24px',
      left: desktop ? 'calc(50vw - 130px)' : '40px',
    }),
    [desktop]
  );
  const buttonStyle = useMemo(
    () => ({
      marginTop: desktop ? '6.8vh' : '5.1vh',
    }),
    [desktop]
  );

  /* ------------------------------ 서버에 일기 목록 요청 ------------------------------ */
  const filterQuery = useMemo(
    () =>
      userInfo.interest
        .map((interest) => `userId.interest~"${interest}"`)
        .join(' || '),
    [userInfo.interest]
  );

  const diariesParams = useMemo(
    () =>
      new URLSearchParams({
        // 일기 5개만 가저오려 했는데 다른 사람이랑 겹칠 확률이 높을 듯
        // 답장이 없고 && 자신이 쓴 일기가 아니고 && 관심사가 하나 이상 겹치는 사람의 일기
        filter: `replyId="" && userId!="${userInfo.id}" && (${filterQuery})`,
        expand: 'userId',
      }).toString(),
    [filterQuery, userInfo.id]
  );

  const {
    data: diariesData,
    error: diariesError,
    isLoading: diariesLoading,
  } = useQuery({
    queryKey: ['diaries', diariesParams],
    queryFn: () => readDiaries(diariesParams),
  });

  /* ------------------------------ 서버에 답장 목록 요청 ------------------------------ */
  const repliesParams = useMemo(
    () =>
      new URLSearchParams({
        page: 1,
        perPage: 1,
        sort: '-created',
        filter: `userId="${userInfo.id}"`,
      }).toString(),
    [userInfo.id]
  );

  const {
    data: repliesData,
    error: repliesError,
    isLoading: repliesLoading,
  } = useQuery({
    queryKey: ['replies', repliesParams],
    queryFn: () => readReplies(repliesParams),
  });

  /* ------------------------------ 조건부 redirect ------------------------------ */
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    // 자신이 작성한 가장 최근 답장과 오늘 날짜가 같으면 홈 페이지로 돌아감
    if (isSameDay(new Date(repliesData?.items[0]?.created), new Date())) {
      toast('warn', '오늘은 이미 답장을 작성했어요.');
      navigate('/');
    }
    // 답장할 일기가 없으면 홈 페이지로 돌아감
    else if (diariesData?.items.length === 0) {
      toast('warn', '답장할 편지가 없어요.');
      navigate('/');
    }
  }, [diariesData?.items, navigate, repliesData?.items, toast]);

  if (diariesError || repliesError) return <div>{diariesError.message}</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bottleIndex = formData.get('bottle');

    const letterIndexList = getRandomNumbers(diariesData?.items.length, 5);
    const letterIndex = letterIndexList[bottleIndex];
    const letterId = diariesData?.items[letterIndex].id;
    navigate(`view-letter/${letterId}`);
  };

  /* -------------------------------------------------------------------------- */
  /*                     오늘 이미 답장을 했다면 홈 화면으로 redirect 처리 필요                    */
  /* -------------------------------------------------------------------------- */

  return (
    <div className={styles.page}>
      <Helmet>
        <title>유리병 건지기 - 해마디</title>
        <meta
          name="description"
          content="해마디에서 감정의 병을 주워 일기를 확인해 보세요"
        />
        <meta property="og:title" content="유리병 건지기 - 해마디" />
        <meta
          property="og:description"
          content="해마디에서 감정의 병을 주워 일기를 확인해 보세요"
        />
        <meta name="twitter:title" content="유리병 건지기 - 해마디" />
        <meta
          name="twitter:description"
          content="해마디에서 감정의 병을 주워 일기를 확인해 보세요"
        />
      </Helmet>

      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <BackButton color="white" style={backButtonStyle} />
          <h1>마디 유리병 편지함</h1>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>{'5개의 유리병 중 하나를 골라\n편지에 답장을 할 수 있어요'}</h2>
          <BottleRadioGroup desktop={desktop} />
          <p>
            {'편지는 익명의 사용자에게 받게 되며\n한번의 답장을 할 수 있어요'}
          </p>
          <Button
            role="submit"
            state={diariesLoading || repliesLoading ? 'disabled' : 'default'}
            style={buttonStyle}
          >
            {diariesLoading || repliesLoading ? (
              <>
                <SyncLoader color="#2E7FB9" size={12} aria-hidden="true" />
                <span className="sr-only">
                  서버에서 데이터를 불러온 후에 버튼이 활성화됩니다.
                </span>
              </>
            ) : (
              '이걸로 선택할게요'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default memo(PickUpBottlePage);
