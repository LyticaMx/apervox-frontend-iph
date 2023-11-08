import TabButton from "@/components/misc/TabButton";
import { useRecordWebcam } from "@/utils/VideoRecorder/useRecordWebcam";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { IonButton, IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { IconBrandZoom, IconPlayerStop } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

export interface RecorderConfig {
    path: string
}
export interface ButtonProps {
  hideLabel?: boolean
  className?: {
    base?: string
    recording?: string
  }
}
export const useVideoRecord = ({ path }: RecorderConfig) => {
  const [files, setFiles] = useState([])
  const [recording, setRecording] = useState<any>()
  const [isRecording, setIsRecording] = useState(false)
  const [filePlaying, setFilePlaying] = useState<{name: string; audio: HTMLAudioElement } | undefined>()

  const {
    devicesByType,
    devicesById,
    createRecording,
    openCamera,
    closeCamera,
    startRecording,
    stopRecording,
    clearAllRecordings,
  } = useRecordWebcam()

  const handleRecording = () => {
    if(isRecording) stop()
    else start()
  }
  const start = async () => {
    console.log("🚀 ~ START", {devicesById, devicesByType})
    if(isRecording) return 

    // try {
    //   const newrecording = await createRecording();
    //   if (!newrecording) return;

    //   setIsRecording(true)
    //   setRecording(newrecording)
      
    //   await openCamera(newrecording.id);
    //   await startRecording(newrecording.id);
      
    // } catch (error) {
    //   console.error({ error });
    // }
  }

  const stop = async () => {
    if(!isRecording) return 

    // const res = await stopRecording(recording.id);

    // if(res.objectBase64) {
    //     try {
    //       const fileName = new Date().getTime() + '.mp4'

    //       await Filesystem.writeFile({
    //         path: `${path}/${fileName}`,
    //         directory: Directory.Data,
    //         data: res.objectBase64,
    //         recursive: true
    //       })
    
    //       loadFiles()
    //     } catch (error) {
    //       console.log("🚀 ~ error:", error)
          
    //     }
    // }

    // await closeCamera(recording.id);
    // setIsRecording(false)
    // setRecording(null)
    // clearAllRecordings()
  }

  const play = async () => {
    // if(filePlaying && filePlaying.audio)
    // {
    //   filePlaying.audio.pause()
    //   setFilePlaying(undefined)

    //   if(file.name === filePlaying.name) return
    // }
    const file = files[0]
    
    try {
      // const res = await Filesystem.readFile({
      //   path: `${path}/${file.name}`, 
      //   directory: Directory.Data
      // })
  
      // const url = `data:video/mp4;base64,${res.data}`
  
      // if(Capacitor.isNativePlatform){

      //   const video = await CapacitorVideoPlayer.initPlayer({
      //     mode: 'fullscreen',
      //     url,
      //     playerId: 'fullscreen',
      //     componentTag: 'IonContent'
      //   })
      //   console.log("🚀 ~ file: useVideoRecord.tsx:113 ~ play ~ video:", video)
      // }

      // setFilePlaying({
      //   name: file.name,
      //   audio
      // })
      // audio.oncanplaythrough = () => audio.play()
      // audio.onended = () => setFilePlaying(undefined)
      // audio.load()
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
  }, [])

  const RecordButton = useCallback((props: ButtonProps) => {
    if(isRecording )
      return (<TabButton className={props.className?.recording} label={props.hideLabel ? undefined : "Parar" } onClick={handleRecording} icon={<IconPlayerStop className='w-5 h-5' />} />)

    return (<TabButton className={props.className?.base} label={props.hideLabel ? undefined : "Grabar" } onClick={handleRecording} icon={<IconBrandZoom className='w-5 h-5' />} />)
  }, [isRecording])
  
  const RecordModal = useCallback((props: ButtonProps) => {
    return <IonModal isOpen={isRecording} onDidDismiss={handleRecording}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Grabando video</IonTitle>
          <IonButton slot="end" fill="clear" color="dark" onClick={handleRecording}>
            <IonIcon name="close" />
          </IonButton>
        </IonToolbar>
      </IonHeader>)
      <IonContent fullscreen>
        <div className="">
          <video autoPlay playsInline muted ref={recording?.webcamRef} className="absolute inset-0 w-full h-full"/>
          <RecordButton />
        </div>
      </IonContent>
    </IonModal>
  }, [isRecording])

  return {
    files,
    isRecording,
    record: handleRecording,
    play,
    removeFile,
    RecordButton,
    RecordModal
  }
}