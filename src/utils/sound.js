export const playAsync = audioFile => {
  return new Promise(function(resolve, reject) {
    const audio = new Audio(audioFile);
    audio.onerror = reject;
    audio.onended = resolve;
    audio.play();
  });
};
