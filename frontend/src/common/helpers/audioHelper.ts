export const playByUrl = (url: string) => {
  const audioElement = new Audio(url);
  audioElement.addEventListener('loadeddata', () => {
    audioElement.volume = 0.1;
    audioElement.play();
  });
};
