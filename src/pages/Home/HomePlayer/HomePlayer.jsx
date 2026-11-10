import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatTime, songPlayPause } from '../../../helpers/helpers';
import MyRefContext from '../../../MyContext';
import { playNextSong, playPrevSong, setCurrentTime } from '../../../redux/slices/playerSlice';
import cls from './homePlayer.module.scss';

const HomePlayer = () => {
  const [tempProgressValue, setTempProgressValue] = useState(null);
  const songDuration = useSelector((state) => state.playerState.songDuration);
  const currentSong = useSelector((state) => state.playerState.currentSong);
  const isPlaying = useSelector((state) => state.playerState.isPlaying);
  const progress = useSelector((state) => state.playerState.progress);
  const dispatch = useDispatch();
  const audioRef = useContext(MyRefContext);

  const displayedProgress = tempProgressValue ?? progress;
  const progressPercent =
    songDuration > 0 ? Math.min((displayedProgress / songDuration) * 100, 100) : 0;

  const onPointerUpHandler = () => {
    if (!audioRef?.current || tempProgressValue === null) return;

    audioRef.current.currentTime = tempProgressValue;
    dispatch(setCurrentTime(tempProgressValue));
    setTempProgressValue(null);
  };

  const changeTempProgressValue = (e) => {
    setTempProgressValue(Number(e.currentTarget.value));
  };

  const playPrev = () => {
    dispatch(playPrevSong());
    setTempProgressValue(null);
  };

  const playNext = () => {
    dispatch(playNextSong());
    setTempProgressValue(null);
  };

  return !currentSong ? null : (
    <section className={cls['home-player']}>
      <h2 className="title">Now playing: {currentSong.name}</h2>
      <div className={cls['home-player__content']}>
        <div className={cls['home-player__imgs']}>
          <img
            className={`${cls['home-player__img']} ${cls['home-player__img_blur']}`}
            src={currentSong.img}
            alt={currentSong.album || currentSong.name}
          />
          <img
            className={cls['home-player__img']}
            src={currentSong.img}
            alt={currentSong.album || currentSong.name}
          />
        </div>
        <div className={cls['home-player__controls']}>
          <div
            className="player__btn"
            onClick={playPrev}
            role="button"
            tabIndex={0}
            aria-label="Предыдущий трек"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                playPrev();
              }
            }}>
            <svg
              width="59.000000"
              height="54.000000"
              viewBox="0 0 59 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <path
                d="M11 30.46L39.5 46.91C42.16 48.45 45.5 46.53 45.5 43.45L45.5 10.54C45.5 7.46 42.16 5.54 39.5 7.08L11 23.53C8.33 25.07 8.33 28.92 11 30.46Z"
                fill="#D9D9D9"
                fillOpacity="1.000000"
                fillRule="evenodd"
              />
              <rect width="5.000000" height="54.000000" fill="#D9D9D9" fillOpacity="1.000000" />
            </svg>
          </div>
          <div
            className={`player__btn ${cls['home-player__btn_play-pause']}`}
            onClick={() => songPlayPause(dispatch, isPlaying, progress, songDuration, audioRef)}
            role="button"
            tabIndex={0}
            aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();

                songPlayPause(dispatch, isPlaying, progress, songDuration, audioRef);
              }
            }}>
            <svg
              className={isPlaying ? 'player__btn_hide' : 'player__btn_play'}
              width="22.500000"
              height="25.980957"
              viewBox="0 0 22.5 25.981"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <path
                d="M22.5 12.99L0 0L0 25.98L22.5 12.99Z"
                fill="#5EA694"
                fillOpacity="1.000000"
                fillRule="evenodd"
              />
            </svg>
            <svg
              className={isPlaying ? 'player__btn_pause_ml' : 'player__btn_hide'}
              width="30"
              height="25.980957"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000">
              <path
                fill="#5EA694"
                d="M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45h-65.68zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45h-65.68z"
              />
            </svg>
          </div>
          <div
            className="player__btn_next player__btn"
            onClick={playNext}
            role="button"
            tabIndex={0}
            aria-label="Следующий трек"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                playNext();
              }
            }}>
            <svg
              width="59.000000"
              height="54.000000"
              viewBox="0 0 59 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <path
                d="M11 30.46L39.5 46.91C42.16 48.45 45.5 46.53 45.5 43.45L45.5 10.54C45.5 7.46 42.16 5.54 39.5 7.08L11 23.53C8.33 25.07 8.33 28.92 11 30.46Z"
                fill="#D9D9D9"
                fillOpacity="1.000000"
                fillRule="evenodd"
              />
              <rect width="5.000000" height="54.000000" fill="#D9D9D9" fillOpacity="1.000000" />
            </svg>
          </div>
        </div>
        <div className={cls['home-player__trackbar']}>
          <span className="player__time">{formatTime(displayedProgress)}</span>
          <input
            type="range"
            min="0"
            max={Math.max(songDuration, 1)}
            step="1"
            title="progressbar"
            aria-label="Прогресс воспроизведения"
            onPointerUp={onPointerUpHandler}
            onChange={changeTempProgressValue}
            className="player__progressbar player__progressbar_s"
            value={Math.min(displayedProgress, songDuration || 0)}
            style={{
              background: `linear-gradient(
                to right,
                #5EA694 ${progressPercent}%,
                #fff ${Math.min(progressPercent + 0.3, 100)}%
              )`,
            }}
          />
          <span className="player__time">{formatTime(songDuration)}</span>
        </div>
      </div>
    </section>
  );
};

export default HomePlayer;
