import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { IonBackButton, IonButton, IonButtons, IonCardSubtitle, IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ItemMenu from './ItemMenu';
import { IconAmbulance, IconFireExtinguisher, IconShieldHalfFilled, IconSpy } from '@tabler/icons-react';
import { useCase } from '@/context/Case';
import CaseDescription from '@/components/misc/CaseDescription';
import {get} from 'lodash'

const Support = () => {
  const { actions, case: caseItem } = useCase()
  const history = useHistory()
  const [supports, setSupports] = useState([])

  const handleAdd = (item: string) => () => {
    const aux = supports.includes(item) ? supports.filter(value => value !== item) : [...supports, item]
    
    setSupports(aux)
  }

  const handleClick = () => {
    actions.addSupports(supports)
    history.goBack()
  }

  useEffect(() => {
    setSupports((caseItem?.support ?? []).map((item) => item.supportType))
  }, [caseItem])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" >
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Solicitud de apoyo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className='flex flex-col h-full'>
          <section className='flex flex-col gap-3 h-full'>
            <CaseDescription />

            <IonCardSubtitle className='mt-10'>Se enviará solicitud de los siguientes servicios</IonCardSubtitle>

            <div className='flex flex-col grow justify-center gap-7'>
              <div className='flex gap-7 px-3'>
                <ItemMenu className="w-1/2 bg-gradient-radial from-yellow-400 to-red-500" active={supports.includes('FIREFIGHTER')} label="Bomberos" onClick={handleAdd('FIREFIGHTER')} icon={<IconFireExtinguisher className='w-8 h-8'/>} />
                <ItemMenu className="w-1/2 bg-gradient-radial from-blue-100 to-blue-500" active={supports.includes('POLICE')} label="Policia" onClick={handleAdd('POLICE')} icon={<IconShieldHalfFilled className='w-8 h-8'/>} />
              </div>
              <div className='flex gap-7 px-3'>
                <ItemMenu className="w-1/2 bg-gradient-radial from-white to-amber-900" active={supports.includes('DETECTIVE')} label="Perito" onClick={handleAdd('DETECTIVE')} icon={<IconSpy className='w-8 h-8'/>} />
                <ItemMenu className="w-1/2 bg-gradient-radial from-red-200 to-red-500" active={supports.includes('AMBULANCE')} label="Ambulancia" onClick={handleAdd('AMBULANCE')} icon={<IconAmbulance className='w-8 h-8'/>} />
              </div>
            </div>
            
            
            {/* <div className='grow m-0 p-3 bg-opacity-25 bg-gray-500 rounded-md'>
              
            </div> */}
            
          </section>
        </div>
      </IonContent>
      <IonFooter className='ion-padding pt-0'>
        <IonButton className='w-full' disabled={!supports.length} onClick={handleClick}>Solicitar apoyo</IonButton>
      </IonFooter>
    </IonPage>
  );
}
export default Support;