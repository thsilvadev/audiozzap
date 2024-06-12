import React from 'react';
import styles from '../styles/Audio.module.css'
import AudioPlayer from './AudioPlayer';

function Audio ({wppMessageId, duration, language, createdAt, telegramMessageId, fileId, userTelegramId, downloadUrl }) {



    return (
        <div>
            <div className={styles.audioContainer}>
                <AudioPlayer src={downloadUrl} onPlay={e => console.log("onPlay")}/>

            </div>
        </div>
    )
}

export default Audio
