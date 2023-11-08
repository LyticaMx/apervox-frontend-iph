import { useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { IonBackButton, IonButton, IonButtons, IonCardSubtitle, IonContent, IonFooter, IonHeader, IonIcon, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AudioCard from './AudioCard';
import clsx from 'clsx';
import CaseDescription from '@/components/misc/CaseDescription';
import { useCase } from '@/context/Case';
import { useRecord } from '@/hooks/useRecord';
import { IconShield } from '@tabler/icons-react';


const Notes = () => {
  const history = useHistory()
  const { case: caseData } = useCase()
  const [emergency, setEmergency] = useState(false)

  const path = useMemo(() => `${caseData.folio}/notes`, [caseData])
  const { files, removeFile, RecordButton } = useRecord({ path })
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" >
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Nota rápida</IonTitle>
          <button slot='end' onClick={() => setEmergency(!emergency)} className={clsx('border border-red-500 text-red-500 bg-transparent px-2 py-0.5 text-sm mx-2 ring-0 outline-none focus:border-red-500 flex gap-2 items-center rounded-md', { '!bg-red-500 !text-white ': emergency})}>
            <IconShield className='w-4 h-4'/>
            Emergencia
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className='flex flex-col h-full'>
          <section className='flex flex-col gap-3 h-full'>
            <CaseDescription />
            <div className='grow m-0 p-3 bg-opacity-25 bg-gray-500 rounded-md'>
              <IonCardSubtitle className='mb-2'>Audios</IonCardSubtitle>
              <IonList className='!p-0'>
                {files.map((item, index) => (
                  <AudioCard name={item.name} onDelete={() => removeFile(item)} key={index}/>
                ))}
              </IonList>
            </div>
          </section>
          <div className='w-full flex justify-center mt-4'>
            <RecordButton className={{ base: 'text-blue-500' }}/>
          </div>
        </div>
      </IonContent>
      <IonFooter className='ion-padding pt-0'>
        <IonButton className='w-full' disabled={!emergency} onClick={() => history.push('support')} color="danger">Solicitar refuerzos</IonButton>
        <IonButton className='w-full' disabled={!emergency} color="warning">Uso de fuerza</IonButton>
        <div className='flex'>
          <IonButton class='w-1/2' expand='block' color="warning">Falsa alarma</IonButton>
          <IonButton class='w-1/2' expand='block' onClick={() => history.push('case')}>Iniciar proceso</IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
}
export default Notes;