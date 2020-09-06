import React from 'react';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.sass';

interface IProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<IProps> = ({ audioUrl }) => {
  const player = new Audio(audioUrl);

  const playSound = () => {
    player.volume = 0.25;
    player.play();
  };

  return (
    <button type="button" className={styles.playButton} onClick={playSound}>
      <FontAwesomeIcon icon={faPlay} />
    </button>
  );
};

export default AudioPlayer;
