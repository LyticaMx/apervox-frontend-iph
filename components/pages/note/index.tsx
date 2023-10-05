import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { IonButton, IonCard, IonCardSubtitle, IonCheckbox, IonContent, IonFooter, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useNotifications } from '@/context/Notifications';
import { navigate, time, informationCircleOutline } from 'ionicons/icons';
import AudioCard from './AudioCard';
import { VoiceRecorder } from 'capacitor-voice-recorder';
import { Directory, Filesystem } from '@capacitor/filesystem';

const path = 'notas'
const Note = () => {
  const { notification, actions } = useNotifications()
  const history = useHistory()
  const [files, setFiles] = useState([])
  const [isRecording, setIsRecording] = useState(false)
  const [filePlaying, setFilePlaying] = useState<{name: string; audio: HTMLAudioElement } | undefined>()

  useEffect(() => { actions.getData() }, [])

  const handleRecording = () => {
    if(isRecording) stop()
    else start()
  }
  const start = () => {
    if(isRecording) return 

    setIsRecording(true)
    VoiceRecorder.startRecording()
  }
  const stop = async () => {
    if(!isRecording) return 
    
    setIsRecording(false)
    const { value } = await VoiceRecorder.stopRecording()

    if(value){
      const fileName = new Date().getTime() + '.wav'

      try {
        await Filesystem.writeFile({
          path: `${path}/${fileName}`,
          directory: Directory.Data,
          data: value.recordDataBase64,
          recursive: true
        })
  
        loadFiles()
      } catch (error) {
        console.log("🚀 ~ error:", error)
        
      }
    }
  }

  const play = async (file) => {
    if(filePlaying && filePlaying.audio)
    {
      filePlaying.audio.pause()
      setFilePlaying(undefined)

      if(file.name === filePlaying.name) return
    }

    try {
      const res = await Filesystem.readFile({
        path: `${path}/${file.name}`, 
        directory: Directory.Data
      })
  
      const audio = new Audio(`data:audio/aac;base64,${res.data}`)
  
      setFilePlaying({
        name: file.name,
        audio
      })
      audio.oncanplaythrough = () => audio.play()
      audio.onended = () => setFilePlaying(undefined)
      audio.load()
    } catch (error) {
      console.log("🚀 ~ file: Audios.tsx:102 ~ play ~ error:", error)
      
    }
  }

  const loadFiles = async () => { 
    try {
      const res = await Filesystem.readdir({
        path, 
        directory: Directory.Data
      })
      
      setFiles(res.files)
    } catch (error) {
      console.log("🚀 ~ file: Audios.tsx:125 ~ loadFiles ~ error:", error)
      setFiles([])
    }
  }

  const removeFile = async (file) => {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: `${path}/${file.name}`
    })

    loadFiles()
  }

  useEffect(() => {
    loadFiles()

    VoiceRecorder.requestAudioRecordingPermission()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nota rápida</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className='flex flex-col h-full'>
          <section className='flex flex-col gap-3 h-full'>
            <div className="flex items-center text-sm gap-2">
              <IonIcon className='w-5 h-5' icon={informationCircleOutline} />
              <span>{notification?.title}</span>
            </div>
            <p>
              {notification?.description}
            </p>
            <div className="flex items-center text-sm gap-2">
              <IonIcon className='w-5 h-5' icon={time} />
              <span>Se reportó a las <strong> 9:12 p.m.</strong></span>
            </div>
            <div className="flex items-center text-sm gap-2">
              <IonIcon className='w-5 h-5' icon={navigate} />
              <span>Av. 1era. de Mayo y Tlalpan</span>
            </div>
            <div className='grow m-0 p-3 bg-opacity-25 bg-gray-500 rounded-md'>
              <IonCardSubtitle className='mb-2'>Audios</IonCardSubtitle>
              <IonList className='!p-0'>
                {files.map((item, index) => (
                  <AudioCard name={item.name} onDelete={() => removeFile(item)} key={index}/>
                ))}
              </IonList>
            </div>
            <div className='mt-auto flex flex-col gap-2'>
              <IonCheckbox>Solicitar refuerzos</IonCheckbox>
              <IonCheckbox>Uso de fuerza</IonCheckbox>
              <div className='flex justify-center'>
                <IonButton onClick={handleRecording}>
                  <IonIcon name={isRecording ? "stop-outline" : "mic-outline"} aria-hidden="true"></IonIcon>
                </IonButton>
              </div>
            </div>
          </section>
        </div>
      </IonContent>
      <IonFooter className='ion-padding pt-0'>
        <IonButton expand="block" onClick={() => history.push('case')}>Creación de folio</IonButton>
      </IonFooter>
    </IonPage>
  );
}
export default Note;