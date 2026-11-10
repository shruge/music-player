import { pause, play, setCurrentTime } from '../redux/slices/playerSlice';

export const songPlayPause = (dispatch, isPlaying, progress, songDuration, audioRef) => {
  const audio = audioRef?.current;

  if (!audio) return;

  if (isPlaying) {
    dispatch(pause());
    return;
  }

  if (songDuration > 0 && progress >= songDuration) {
    audio.currentTime = 0;
    dispatch(setCurrentTime(0));
  }

  dispatch(play());
};
