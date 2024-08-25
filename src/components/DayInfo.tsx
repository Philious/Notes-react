// import '@/components/dayInfo.scss';
import { IconEnum, ButtonEnum, PageEnum } from "@/types/enums"
import { useEffect, useState } from "react";
import night from '@/assets/images/night.jp2';
import morning from '@/assets/images/morning.jp2';
import midday from '@/assets/images/midday.jp2';
import afternoon from '@/assets/images/afternoon.jp2';
import evening from '@/assets/images/evening.jp2';
import nightFallback from '@/assets/images/night.jpg';
import morningFallback from '@/assets/images/morning.jpg';
import middayFallback from '@/assets/images/midday.jpg';
import afternoonFallback from '@/assets/images/afternoon.jpg';
import eveningFallback from '@/assets/images/evening.jpg';
import IconButton from "@/components/IconButton";
import { useOverlay } from '@/hooks/providerHooks';
import styled from 'styled-components';
import { userAPI } from "@/api/firebaseAPI";
import { checkedNavigation } from "@/utils/sharedUtils";
import { useNavigate } from "react-router-dom";

export const DayInfo: React.FC = () => {
  const [timeOfDay, setTimeOfDay] = useState<{ greeting: string, img: string }>({ greeting: '', img: '' });
  const [date, setDate] = useState('');
  const { setDialog } = useOverlay();
  const navigate = checkedNavigation(useNavigate());

  const updateDayState = () => {
    setDate(new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}));
    const d = new Date().getHours(); 
    const image = (img:string, fallbackImg?: string) => `linear-gradient(180deg,hsla(0, 0%, 0%, 0) 75%, hsl(0, 0%, 0%)), url(${img}), url(${fallbackImg})`;
    setTimeOfDay(d < 5
      ? { greeting: 'Sleep', img: image(night, nightFallback) }
      : d < 9
      ? { greeting: 'Good Morning', img: image(morning, morningFallback) }
      : d < 12
      ? { greeting: 'Good Day', img: image(midday, middayFallback) }
      : d < 17
      ? { greeting: 'Good Afternoon', img: image(afternoon, afternoonFallback) }
      : d < 23
      ? { greeting: 'Good Evening', img: image(evening, eveningFallback) }
      : { greeting: 'Good Night', img: image(night, nightFallback) } 
    );
  }

  const logoutMenu = () => setDialog({
    title: 'Logout?',
    content: '',
    actions: [
      {
        name: 'Yes',
        action: async () => {
          userAPI().logout();
          navigate(PageEnum.LOGIN);
        },
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
  background-size: cover;
  --shadow: drop-shadow(0 0 1px hsla(0, 0%, 0%, .75)) drop-shadow(0 1px 2px hsla(0, 0%, 0%, .5));
  box-sizing: border-box;
  grid-area: var(--day-area);
  height: var(--day-area-height);
  display: grid;
  padding: .5rem 1rem 1rem;
  place-content: end start;
  place-items: center start;
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