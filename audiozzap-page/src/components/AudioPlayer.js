import React from "react";
import PropTypes from "prop-types";
import H5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import styles from '../styles/AudioPlayer.module.css'

const AudioPlayer = ({ src }) => {
  // Check if src is defined
  if (!src) {
    return <div>No audio source provided</div>;
  }

  return (
    <div className={styles.playerContainer}>
      <H5AudioPlayer
        src={src}
        onPlay={(e) => console.log("onPlay")}

        // other props here
      />
    </div>
  );
};

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
};

export default AudioPlayer;
