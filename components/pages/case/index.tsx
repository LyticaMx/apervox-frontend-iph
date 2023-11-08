import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import ItemMenu from './ItemMenu'
import { useCase } from '@/context/Case'
import { IconAlignBoxLeftTop, IconClipboardList, IconEye, IconPennant, IconShield, IconUserExclamation } from '@tabler/icons-react'
import { useHistory } from 'react-router'
import CaseDescription from '@/components/misc/CaseDescription'
import BackButton from '@/components/misc/BackButton'
import ProfilesModal, { Types } from './ProfilesModal'

const Case = () => {
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<Types>('arrested')

  const { actions, case: data, witnessList, arrestedsList, casualties } = useCase()

  const handleOpen = (value: Types) => {
    setType(value)
    setOpen(true)
  }

  useEffect(() => {
    actions.getWitness()
    actions.getArrested()
    actions.getCasualties()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <BackButton to="/cases"/>
          </IonButtons>
          <IonTitle>Caso</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="flex flex-col h-full gap-2.5">
          <CaseDescription />

          <IonList>
            <IonListHeader>
              <IonLabel className="text-sm">Resumen de información recolectada</IonLabel>
            </IonListHeader>

            <IonItem button onClick={(e) => {
              e.preventDefault()
              history.push('/summary')
            }}>
              <IconClipboardList className='w-5 h-5 ml-2 mr-5' />
              <IonLabel>Resumen</IonLabel>
              <IonCheckbox slot="end" checked={!!data?.summary}></IonCheckbox>
            </IonItem>
            <IonItem button onClick={() => handleOpen('arrested')}>
              <IconShield className='w-5 h-5 ml-2 mr-5' />
              <IonLabel>Detenidos</IonLabel>
              <IonNote slot="end">{arrestedsList.length}</IonNote>
            </IonItem>
            <IonItem button onClick={() => handleOpen('witness')}>
              <IconEye className='w-5 h-5 ml-2 mr-5' />
              <IonLabel>Testigos</IonLabel>
              <IonNote slot="end">{witnessList.length}</IonNote>
            </IonItem>
            <IonItem button onClick={() => handleOpen('casualties')}>
              <IconUserExclamation className='w-5 h-5 ml-2 mr-5' />
              <IonLabel>Damnificados</IonLabel>
              <IonNote slot="end">{casualties.length}</IonNote>
            </IonItem>
            <IonItem button>
              <IconPennant className='w-5 h-5 ml-2 mr-5' />
              <IonLabel>Sitio</IonLabel>
            </IonItem>
            <IonItem button>
              <IconAlignBoxLeftTop className='w-5 h-5 ml-2 mr-5' />
              <IonLabel>Evidencias</IonLabel>
              <IonNote slot="end">8</IonNote>
            </IonItem>
          </IonList>

          <div className="flex mt-auto">
            <div className="grow basis-full">
              <ItemMenu label="Detenido" to="/arrested" icon={<IconShield className='w-5 h-5' />} />
            </div>
            <div className="grow basis-full">
              <ItemMenu label="Testigo" to="/witness" icon={<IconEye className='w-5 h-5' />} />
            </div>
            <div className="grow basis-full">
              <ItemMenu label="Damnificado" to="/casualties" icon={<IconUserExclamation className='w-5 h-5' />} />
            </div>
          </div>
          <div className="flex">
          <div className="grow basis-full">
              <ItemMenu label="Sitio" to="/place" icon={<IconPennant className='w-5 h-5' />} />
            </div>
            <div className="grow basis-full">
              <ItemMenu label="Evidencia" to="/evidence" icon={<IconAlignBoxLeftTop className='w-5 h-5 ml-2 mr-5' />} />
            </div>
          </div>
        </div>
        
        <ProfilesModal type={type} open={open} onDidDismiss={() => setOpen(false)}/>

      </IonContent>
      <IonFooter className="ion-padding">
        <IonButton expand="block">Enviar información</IonButton>
      </IonFooter>
    </IonPage>
  )
}

export default Case
