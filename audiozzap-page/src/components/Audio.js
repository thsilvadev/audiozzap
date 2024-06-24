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
  console.log("audio data: ", wppAudioData);

  //if audio origin is Telegram, we`ll be downloading from downloadUrl src.
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

    //If not, we`ll encode it right here in frontend.
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

    // Convert Base64 to WAV Blob
    function base64ToWavBlob(wppAudioData) {
      const arrayBuffer = base64ToArrayBuffer(wppAudioData);
      return new Blob([arrayBuffer], { type: "audio/wav" });
    }

    // Create an Object URL for the WAV Blob
    function createWavURL(wppAudioData) {
      const wavBlob = base64ToWavBlob(wppAudioData);
      return URL.createObjectURL(wavBlob);
    }

    const wavUrl = createWavURL(wppAudioData);
    console.log(wavUrl);

    return (
      <div>
        <div className={styles.audioContainer}>
          <AudioPlayer src={wavUrl} onPlay={(e) => console.log("onPlay")} />
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
