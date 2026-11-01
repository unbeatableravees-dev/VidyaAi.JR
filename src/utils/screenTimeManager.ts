// Screen Time Manager for VidyaAI Jr
const getTodayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export interface ScreenTimeConfig {
  dailyLimitMinutes: number; // 0 = unlimited, or 15, 30, 45, 60, 90
  usedMinutesToday: number;
  bonusMinutesToday: number;
  isLocked: boolean;
}

export const getScreenTimeConfig = (): ScreenTimeConfig => {
  const today = getTodayKey();
  const limitStr = localStorage.getItem('vidya_screentime_limit_mins');
  const dailyLimitMinutes = limitStr ? parseInt(limitStr, 10) : 0; // 0 = unlimited by default

  const usedSeconds = parseInt(localStorage.getItem(`vidya_screentime_used_${today}`) || '0', 10);
  const usedMinutesToday = Math.floor(usedSeconds / 60);

  const bonusMinutesToday = parseInt(localStorage.getItem(`vidya_screentime_bonus_${today}`) || '0', 10);

  const isLocked = dailyLimitMinutes > 0 && usedMinutesToday >= dailyLimitMinutes + bonusMinutesToday;

  return {
    dailyLimitMinutes,
    usedMinutesToday,
    bonusMinutesToday,
    isLocked,
  };
};

export const setScreenTimeLimit = (minutes: number) => {
  localStorage.setItem('vidya_screentime_limit_mins', String(minutes));
  window.dispatchEvent(new CustomEvent('screentimechange'));
};

export const recordScreenTimeTick = (secondsToAdd = 10): ScreenTimeConfig => {
  const today = getTodayKey();
  const key = `vidya_screentime_used_${today}`;
  const current = parseInt(localStorage.getItem(key) || '0', 10);
  const next = current + secondsToAdd;
  localStorage.setItem(key, String(next));

  const cfg = getScreenTimeConfig();
  if (cfg.isLocked) {
    window.dispatchEvent(new CustomEvent('screentimechange'));
  }
  return cfg;
};

export const addScreenTimeBonus = (minutes: number) => {
  const today = getTodayKey();
  const key = `vidya_screentime_bonus_${today}`;
  const current = parseInt(localStorage.getItem(key) || '0', 10);
  localStorage.setItem(key, String(current + minutes));
  window.dispatchEvent(new CustomEvent('screentimechange'));
};

export const unlockScreenTimeForToday = () => {
  addScreenTimeBonus(999);
};
