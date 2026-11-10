import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  progress: 0,
  allSongs: [],
  songDuration: 0,
  isPlaying: false,
  currentSong: null,
};

const playerSlice = createSlice({
  name: 'playerState',
  initialState,

  reducers: {
    initState: (state, action) => {
      state.progress = 0;
      state.songDuration = 0;
      state.isPlaying = false;
      state.allSongs = action.payload.allSongs;
      state.currentSong = action.payload.currentSong;
    },

    playPrevSong: (state) => {
      if (!state.allSongs.length || !state.currentSong) return;

      const currentIndex = state.allSongs.findIndex((song) => song.id === state.currentSong.id);

      if (currentIndex === -1) return;

      const prevIndex = (currentIndex - 1 + state.allSongs.length) % state.allSongs.length;

      state.currentSong = state.allSongs[prevIndex];
      state.progress = 0;
      state.songDuration = 0;
    },

    playNextSong: (state) => {
      if (!state.allSongs.length || !state.currentSong) return;

      const currentIndex = state.allSongs.findIndex((song) => song.id === state.currentSong.id);

      if (currentIndex === -1) return;

      const nextIndex = (currentIndex + 1) % state.allSongs.length;

      state.currentSong = state.allSongs[nextIndex];
      state.progress = 0;
      state.songDuration = 0;
    },

    play: (state) => {
      state.isPlaying = true;
    },

    pause: (state) => {
      state.isPlaying = false;
    },

    setCurrentTime: (state, action) => {
      state.progress = action.payload;
    },

    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.progress = 0;
      state.songDuration = 0;
    },

    setCurrentDuration: (state, action) => {
      state.songDuration = action.payload;
    },
  },
});

export const {
  play,
  pause,
  initState,
  playPrevSong,
  playNextSong,
  setCurrentTime,
  setCurrentSong,
  setCurrentDuration,
} = playerSlice.actions;

export default playerSlice.reducer;
