import React from "react";
import PropTypes from "prop-types";
import H5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import styles from '../styles/AudioPlayer.module.css'
import Axios from  'axios';

const AudioPlayer = ({ src }) => {
  // Check if src is defined
  if (!src) {
    return <div>No audio source provided</div>;
  }

  const handlePlay = () => {
    Axios.post('https://api.audiozzap.com/log', {message: "audio played"});
  };

  const handleError = (e) => {
    Axios.post('https://api.audiozzap.com/log', {error: e});
  };

  return (
    <div className={styles.playerContainer}>
      <H5AudioPlayer
      preload="auto"
        src={src}
        onPlay={handlePlay}
        onError={handleError}

        // other props here
      />
    </div>
  );
};

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
};

export default AudioPlayer;
