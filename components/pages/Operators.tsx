import Image from 'next/image';
import Card from '../ui/Card';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
  IonAlert,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { withProvider } from '../../hoc/withProvider';
import { OperatorProvider, useOperators } from '../../context/Operators';
// import { PushNotifications } from '@capacitor/push-notifications';
import { useHistory } from 'react-router-dom';

const Operators = () => {
  const { actions, data } = useOperators();
  const [notifiaction, setnotifiaction] = useState('holka');
  const [statusNotification, setstatusNotification] = useState('');
  let history = useHistory();

  // const registerNotifications = async () => {
  //   let permStatus = await PushNotifications.checkPermissions();

  //   if (permStatus.receive === 'prompt') {
  //     permStatus = await PushNotifications.requestPermissions();
  //   }

  //   if (permStatus.receive !== 'granted') {
  //     setnotifiaction('User denied permissions!')

  //     throw new Error('User denied permissions!');
  //   }

  //   await PushNotifications.register();
  //   addListeners()
  // }

  // const addListeners = async () => {
  //   await PushNotifications.addListener('registration', token => {
  //     console.info('Registration token: ', token.value);
  //     setstatusNotification(`Registration token:${token.value}`)
  //   });

  //   await PushNotifications.addListener('registrationError', err => {
  //     console.error('Registration error: ', err.error);
  //     setstatusNotification(`Registration error: ${err.error}`)

  //   });

  //   await PushNotifications.addListener('pushNotificationReceived', notification => {
  //     console.log('Push notification received: ', notification);
  // // if(notification?.urlRedirect ){
  //     setstatusNotification(`Push notification received:${JSON.stringify(notification)}`)
  // // }

  //   });

  //   // await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
  //   //   console.log('Push notification action performed', notification.actionId, notification.inputValue);
  //   //       setstatusNotification(`Push notification action performed${notification.actionId}---${notification.inputValue}`)

  //   // });
  //   await PushNotifications.addListener('pushNotificationActionPerformed',
  //       (notification: any) => {
  //    const {urlRedirect} = notification.notification
  //    if(urlRedirect){
  // setTimeout(() => {
  //         history.push(urlRedirect);
  //         setstatusNotification(`---re direcciona a -${urlRedirect}----` );

  // }, 1000);
  //    }
  //       }
  //     );
  //   console.log("---notigicafion lisse")
  // }

  useEffect(() => {
    // functionE()
    actions.getData();
    // PushNotifications.register();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Feed</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Feed</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <IonButton onClick={() =>registerNotifications()}>activate</IonButton> */}
        {data.map(operator => (
          <div key={operator?.id}>
            <h1>{operator?.fullName}</h1>
          </div>
        ))}
        status notification:
        {statusNotification}
      </IonContent>
    </IonPage>
  );
};

export default withProvider(Operators, OperatorProvider);
