import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonMenuButton,
  IonButton,
} from '@ionic/react';
import { useEffect, useRef } from 'react';
import { withProvider } from '../../hoc/withProvider';
import { OperatorProvider, useOperators } from '../../context/Operators';
import { FormProfile } from '../ui/FormProfile/FormProfile';

const Operators = () => {
  const { actions, data } = useOperators();
  const formikRef = useRef(null);

  useEffect(() => {
    // actions.getData();
  }, []);

  const sendOperator = values => {
    console.log('---send', values);
  };

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
        <FormProfile sendForm={sendOperator} />
        <FormProfile
          sendForm={sendOperator}
          initialValues={{ firstName: 'Luis', fathersName: 'Hernandez', mothersName: 'Salas' }}
        />
        <FormProfile
          sendForm={sendOperator}
          initialValues={{ firstName: 'Luis', fathersName: 'Hernandez', mothersName: 'Salas' }}
          formikRef={formikRef}
          button={false}
        />
        <IonButton onClick={() => formikRef?.current?.submitForm()}>enviar button</IonButton>
        {/* {data.map(operator => (
          <div key={operator?.id}>
            <h1>{operator?.fullName}</h1>
          </div>
        ))} */}
      </IonContent>
    </IonPage>
  );
};

export default withProvider(Operators, OperatorProvider);
