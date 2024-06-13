import React from "react";
import styles from "../styles/Audio.module.css";
import AudioPlayer from "./AudioPlayer";

function Audio({
  wppMessageId,
  duration,
  language,
  createdAt,
  telegramMessageId,
  fileId,
  userTelegramId,
  downloadUrl,
  userWppId,
  fileSize,
  mimeType,
  wppAudioData,
}) {
  if (telegramMessageId) {
    return (
      <div>
        <div className={styles.audioContainer}>
          <AudioPlayer
            src={downloadUrl}
            onPlay={(e) => console.log("onPlay")}
          />
        </div>
      </div>
    );
  } else if (wppAudioData) {
    // Decode Base64 string to binary data
    function base64ToArrayBuffer(wppAudioData) {
      const binaryString = window.atob(wppAudioData);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    }

    // Convert Base64 to OGG Blob
    function base64ToOggBlob(wppAudioData) {
      const arrayBuffer = base64ToArrayBuffer(wppAudioData);
      return new Blob([arrayBuffer], { type: "audio/ogg" });
    }

    // Create an Object URL for the OGG Blob
    function createOggURL(wppAudioData) {
      const oggBlob = base64ToOggBlob(wppAudioData);
      return URL.createObjectURL(oggBlob);
    }

    const oggUrl = createOggURL(wppAudioData);

    return (
      <div>
        <div className={styles.audioContainer}>
          <AudioPlayer
            src={oggUrl}
            onPlay={(e) => console.log("onPlay")}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>File Missing</p>
      </div>
    );
  }
}

export default Audio;
