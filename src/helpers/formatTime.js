export const formatTime = (seconds) => {
  const duration = Number.isFinite(seconds) ? Math.floor(seconds) : 0;
  const minutes = Math.floor(duration / 60);
  const sec = duration % 60;

  return `${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};
