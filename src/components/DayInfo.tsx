import '@/components/dayInfo.scss';
import { Icon, ButtonType } from "@/types/enums"
import { useEffect, useState } from "react";
import night from '@/assets/images/night.png';
import morning from '@/assets/images/morning.png';
import midday from '@/assets/images/midday.png';
import afternoon from '@/assets/images/afternoon.png';
import evening from '@/assets/images/evening.png';
import IconButton from "@/components/IconButton";

import { useLoginState, useOverlay } from '@/hooks/providerHooks';

export function DayInfo() {
  const [timeOfDay, setTimeOfDay] = useState<{ greeting: string, img: string }>({ greeting: '', img: '' });
  const [date, setDate] = useState('');
  const { logout } = useLoginState();

  const { setDialog } = useOverlay();

  const getState = () => {
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
        action: logout,
      },
      {
        name: 'No',
        action: () => {},
      },
    ]
});

  const IBProps = {
    type: ButtonType.Default, icon: Icon.LogOut, action: logoutMenu
  }

  useEffect(() => {
    getState();
    const timeout = setTimeout(() => getState(), 1000 * 60 * 60)

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
        { ...IBProps }
      />
  </div>
  )
}