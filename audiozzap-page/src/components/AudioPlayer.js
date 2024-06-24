import React from 'react';
import PropTypes from 'prop-types';


const AudioPlayer = ({ src }) => {
  // Check if src is defined
  if (!src) {
    return <div>No audio source provided</div>;
  }

  return (
    <div>
      <audio controls>
        <source src={src} type="audio/mpeg" />
        <source src={src.endsWith('.mp3') ? src.replace('.mp3', '.ogg') : src} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
};

export default AudioPlayer;
