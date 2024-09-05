import style from './GNBLink.module.css';
import icons from '@/icons';
import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { string } from 'prop-types';
import SVGIcon from '../SVGIcon/SVGIcon';

GNBLink.propTypes = {
  initialSelected: string,
};

function GNBLink({ initialSelected = 'navBottle' }) { // initialSelected 아이콘 변경 시 selected 상태 변경
  const [selectedIcon, setSelectedIcon] = useState(initialSelected);

  const handleIconClick = (event, iconName) => {
    setSelectedIcon(iconName);
  };

  const bottleIcon = icons.navBottle;
  const bottleIconSelected = icons.navBottle_selected;
  const musicIcon = icons.navMusic;
  const musicIconSelected = icons.navMusic_selected;
  const personIcon = icons.navPerson;
  const personIconSelected = icons.navPerson_selected;

  return (
    <nav className={style.gnbContainer}>
      <NavLink
        to="/music"
        onClick={() => handleIconClick('navMusic')}
        className={({ isActive, isPending }) => 
          `${style.gnbItem} ${isPending ? style.pending : isActive ? style.active : ''}`
        }
        aria-label="플레이리스트로 이동하기"
      >
        <SVGIcon
          {...(selectedIcon === 'navMusic' ? musicIconSelected : musicIcon)}
          aria-hidden="true"
        />
      </NavLink>
      <NavLink
        to="/home"
        onClick={() => handleIconClick('navBottle')}
        className={({ isActive, isPending }) => 
          `${style.gnbItem} ${isPending ? style.pending : isActive ? style.active : ''}`
        }
        aria-label="메인 홈으로 이동하기"
      >
        <SVGIcon
          {...(selectedIcon === 'navBottle' ? bottleIconSelected : bottleIcon)}
          aria-hidden="true"
        />
      </NavLink>
      <NavLink
        to="/my"
        onClick={() => handleIconClick('navPerson')}
        className={({ isActive, isPending }) => 
          `${style.gnbItem} ${isPending ? style.pending : isActive ? style.active : ''}`
        }
        aria-label="내 정보로 이동하기"
      >
        <SVGIcon
          {...(selectedIcon === 'navPerson' ? personIconSelected : personIcon)}
          aria-hidden="true"
        />
      </NavLink>
    </nav>
  );
}

export default memo(GNBLink);

// 사용 시 <GNBLink initialSelected="navBottle" />로 사용하면 됩니다.
//초기 아이콘 selected 상태 변경 시 12번줄 IconName도 같이 변경해야 합니다