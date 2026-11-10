import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatTime, songPlayPause } from '../../helpers/helpers.js';
import MyRefContext from '../../MyContext';
import { playNextSong, playPrevSong, setCurrentTime } from '../../redux/slices/playerSlice';
import cls from './player.module.scss';

const Player = () => {
  const [tempProgressValue, setTempProgressValue] = useState(null);
  const [volume, setVolume] = useState(0.25);
  const progress = useSelector((state) => state.playerState.progress);
  const isPlaying = useSelector((state) => state.playerState.isPlaying);
  const currentSong = useSelector((state) => state.playerState.currentSong);
  const songDuration = useSelector((state) => state.playerState.songDuration);
  const dispatch = useDispatch();
  const audioRef = useContext(MyRefContext);

  const displayedProgress = tempProgressValue ?? progress;
  const progressPercent =
    songDuration > 0 ? Math.min((displayedProgress / songDuration) * 100, 100) : 0;

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  const clickChangeVolume = () => {
    if (volume === 1) {
      setVolume(0);
    } else if (volume >= 0.5) {
      setVolume(1);
    } else {
      setVolume(0.5);
    }
  };

  const changeVolume = (e) => {
    setVolume(Number(e.currentTarget.value));
  };

  const playPrev = () => {
    dispatch(playPrevSong());
    setTempProgressValue(null);
  };

  const playNext = () => {
    dispatch(playNextSong());
    setTempProgressValue(null);
  };

  const changeTempProgressValue = (e) => {
    setTempProgressValue(Number(e.currentTarget.value));
  };

  const commitProgress = (e) => {
    if (!audioRef?.current) return;

    const value = Number(e.currentTarget.value);

    audioRef.current.currentTime = value;
    dispatch(setCurrentTime(value));
    setTempProgressValue(null);
  };

  return !currentSong ? null : (
    <div className={cls['player']}>
      {currentSong.name && currentSong.name.length < 18 ? (
        <section className={cls['player__widget']}>
          <img className={cls['player__img']} src={currentSong.img} alt="" height="111" />

          <h4 className={cls['player__song']}>{currentSong.name}</h4>

          <a href="#!" className={cls['player__artist']}>
            {currentSong.artist}
          </a>
        </section>
      ) : currentSong.name && currentSong.name.length >= 18 ? (
        <div className={cls['player__widget']}>
          <img className={cls['player__img']} src={currentSong.img} alt="" height="111" />

          <p className={`${cls['player__song']} side-blur`}>
            <span className="side-blur__item">{currentSong.name}</span>
            <span className="side-blur__item">{currentSong.name}</span>
          </p>

          <a href="#!" className={cls['player__artist']}>
            {currentSong.artist}
          </a>
        </div>
      ) : null}

      <div className={cls['player__controls_main']}>
        <div className={cls['player__btns']}>
          <div
            className={`player__btn ${cls['player__btn']}`}
            onClick={playPrev}
            role="button"
            tabIndex={0}
            aria-label="Предыдущий трек"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') playPrev();
            }}>
            <svg
              width="44"
              height="44"
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

          <div className={cls['player__wrapper-btn']}>
            <div
              className={`player__btn ${cls['player__btn_play-pause']}`}
              onClick={() => songPlayPause(dispatch, isPlaying, progress, songDuration, audioRef)}
              role="button"
              tabIndex={0}
              aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
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
                  fill="#fff"
                  fillOpacity="1.000000"
                  fillRule="evenodd"
                />
              </svg>

              <svg
                className={isPlaying ? 'player__btn_pause' : 'player__btn_hide'}
                width="30"
                height="25.980957"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000">
                <path
                  fill="#fff"
                  d="M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45h-65.68zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45h-65.68z"
                />
              </svg>
            </div>
          </div>

          <div
            className={`player__btn player__btn_next ${cls['player__btn']} ${cls['player__btn_next']}`}
            onClick={playNext}
            role="button"
            tabIndex={0}
            aria-label="Следующий трек"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') playNext();
            }}>
            <svg
              width="44"
              height="44"
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

        <div className={cls['player__trackbar']}>
          <span className="player__time">{formatTime(displayedProgress)}</span>

          <input
            type="range"
            min="0"
            max={Math.max(songDuration || 0, 1)}
            step="1"
            title="progressbar"
            aria-label="Прогресс воспроизведения"
            onPointerUp={commitProgress}
            onKeyUp={(e) => {
              if (e.key.startsWith('Arrow')) {
                commitProgress(e);
              }
            }}
            onChange={changeTempProgressValue}
            value={Math.min(displayedProgress, songDuration || 0)}
            className={`player__progressbar ${cls['player__progressbar']}`}
            style={{
              background: `linear-gradient(
                to right,
                #5EA694 ${progressPercent}%,
                #fff ${progressPercent}%
              )`,
            }}
          />

          <span className="player__time">{formatTime(songDuration)}</span>
        </div>
      </div>

      <div className={cls['player__icons']}>
        <div className={cls['player__controls']}>
          <div className={cls['player__volume']}>
            <span
              onClick={clickChangeVolume}
              className={`${cls['player__icon']} ${cls['player__icon_volume']}`}
              role="button"
              tabIndex={0}
              aria-label="Переключить громкость"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  clickChangeVolume();
                }
              }}>
              {volume >= 0.8 ? (
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink">
                  <path
                    className={cls['player__icon_fill']}
                    d="M16.67 0.16C18.7 1.77 20 4.24 20 7C20 9.75 18.7 12.22 16.67 13.83C16.35 14.09 15.88 14.04 15.61 13.72C15.35 13.41 15.4 12.95 15.72 12.69C17.42 11.34 18.5 9.3 18.5 7C18.5 4.7 17.42 2.65 15.72 1.3C15.4 1.04 15.35 0.58 15.61 0.27C15.87 -0.05 16.35 -0.1 16.67 0.16L16.67 0.16ZM9.4 0.23C9.76 0.39 10 0.74 10 1.12L10 12.87C10 13.25 9.76 13.6 9.4 13.76C9.04 13.92 8.62 13.85 8.33 13.6L4.11 9.93L2 9.93C0.89 9.93 0 9.05 0 7.97L0 6.02C0 4.94 0.89 4.06 2 4.06L4.11 4.06L8.33 0.39C8.62 0.14 9.04 0.08 9.4 0.23ZM14.78 2.44C16.13 3.52 17 5.16 17 7C17 8.83 16.13 10.48 14.78 11.55C14.46 11.81 13.99 11.76 13.72 11.45C13.46 11.13 13.51 10.67 13.83 10.41C14.85 9.6 15.5 8.37 15.5 7C15.5 5.62 14.85 4.39 13.83 3.58C13.51 3.32 13.46 2.86 13.72 2.54C13.98 2.23 14.46 2.18 14.78 2.44L14.78 2.44ZM12.89 4.72C13.56 5.26 14 6.08 14 7C14 7.92 13.56 8.74 12.89 9.27C12.57 9.53 12.1 9.48 11.83 9.17C11.57 8.85 11.62 8.39 11.94 8.13C12.28 7.86 12.5 7.45 12.5 7C12.5 6.54 12.28 6.13 11.94 5.86C11.62 5.6 11.57 5.14 11.83 4.82C12.09 4.51 12.57 4.46 12.89 4.71L12.89 4.72Z"
                    fill="#B4B4B4"
                    fillOpacity="1.000000"
                    fillRule="evenodd"
                  />
                </svg>
              ) : volume >= 0.5 ? (
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink">
                  <path
                    className={cls['player__icon_fill']}
                    d="M17 6.84C17 5.01 16.13 3.36 14.78 2.29L14.78 2.28C14.46 2.03 13.98 2.08 13.72 2.39C13.46 2.71 13.51 3.17 13.83 3.43C14.85 4.24 15.5 5.46 15.5 6.84C15.5 8.22 14.85 9.45 13.83 10.26C13.51 10.52 13.46 10.98 13.72 11.29C13.99 11.61 14.46 11.66 14.78 11.4C16.13 10.32 17 8.68 17 6.84ZM14 6.84C14 5.92 13.56 5.1 12.89 4.57L12.89 4.56C12.57 4.31 12.09 4.35 11.83 4.67C11.57 4.98 11.62 5.45 11.94 5.7C12.28 5.98 12.5 6.39 12.5 6.84C12.5 7.3 12.28 7.71 11.94 7.98C11.62 8.24 11.57 8.7 11.83 9.02C12.1 9.33 12.57 9.38 12.89 9.12C13.56 8.58 14 7.76 14 6.84ZM10 0.97C10 0.59 9.76 0.24 9.4 0.08C9.04 -0.08 8.62 -0.01 8.33 0.24L4.11 3.91L2 3.91C0.89 3.91 0 4.79 0 5.87L0 7.82C0 8.9 0.89 9.78 2 9.78L4.11 9.78L8.33 13.45C8.62 13.7 9.04 13.77 9.4 13.61C9.76 13.45 10 13.1 10 12.72L10 0.97Z"
                    fill="#B4B4B4"
                    fillOpacity="1.000000"
                    fillRule="evenodd"
                  />
                </svg>
              ) : volume > 0 ? (
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink">
                  <path
                    className={cls['player__icon_fill']}
                    d="M12.89 4.67C13.56 5.22 14 6.05 14 6.99C14 7.94 13.56 8.77 12.89 9.32C12.57 9.59 12.1 9.54 11.83 9.21C11.57 8.89 11.62 8.42 11.94 8.16C12.28 7.88 12.5 7.46 12.5 6.99C12.5 6.53 12.28 6.11 11.94 5.83C11.62 5.57 11.57 5.09 11.83 4.77C12.09 4.45 12.57 4.4 12.89 4.66L12.89 4.67ZM9.4 0.08C9.76 0.24 10 0.6 10 0.99L10 12.99C10 13.39 9.76 13.74 9.4 13.91C9.05 14.07 8.62 14 8.33 13.74L4.11 9.99L2 9.99C0.89 9.99 0 9.1 0 7.99L0 5.99C0 4.89 0.89 3.99 2 3.99L4.11 3.99L8.33 0.25C8.62 -0.01 9.05 -0.08 9.4 0.08Z"
                    fill="#B4B4B4"
                    fillOpacity="1.000000"
                    fillRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="14"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink">
                  <path
                    className={cls['player__icon_fill']}
                    d="M10 1.99C10 1.6 9.76 1.24 9.4 1.08C9.05 0.92 8.62 0.99 8.33 1.25L4.11 4.99L2 4.99C0.89 4.99 0 5.89 0 6.99L0 8.99C0 10.1 0.89 10.99 2 10.99L4.11 10.99L8.33 14.74C8.62 15 9.05 15.07 9.4 14.91C9.76 14.74 10 14.39 10 13.99L10 1.99Z"
                    fill="#B4B4B4"
                    fillOpacity="1.000000"
                    fillRule="evenodd"
                  />
                  <rect
                    className={cls['player__icon_fill']}
                    x="15.493164"
                    y="6.000000"
                    rx="0.494009"
                    width="0.988018"
                    height="4.940087"
                    transform="rotate(45.0003 15.493164 6.000000)"
                    fill="#B4B4B4"
                    fillOpacity="1.000000"
                  />
                  <rect
                    className={cls['player__icon_stroke']}
                    x="15.493164"
                    y="6.707092"
                    rx="0.005991"
                    width="0.011982"
                    height="3.940087"
                    transform="rotate(45.0003 15.493164 6.707092)"
                    stroke="#B4B4B4"
                    strokeOpacity="1.000000"
                    strokeWidth="1.000000"
                  />
                  <rect
                    className={cls['player__icon_fill']}
                    x="12.000000"
                    y="6.698792"
                    rx="0.494009"
                    width="0.988018"
                    height="4.940087"
                    transform="rotate(-45.0003 12.000000 6.698792)"
                    fill="#B4B4B4"
                    fillOpacity="1.000000"
                  />
                  <rect
                    className={cls['player__icon_stroke']}
                    x="12.707031"
                    y="6.698792"
                    rx="0.005991"
                    width="0.011982"
                    height="3.940087"
                    transform="rotate(-45.0003 12.707031 6.698792)"
                    stroke="#B4B4B4"
                    strokeOpacity="1.000000"
                    strokeWidth="1.000000"
                  />
                </svg>
              )}
            </span>

            <input
              max="1"
              min="0"
              step="0.05"
              type="range"
              value={volume}
              onChange={changeVolume}
              className={`player__progressbar ${cls['player__volume-range']}`}
              style={{
                background: `linear-gradient(
                  to right,
                  #5EA694 ${volume * 100}%,
                  #fff ${volume * 100}%
                )`,
              }}
            />
          </div>

          <p className={cls['player__mode']}>
            <span className={cls['player__icon']}>
              <svg
                width="31.000000"
                height="19.422852"
                viewBox="0 0 31 19.4229"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
                <path
                  className={cls['player__icon_stroke']}
                  d="M10.5 15.73L2.5 15.73C1.39 15.73 0.5 14.83 0.5 13.73L0.5 2.5C0.5 1.39 1.39 0.5 2.5 0.5C12.34 0.5 18.65 0.5 28.5 0.5C29.6 0.5 30.5 1.39 30.5 2.5L30.5 13.73C30.5 14.83 29.6 15.73 28.5 15.73L13.31 15.73M18.5 12L13.31 15.73L18.5 19"
                  stroke="#B4B4B4"
                  strokeOpacity="1.000000"
                  strokeWidth="1.000000"
                />
              </svg>
            </span>

            <span className={cls['player__icon']}>
              <svg
                width="34.795105"
                height="20.777344"
                viewBox="0 0 34.7951 20.7773"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
                <path
                  className={cls['player__icon_stroke']}
                  d="M0 4.13L6.18 4.13L11.35 4.13C11.99 4.13 12.58 4.43 12.96 4.94L21.03 15.83C21.41 16.33 22 16.63 22.64 16.63L27.81 16.63L34 16.63M0 16.63L6.18 16.63L11.35 16.63C11.99 16.63 12.58 16.33 12.96 15.83L21.03 4.94C21.41 4.43 22 4.13 22.64 4.13L27.81 4.13L34 4.13M29.36 7.88L34 4.13L29.36 0.38M29.36 20.38L34 16.63L29.36 12.88"
                  stroke="#B4B4B4"
                  strokeOpacity="1.000000"
                  strokeWidth="1.000000"
                />
              </svg>
            </span>
          </p>
        </div>

        <span className={cls['player__icon']}>
          <svg
            width="25.000000"
            height="24.000000"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect
              className={cls['player__icon_fill']}
              y="21.000000"
              width="25.000000"
              height="3.000000"
              fill="#D9D9D9"
              fillOpacity="1.000000"
            />
            <rect
              className={cls['player__icon_fill']}
              y="13.000000"
              width="25.000000"
              height="3.000000"
              fill="#D9D9D9"
              fillOpacity="1.000000"
            />
            <rect
              className={cls['player__icon_stroke']}
              x="0.500000"
              y="0.500000"
              rx="3.000000"
              width="24.000000"
              height="6.000000"
              stroke="#D9D9D9"
              strokeOpacity="1.000000"
              strokeWidth="1.000000"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Player;
