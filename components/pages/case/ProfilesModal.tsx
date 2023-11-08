import { useCase } from '@/context/Case';
import { useConfirm } from '@/hooks/useConfirm';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import clsx from 'clsx';
import Image from 'next/image';
import { useMemo } from 'react';
import { useHistory } from 'react-router';

export type Types = 'arrested' | 'witness' | 'casualties'
interface Props {
  type : Types
  open: boolean
  onDidDismiss: () => void
}
const titles = { arrested : 'Detenidos',  witness: 'Testigos', casualties: 'Damnificados'}
const addRoutes = { arrested : '/arrested',  witness: '/witness', casualties: '/casualties'}

const Item = ({ data, onDelete, ...props }) => (
  <IonItem {...props}>
    <IonLabel>{data.fullName}</IonLabel>
    <IonButton
      slot="end"
      fill="clear"
      color="dark"
      onClick={e => {
        e.preventDefault();
        onDelete();
        e.stopPropagation();
      }}
    >
      <IonIcon name="trash" />
    </IonButton>
  </IonItem>
);

const ProfilesModal = ({ open, onDidDismiss, type }: Props) => {
  const history = useHistory();
  const confirm = useConfirm();
  const { actions, casualties, arrestedsList, witnessList } = useCase();

  const data = useMemo(() => {
    switch (type) {
      case 'casualties': return casualties
      case 'witness': return witnessList
      case 'arrested': return arrestedsList
      default: return []
    }
  }, [type])

  const handleClick = item => {
    onDidDismiss();

    history.push(addRoutes[type], item);
  };

  const handleDelete = item => {
    actions.deleteArrested(item.mongoId);
  };

  return (
    <IonModal isOpen={open} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{titles[type]}</IonTitle>
          <IonButton slot="end" fill="clear" color="dark" onClick={onDidDismiss}>
            <IonIcon name="close" />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={clsx(['h-full flex flex-col items-center justify-center', { 'hidden' : !!data.length }])} >
          <Image src='/img/empty.png' alt="empty" width={300} height={100}/>
          <h3 className='font-semibold -mt-5 mb-3'>No se han agregado registros</h3>
          <IonButton size='small' onClick={() => handleClick(undefined)}>Agregar</IonButton>
          <p></p>
        </div>
        <IonList className={clsx({ 'hidden' : !data.length })}>
          {data.map((item, index) => (
            <Item
              data={item}
              key={index}
              onClick={() => handleClick(item)}
              onDelete={() =>
                confirm('Seguro de querer eliminar el registro?', () => handleDelete(item))
              }
            />
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default ProfilesModal;
