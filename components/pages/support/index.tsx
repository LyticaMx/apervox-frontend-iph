import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { IonButton, IonCard, IonCardSubtitle, IonCheckbox, IonContent, IonFooter, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useNotifications } from '@/context/Notifications';
import { navigate, time, informationCircleOutline } from 'ionicons/icons';
import { VoiceRecorder } from 'capacitor-voice-recorder';
import { Directory, Filesystem } from '@capacitor/filesystem';
import clsx from 'clsx';
import ItemMenu from './ItemMenu';
import { IconAmbulance, IconFireExtinguisher, IconShieldHalfFilled, IconSpy } from '@tabler/icons-react';

const Support = () => {
  const { notification } = useNotifications()
  const history = useHistory()

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Solicitud de apoyo</IonTitle>
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

            <div className='flex flex-col grow justify-center gap-7'>
              <div className='flex gap-7 px-3'>
                <ItemMenu className="w-1/2 bg-gradient-radial from-yellow-400 to-red-500" active label="Bomberos" onClick={() => {}} icon={<IconFireExtinguisher className='w-8 h-8'/>} />
                <ItemMenu className="w-1/2 bg-gradient-radial from-blue-100 to-blue-500" label="Policia" onClick={() => {}} icon={<IconShieldHalfFilled className='w-8 h-8'/>} />
              </div>
              <div className='flex gap-7 px-3'>
                <ItemMenu className="w-1/2 bg-gradient-radial from-white to-amber-900" label="Perito" onClick={() => {}} icon={<IconSpy className='w-8 h-8'/>} />
                <ItemMenu className="w-1/2 bg-gradient-radial from-red-200 to-red-500" label="Ambulancia" onClick={() => {}} icon={<IconAmbulance className='w-8 h-8'/>} />
              </div>
            </div>
            
            {/* <div className='grow m-0 p-3 bg-opacity-25 bg-gray-500 rounded-md'>
              <IonCardSubtitle className='mb-2'>Audios</IonCardSubtitle>
              
            </div> */}
            
          </section>
        </div>
      </IonContent>
      <IonFooter className='ion-padding pt-0'>
        <IonButton className='w-full' onClick={() => history.push('case')}>Solicitar apoyo</IonButton>
      </IonFooter>
    </IonPage>
  );
}
export default Support;