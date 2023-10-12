import {
  IonBackButton,
  IonButton,
  IonButtons,
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
import { useCase } from '@/context/Case';
import { IconAlignBoxLeftTop, IconEye, IconFolder, IconInfoCircle, IconPennant, IconPrison, IconShield } from '@tabler/icons-react';

const Case = () => {
  const [openTestigos, setOpenTestigos] = useState(false);
  const [openDetenidos, setOpenDetenidos] = useState(false);

  const { actions, case: data, witnessList, arrestedsList } = useCase();

  useEffect(() => {
    actions.getWitness();
    actions.getArrested();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="/cases"></IonBackButton>
          </IonButtons>
          <IonTitle>Caso</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="flex flex-col h-full gap-2.5">
          <div className="flex items-center text-sm gap-3">
            <IconInfoCircle className="w-5 h-5"/>
            <span>{data?.notification.title}</span>
          </div>
          <div className="flex items-center text-sm gap-3">
            <IconFolder className="w-5 h-5" />
            <span>{data?.folio}</span>
          </div>

          <IonList>
            <IonListHeader>
              <IonLabel className="text-sm">Resumen de información recolectada</IonLabel>
            </IonListHeader>

            <IonItem button onClick={() => setOpenDetenidos(true)}>
              <IconShield className='w-5 h-5 ml-2 mr-5' />
              <IonLabel>Detenidos</IonLabel>
              <IonNote slot="end">{arrestedsList.length}</IonNote>
            </IonItem>
            <IonItem button onClick={() => setOpenTestigos(true)}>
              <IconEye className='w-5 h-5 ml-2 mr-5' />
              <IonLabel>Testigos</IonLabel>
              <IonNote slot="end">{witnessList.length}</IonNote>
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
              <ItemMenu label="Sitio" to="/place" icon={<IconPennant className='w-5 h-5' />} />
            </div>
            <div className="grow basis-full">
              <ItemMenu label="Evidencia" to="/evidence" icon={<IconAlignBoxLeftTop className='w-5 h-5 ml-2 mr-5' />} />
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
