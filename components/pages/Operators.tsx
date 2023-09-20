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
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { withProvider } from '../../hoc/withProvider';
import { OperatorProvider, useOperators } from '../../context/Operators';

const Operators = () => {
  const { actions, data } = useOperators();

  useEffect(() => {
    actions.getData();
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
         {data.map(operator => (
          <div key={operator?.id}>
            <h1>{operator?.fullName}</h1>
          </div>
        ))} 
      </IonContent>
    </IonPage>
  );
};

export default withProvider(Operators, OperatorProvider);
