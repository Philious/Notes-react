// import '@/components/dayInfo.scss';
import { IconEnum, ButtonEnum, PageEnum } from "@/types/enums"
import { useEffect, useState } from "react";
import night from '@/assets/images/night.png';
import morning from '@/assets/images/morning.png';
import midday from '@/assets/images/midday.png';
import afternoon from '@/assets/images/afternoon.png';
import evening from '@/assets/images/evening.png';
import IconButton from "@/components/IconButton";

import { useLoginState, useOverlay } from '@/hooks/providerHooks';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const DayInfo: React.FC = () => {
  const [timeOfDay, setTimeOfDay] = useState<{ greeting: string, img: string }>({ greeting: '', img: '' });
  const [date, setDate] = useState('');
  const { logout } = useLoginState();
  const { setDialog } = useOverlay();
  const navigate = useNavigate();
  const redirectSignOut = () => {
    logout();
    // localStorage.removeItem('notesTestData');
    navigate(PageEnum.LOGIN);
  }

  const updateDayState = () => {
    setDate(new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}));
    const d = new Date().getHours(); 
    const image = (img:string) => `linear-gradient(180deg,hsla(0, 0%, 0%, 0) 75%, hsl(0, 0%, 0%)), url(${img})`;
    setTimeOfDay(d < 5
      ? { greeting: 'Sleep', img: image(night) }
      : d < 9
      ? { greeting: 'Good Morning', img: image(morning) }
      : d < 12
      ? { greeting: 'Good Day', img: image(midday) }
      : d < 17
      ? { greeting: 'Good Afternoon', img: image(afternoon) }
      : d < 23
      ? { greeting: 'Good Evening', img: image(evening) }
      : { greeting: 'Good Night', img: image(night) } 
    );
  }

  const logoutMenu = () => setDialog({
    title: 'Logout?',
    content: '',
    actions: [
      {
        name: 'Yes',
        action: redirectSignOut,
      },
      {
        name: 'No',
        action: () => {},
      },
    ]
});

  useEffect(() => {
    updateDayState();
    const interval = setInterval(() => updateDayState(), (1000 * 60 * 60) - new Date().getMinutes())

    return () => {
      clearInterval(interval)
    };
  }, []);

  return (
    <Wrapper className="day" $image={timeOfDay.img}>
      <Greeting className="text">
        { timeOfDay.greeting }
      </Greeting>
      <Today className="text date">
        { date }
      </Today>
      <IconButton
        type={ButtonEnum.Default}
        icon={IconEnum.LogOut}
        action={logoutMenu}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div<{ $image?: string; }>`
  background-image: ${props => props.$image};
  --shadow: drop-shadow(0 0 1px hsla(0, 0%, 0%, .75)) drop-shadow(0 1px 2px hsla(0, 0%, 0%, .5));
  box-sizing: border-box;
  grid-area: var(--day-area);
  height: var(--day-area-height);
  display: grid;
  padding: .5rem 1rem 1rem;
  place-content: end start;
  place-items: center start;
  background-size: cover;
  box-shadow: 0 6px 4px -4px #000, 0 12px 8px -8px #000, 0 18px 12px -12px #000, 1px 0 0 var(--n-300);
  color: #fff;
  position: sticky;
  inset: 0 0 auto 0;
  gap: .5rem;
  line-height: 1;
  z-index: 1;

  .icn-btn {
    position: absolute;
    top: 0;
    right: 0;
    filter: var(--shadow); 
  }
  .icn {
    fill: var(--white);
  }
`;

const Greeting = styled.div`
    position: relative;
    font-weight: 600;
    font-size: 1rem;
    filter: var(--shadow);
`;

const Today = styled(Greeting)`
  text-transform: uppercase;
  font-weight: 700;
  font-size: .625rem;
`;