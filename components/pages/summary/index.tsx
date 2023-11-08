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
  IonModal,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useCase } from '@/context/Case';
import { IconBrandZoom, IconCamera } from '@tabler/icons-react';
import { useHistory } from 'react-router';
import TabButton from '@/components/misc/TabButton';
import { IconMicrophone } from '@tabler/icons-react';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { pick } from 'lodash'
import CaseDescription from '@/components/misc/CaseDescription';
import { useEffect, useMemo, useRef } from 'react';
import Form from './form';
import BackButton from '@/components/misc/BackButton';
import { useRecord } from '@/hooks/useRecord';
import { useVideoRecord } from '@/hooks/useVideoRecord';


const Summary = () => {
  const { case: caseData } = useCase()
  const ref = useRef(null);
  const path = useMemo(() => `${caseData?.folio}/summary/audios`, [caseData])
  const pathVideos = useMemo(() => `${caseData?.folio}/summary/videos`, [caseData])
  const { files, RecordButton } = useRecord({ path })
  const { files: filesVideos, RecordButton: RecordButtonVideo, RecordModal } = useVideoRecord({ path: pathVideos })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <BackButton to="/case"/>
          </IonButtons>
          <IonTitle>Documentación de sitio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="flex flex-col h-full gap-2.5">
          <CaseDescription />

          <Form formikRef={ref}/>

          <IonList>
            <IonListHeader>
              <IonLabel className="text-sm">Resumen de evidencia multimedia</IonLabel>
            </IonListHeader>

            <IonItem button>
              <IconMicrophone className='w-5 h-5 ml-2 mr-5' />
              <IonLabel>Audios</IonLabel>
              <IonNote slot="end">{files.length}</IonNote>
            </IonItem>
            <IonItem button>
              <IconBrandZoom className='w-5 h-5 ml-2 mr-5' />
              <IonLabel>Videos</IonLabel>
              <IonNote slot="end">{filesVideos.length}</IonNote>
            </IonItem>
            <IonItem button>
              <IconCamera className='w-5 h-5 ml-2 mr-5' />
              <IonLabel>Fotografías</IonLabel>
              <IonNote slot="end">0</IonNote>
            </IonItem>
          </IonList>

          <div className="flex mt-auto">
            <div className="grow basis-full">
              <RecordButton />
            </div>
            <div className="grow basis-full">
              <RecordButtonVideo />
              <RecordModal />
            </div>
            <div className="grow basis-full">
              <TabButton label="Fotos" icon={<IconCamera className='w-5 h-5' />} />
            </div>
          </div>
        </div>
      </IonContent>
      <IonFooter className="ion-padding">
        <IonButton expand="block" disabled={!ref.current?.isValid} onClick={ref.current?.submitForm}>
            Guardar documentación
          </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Summary;
