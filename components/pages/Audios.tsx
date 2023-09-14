import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { MicrophoneIcon, PauseIcon, PhotoIcon, PlayIcon, StopIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { VoiceRecorder } from "capacitor-voice-recorder";
import { Camera, CameraResultType } from '@capacitor/camera';

const AudioComponent = ({ play, removeFile, filePlaying, file }) => (
  <div className="lg:w-1/3 max-w-sm p-2 w-full">
    <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 cursor-pointer" onClick={() => play(file)}>
      <div className="flex items-center justify-center w-12 bg-emerald-500 text-white">
        {filePlaying?.name === file.name ?  <PauseIcon className="w-5 h-5"/> : <PlayIcon className="w-5 h-5"/>}
      </div>

      <div className="px-4 py-2 -mx-3 mr-auto">
          <div className="mx-3">
              <span className="font-semibold text-emerald-500 dark:text-emerald-400">{file.name}</span>
              <p className="text-sm text-gray-600 dark:text-gray-200">{file.size}</p>
          </div>
      </div>
      <div className="flex items-center justify-center w-12" onClick={(e) => {
        e.preventDefault()
        removeFile(file)
      }}>
        <TrashIcon className="w-5 h-5" />
      </div>
    </div>
  </div>
);

const Feed = () => {
  const [coords, setCoords] = useState()
  const [isRecording, setIsRecording] = useState(false)
  const [filePlaying, setFilePlaying] = useState()
  const [files, setFiles] = useState([])

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

      await Filesystem.writeFile({
        path: fileName,
        directory: Directory.Data,
        data: value.recordDataBase64
      })

      loadFiles()
    }
  }

  const play = async (file) => {
    if(filePlaying && filePlaying.audio)
    {
      filePlaying.audio.pause()
      setFilePlaying(undefined)

      if(file.name === filePlaying.name) return
    }

    setFilePlaying(file.name)
    const res = await Filesystem.readFile({
      path: file.name, 
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
  }

  const loadFiles = async () => { 
    try {
      const res = await Filesystem.readdir({
        path: '', 
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
      path: file.name
    })

    loadFiles()
  }

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    const imageUrl = image.webPath;

    console.log("🚀 ~ file: App.tsx:111 ~ takePicture ~ imageUrl:", imageUrl)
  };
  
  useEffect(() => {
    loadFiles()

    VoiceRecorder.requestAudioRecordingPermission()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Audios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Audios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="flex gap-4 mb-2 justify-center">
          <button onClick={handleRecording} className="rounded-full h-16 w-16 p-1 flex justify-center items-center">
            {isRecording ? <StopIcon className="w-5 h-5"/> :<MicrophoneIcon className="w-5 h-5"/>}
          </button>
          <button onClick={takePicture} className="rounded-full h-16 w-16 p-1 flex justify-center items-center">
            <PhotoIcon className="w-5 h-5"/>
          </button>
        </div>

        {files.map((i, index) => (
          <AudioComponent filePlaying={filePlaying} play={play} removeFile={removeFile} file={i}  key={index} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Feed;
