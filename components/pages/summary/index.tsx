import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useCase } from '@/context/Case';
import { IconBrandZoom, IconCamera, IconFolder, IconInfoCircle } from '@tabler/icons-react';
import { useHistory } from 'react-router';
import TabButton from '@/components/misc/TabButton';
import { IconMicrophone } from '@tabler/icons-react';

const Summary = () => {
  const history = useHistory()
  const { actions, case: data, witnessList, arrestedsList } = useCase();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="/cases"></IonBackButton>
          </IonButtons>
          <IonTitle>Documentación de sitio</IonTitle>
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

          {/* FORMULARIO */}
          <div className='my-10'>
            <div className='w-1/2 inline-block px-5'>
              <IonSelect label="Tipo de delito" labelPlacement="floating">
                <IonSelectOption value="">No Game Console</IonSelectOption>
                <IonSelectOption value="nes">NES</IonSelectOption>
                <IonSelectOption value="n64">Nintendo64</IonSelectOption>
                <IonSelectOption value="ps">PlayStation</IonSelectOption>
                <IonSelectOption value="genesis">Sega Genesis</IonSelectOption>
                <IonSelectOption value="saturn">Sega Saturn</IonSelectOption>
                <IonSelectOption value="snes">SNES</IonSelectOption>
              </IonSelect>
            </div>
            <div className='w-1/2 inline-block px-5'>
              <IonSelect label="Nivel de riesgo" labelPlacement="floating">
                <IonSelectOption value="LOW">Bajo</IonSelectOption>
                <IonSelectOption value="MEDIUM">Medio</IonSelectOption>
                <IonSelectOption value="HIGH">Alto</IonSelectOption>
                <IonSelectOption value="VERY_HIGH">Muy alto</IonSelectOption>
              </IonSelect>
            </div>
            <div className='w-1/2 inline-block px-5 mt-5'>
              <IonInput label="Heridos" type="number" placeholder="0" labelPlacement="floating"></IonInput>
            </div>
            <div className='w-1/2 inline-block px-5 mt-5'>
              <IonInput label="Muertos" type="number" placeholder="0" labelPlacement="floating"></IonInput>
            </div>
          </div>


          <IonList>
            <IonListHeader>
              <IonLabel className="text-sm">Resumen de evidencia multimedia</IonLabel>
            </IonListHeader>

            <IonItem button>
              <IconMicrophone className='w-5 h-5 ml-2 mr-5' />
              <IonLabel>Audios</IonLabel>
              <IonNote slot="end">2</IonNote>
            </IonItem>
            <IonItem button>
              <IconBrandZoom className='w-5 h-5 ml-2 mr-5' />
              <IonLabel>Videos</IonLabel>
              <IonNote slot="end">0</IonNote>
            </IonItem>
            <IonItem button>
              <IconCamera className='w-5 h-5 ml-2 mr-5' />
              <IonLabel>Fotografías</IonLabel>
              <IonNote slot="end">0</IonNote>
            </IonItem>
          </IonList>

          <IonButton className='mt-auto'>Continuar documentación</IonButton>
        </div>

      </IonContent>
      <IonFooter className="ion-padding">
        <div className="flex mt-auto">
          <div className="grow basis-full">
            <TabButton label="Audio" icon={<IconMicrophone className='w-5 h-5' />} />
          </div>
          <div className="grow basis-full">
            <TabButton label="Video" icon={<IconBrandZoom className='w-5 h-5' />} />
          </div>
          <div className="grow basis-full">
            <TabButton label="Fotos" icon={<IconCamera className='w-5 h-5' />} />
          </div>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Summary;
