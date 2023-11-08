import { FormProfile } from '@/components/ui/FormProfile/FormProfile';
import { useCase } from '@/context/Case';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router';
import { useRef } from 'react';

const Casualties = () => {
  const history = useHistory();
  const { actions } = useCase();
  const formikRef = useRef(null);
  const { state } = useLocation();

  const back = () => history.replace('/case');

  const valuesForm =
    state !== undefined
      ? state
      : {
          fathersName: '',
          firstName: '',
          fullName: '',
          mothersName: '',
        };

  const sendForm = async values => {
    try {
      if(state) await actions.editCasualty(values)
      else await actions.addCasualty(values)

      back();
    } catch (error) {
      
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Añadir damnificado</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={back}> Descartar </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="m-3">
          <FormProfile
            sendForm={sendForm}
            button={false}
            formikRef={formikRef}
            initialValues={valuesForm}
          />
        </div>
      </IonContent>
      <IonFooter className="ion-padding">
        <IonButton expand='full' onClick={() => formikRef?.current?.submitForm()}>Enviar</IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Casualties;
