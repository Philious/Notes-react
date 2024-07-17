import '@/components/dayInfo.scss';
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
  
    setTimeOfDay(d < 5
      ? { greeting: 'Sleep', img: night }
      : d < 9
      ? { greeting: 'Good Morning', img: morning }
      : d < 12
      ? { greeting: 'Good Day', img: midday }
      : d < 17
      ? { greeting: 'Good Afternoon', img: afternoon }
      : d < 23
      ? { greeting: 'Good Evening', img: evening }
      : { greeting: 'Good Night', img: night } 
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
    const timeout = setInterval(() => updateDayState(), 1000 * 60 * 60)

    return () => {
      clearTimeout(timeout)
    };
  }, []);

  return (
    <div className="day" style={{ backgroundImage: `linear-gradient(180deg,hsla(0, 0%, 0%, 0) 75%, hsl(0, 0%, 0%)), url(${timeOfDay.img})` }}>
    <div className="text">
      { timeOfDay.greeting }
    </div>
    <div className="text date">
      { date }
    </div>
      <IconButton
         type={ButtonEnum.Default}
         icon={IconEnum.LogOut}
         action={logoutMenu}
      />
  </div>
  )
}