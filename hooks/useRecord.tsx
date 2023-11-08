import TabButton from "@/components/misc/TabButton";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { IconMicrophone, IconPlayerStop } from "@tabler/icons-react";
import { VoiceRecorder } from "capacitor-voice-recorder";
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
export const useRecord = ({ path }: RecorderConfig) => {
  const [files, setFiles] = useState([])
  const [isRecording, setIsRecording] = useState(false)
  const [filePlaying, setFilePlaying] = useState<{name: string; audio: HTMLAudioElement } | undefined>()

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

  const RecordButton = useCallback((props: ButtonProps) => {
    if(isRecording )
      return (<TabButton className={props.className?.recording} label={props.hideLabel ? undefined : "Parar" } onClick={handleRecording} icon={<IconPlayerStop className='w-5 h-5' />} />)

    return (<TabButton className={props.className?.base} label={props.hideLabel ? undefined : "Grabar" } onClick={handleRecording} icon={<IconMicrophone className='w-5 h-5' />} />)
  }, [isRecording])

  return {
    files,
    isRecording,
    record: handleRecording,
    play,
    removeFile,
    RecordButton
  }
}