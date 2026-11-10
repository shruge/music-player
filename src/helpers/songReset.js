import { setCurrentTime } from '../redux/slices/playerSlice';

export const songReset = (audioRef, dispatch) => {
  const audio = audioRef?.current;

  if (!audio) return;

  audio.currentTime = 0;
  dispatch(setCurrentTime(0));
};
