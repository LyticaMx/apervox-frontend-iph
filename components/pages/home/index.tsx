import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IconClipboardList, IconNotification } from '@tabler/icons-react';
import MenuItem from '@/components/misc/MenuItem';

const Home = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>IPH</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className='flex flex-col h-full'>
          <section className='flex flex-col gap-3 h-full'>
            <div className='flex flex-col grow justify-center gap-7'>
              <MenuItem active label="Notificaciones" to="notifications" icon={<IconNotification className='w-8 h-8'/>} className="bg-gradient-radial from-yellow-100 to-yellow-500"/>
              <MenuItem active label="Casos" to='cases' icon={<IconClipboardList className='w-8 h-8'/>} className="bg-gradient-radial from-blue-100 to-blue-500"/>
            </div>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Home;