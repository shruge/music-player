import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import heartAudio from './assets/songs/audio/Heart Ni Hi Wo Tsukete.mp3';
import tabletAudio from './assets/songs/audio/Tooboe-Tablet.ogg';
import pyrokinesisAudio from './assets/songs/audio/В городе где гаснут фонари.mp3';
import heartImage from './assets/songs/imgs/9mm_parabellum_bullet_Dawning.jpeg';
import pyrokinesisImage from './assets/songs/imgs/pyrokinesis_my_beautiful_emptiness.png';
import tabletImage from './assets/songs/imgs/Tooboe_tablet.jpg';
import Player from './components/Player/Player';
import MyRefContext from './MyContext';
import Home from './pages/Home/Home';
import {
  initState,
  pause,
  playNextSong,
  setCurrentDuration,
  setCurrentTime,
} from './redux/slices/playerSlice';
import './styles/App.scss';

const songs = [
  {
    id: 0,
    album: 'Dawning',
    name: 'Heart Ni Hi Wo Tsukete',
    artist: '9mm parabellum bullet',
    audio: heartAudio,
    img: heartImage,
  },
  {
    id: 1,
    album: 'Моя милая пустота',
    name: 'В городе где гаснут фонари',
    artist: 'pyrokinesis',
    audio: pyrokinesisAudio,
    img: pyrokinesisImage,
  },
  {
    id: 2,
    name: 'Tablet',
    artist: 'Tooboe',
    album: 'Tablet',
    audio: tabletAudio,
    img: tabletImage,
  },
];

const App = () => {
  const isPlaying = useSelector((state) => state.playerState.isPlaying);
  const currentSong = useSelector((state) => state.playerState.currentSong);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  useEffect(() => {
    dispatch(
      initState({
        allSongs: songs,
        currentSong: songs[0],
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    const track = audioRef.current;

    if (!track) return;

    const handleTimeUpdate = () => {
      dispatch(setCurrentTime(Math.floor(track.currentTime)));
    };

    const handleLoadedMetadata = () => {
      if (Number.isFinite(track.duration)) {
        dispatch(setCurrentDuration(Math.floor(track.duration)));
      }
    };

    const handleEnded = () => {
      dispatch(playNextSong());
    };

    track.addEventListener('timeupdate', handleTimeUpdate);
    track.addEventListener('loadedmetadata', handleLoadedMetadata);
    track.addEventListener('ended', handleEnded);

    return () => {
      track.removeEventListener('timeupdate', handleTimeUpdate);
      track.removeEventListener('loadedmetadata', handleLoadedMetadata);
      track.removeEventListener('ended', handleEnded);
    };
  }, [dispatch]);

  useEffect(() => {
    const track = audioRef.current;

    if (!track) return;

    if (!isPlaying) {
      track.pause();
      return;
    }

    const playAudio = async () => {
      try {
        track.play();
      } catch (err) {
        console.error(err);
        dispatch(pause());
      }
    };

    playAudio();

    return () => {
      track.pause();
    };
  }, [isPlaying, currentSong?.audio, dispatch]);

  return (
    <>
      <MyRefContext.Provider value={audioRef}>
        <Home />
        <Player />
      </MyRefContext.Provider>
      <audio ref={audioRef} src={currentSong?.audio} preload="metadata" />
    </>
  );
};

export default App;
