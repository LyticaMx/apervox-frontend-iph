import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import TestigosModal from './Witnesses';
import DetenidosModal from './Arrested';
import ItemMenu from './ItemMenu';
import { useCases } from '@/context/Cases';

const Case = () => {
  const [openTestigos, setOpenTestigos] = useState(false);
  const [openDetenidos, setOpenDetenidos] = useState(false);

  const { actions, witnessList, arrestedsList } = useCases();

  useEffect(() => {
    actions.getWitness();
    actions.getArrested();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Caso</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="flex flex-col h-full gap-2.5">
          <div className="flex items-center text-sm gap-3">
            <IonIcon className="w-5 h-5" name="information-circle" />
            <span>Posible robo de autopartes</span>
          </div>
          <div className="flex items-center text-sm gap-3">
            <IonIcon className="w-5 h-5" name="folder" />
            <span>29102023-1610-1931</span>
          </div>

          <IonList>
            <IonListHeader>
              <IonLabel className="text-sm">Resumen de información recolectada</IonLabel>
            </IonListHeader>

            <IonItem button onClick={() => setOpenDetenidos(true)}>
              <IonIcon slot="start" icon="man"></IonIcon>
              <IonLabel>Detenidos</IonLabel>
              <IonNote slot="end">{arrestedsList.length}</IonNote>
            </IonItem>
            <IonItem button onClick={() => setOpenTestigos(true)}>
              <IonIcon slot="start" icon="eye"></IonIcon>
              <IonLabel>Testigos</IonLabel>
              <IonNote slot="end">{witnessList.length}</IonNote>
            </IonItem>
            <IonItem button>
              <IonIcon slot="start" icon="paper-plane"></IonIcon>
              <IonLabel>Sitio</IonLabel>
              {/* <IonNote slot="end">3</IonNote> */}
            </IonItem>
            <IonItem button>
              <IonIcon slot="start" icon="file-tray-stacked"></IonIcon>
              <IonLabel>Evidencias</IonLabel>
              <IonNote slot="end">8</IonNote>
            </IonItem>
          </IonList>

          <div className="flex mt-auto">
            <div className="grow basis-full">
              <ItemMenu label="Detenido" to="/arrested" icon="man" />
            </div>
            <div className="grow basis-full">
              <ItemMenu label="Testigo" to="/witness" icon="eye" />
            </div>
            <div className="grow basis-full">
              <ItemMenu label="Sitio" to="/place" icon="paper-plane" />
            </div>
            <div className="grow basis-full">
              <ItemMenu label="Evidencia" to="/evidence" icon="file-tray-stacked" />
            </div>
          </div>
        </div>

        <TestigosModal
          open={openTestigos}
          onDidDismiss={() => setOpenTestigos(false)}
          listItems={witnessList}
        />
        <DetenidosModal
          open={openDetenidos}
          onDidDismiss={() => setOpenDetenidos(false)}
          listItems={arrestedsList}
        />
        {/* <Confirm open={true} message="?"/> */}
      </IonContent>
      <IonFooter className="ion-padding pt-0">
        <IonButton expand="block">Enviar información</IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Case;
