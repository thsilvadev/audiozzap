import React, {useState, useEffect  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import styles from "../styles/AudioPage.module.css"
import Audio from "../components/Audio";

const AudioPage = () => {
    const [ audio, setAudio ] = useState([])
    // Real audio object from the array
    const realAudio = audio.length > 0 ? audio[0] : null;

    const { id } = useParams();  

    async function getAudio () {
        try { 
            const result = await Axios.get(`${window.name}/audio/${id}`).then(
             (response) => {
                console.log(response.data)
                 setAudio(response.data)
             }
            )
         } catch (err){
             console.log(err)
         }
    }

    useEffect(() => {
        getAudio()
    }, [])

    useEffect(() => {
        console.log('audio:', audio);
    }, [audio]);

    return (
        <div className={styles.feedContainer}>
                {realAudio && (
                <Audio
                    id={realAudio.id}
                    wppMessageId={realAudio.wpp_message_id}
                    duration={realAudio.duration}
                    language={realAudio.language}
                    createdAt={realAudio.created_at}
                    telegramMessageId={realAudio.telegram_message_id}
                    fileId={realAudio.file_id}
                    userTelegramId={realAudio.user_telegram_id}
                    downloadUrl={realAudio.download_url}
                    userWppId={realAudio.user_wpp_id}
                    fileSize={realAudio.file_size}
                    mimeType={realAudio.mime_type}
                    wppAudioData={realAudio.audio_data}
                />
            )}
        </div>
    )
    
    
}

export default AudioPage;