import { useAuthStore } from '@/stores/authStore';
import { useMediaStore } from '@/stores/mediaStore';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import GlobalNav from '../GlobalNav/GlobalNav';
import style from './RootLayout.module.css';
import { memo } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RootLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const desktop = useMediaStore((store) => store.desktop);
  const validateToken = useAuthStore((store) => store.validateToken);
  const fetchUserInfo = useAuthStore((store) => store.fetchUserInfo);

  useEffect(() => {
    // 토큰이 유효하지 않으면 auth 페이지로 이동
    if (!validateToken()) navigate('/auth');
    fetchUserInfo().then((res) => console.log(res));
  }, [navigate, validateToken, fetchUserInfo]);

  const renderMobileNav = pathname === '/' || pathname === '/my';

  // darkBg가 필요한 경로 리스트
  const darkBgRoutes = ['/music', '/pick-up-bottle', '/letter-box'];
  const currentHour = new Date().getHours();
  // 홈에서는 시간에 따라, 나머지 경로는 darkBgRoutes에 따라 설정
  const darkBg =
    pathname === '/'
      ? currentHour >= 18 || currentHour < 6
      : darkBgRoutes.includes(pathname);

  return (
    <div className={style.component}>
      <Outlet />
      {/* GlobalNav는 home과 my 페이지에서만 mobile에서도 렌더링, 나머지는 desktop에서만 렌더링 */}
      {renderMobileNav ? (
        <GlobalNav darkBg={darkBg} />
      ) : (
        desktop && <GlobalNav darkBg={darkBg} />
      )}
    </div>
  );
}

export default memo(RootLayout);
