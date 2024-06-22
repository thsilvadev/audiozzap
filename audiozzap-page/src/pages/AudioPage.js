import React, {useState, useEffect  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import styles from "../styles/AudioPage.module.css"
import Audio from "../components/Audio";

const AudioPage = () => {
    const [ audio, setAudio ] = useState([])

    const { id } = useParams();  

    async function getAudio () {
        try { 
            const result = await Axios.get(`${window.name}/${id}`).then(
             (response) => {
                 setAudio(response.data)
                 console.log(audio)
             }
            )
         } catch (err){
             console.log(err)
         }
    }

    useEffect(() => {
        getAudio()
    }, [])

    return (
        <div className={styles.feedContainer}>
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
        </div>
    )
    
    
}

export default AudioPage