import React, { useState, useEffect } from 'react' ;
import Axios from 'axios';
import Audio from './Audio';
import styles from '../styles/AudioFeed.module.css'

function AudioFeed () {

    const [ audios, setAudios ] = useState([])


    async function getAudios () {
        try { 
            const result = await Axios.get('http://127.0.0.1:8080/').then(
             (response) => {
                 setAudios(response.data)
                 console.log(audios)
             }
            )
         } catch (err){
             console.log(err)
         }
    }

    useEffect(() => {
        getAudios()
    }, [])

    return (
        <div className={styles.feedContainer}>
            {audios.map((audio, key) => (
                <Audio
                    id={audio.id}
                    wppMessageId={audio.wpp_message_id}
                    duration={audio.duration}
                    language={audio.language}
                    createdAt={audio.created_at}
                    telegramMessageId={audio.telegram_message_id}
                    fileId={audio.file_id}
                    userTelegramId={audio.user_telegram_id}
                    downloadUrl={audio.download_url}
                    userWppId={audio.user_wpp_id}
                    fileSize={audio.file_size}
                    mimeType={audio.mime_type}
                    wppAudioData={audio.audio_data}
                />
            ))
            }
        </div>
    )
    
    
}

export default AudioFeed;