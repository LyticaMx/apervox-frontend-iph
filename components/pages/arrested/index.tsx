import { FormProfile } from '@/components/ui/FormProfile/FormProfile';
import { useCases } from '@/context/Cases';
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

const Arrested = () => {
  const history = useHistory();
  const { actions } = useCases();
  const formikRef = useRef(null);
  const { state } = useLocation();

  const back = () => history.goBack();

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
    let response;
    if (state !== undefined) {
      response = await actions.addArrested(values);
    } else {
      response = await actions.editArrested(values);
    }
    if (Object.keys(response).length !== 0) back();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Añadir detenido</IonTitle>
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
      <IonFooter>
        <div className="m-3">
          <IonButton onClick={() => formikRef?.current?.submitForm()}>Enviar</IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Arrested;
