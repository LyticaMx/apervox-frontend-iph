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
import { useHistory } from 'react-router';

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

const DetenidosModal = ({ open, onDidDismiss, listItems }) => {
  const history = useHistory();
  const confirm = useConfirm();
  const { actions } = useCase();

  const handleClick = item => {
    onDidDismiss();

    history.push('/arrested', item);
  };

  const handleDelete = item => {
    actions.deleteArrested(item.mongoId);
  };

  return (
    <IonModal isOpen={open} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detenidos</IonTitle>
          <IonButton slot="end" fill="clear" color="dark" onClick={onDidDismiss}>
            <IonIcon name="close" />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={clsx(['h-full flex flex-col items-center justify-center', { 'hidden' : !!listItems.length }])} >
          <Image src='/img/empty.png' alt="empty" width={300} height={100}/>
          <h3 className='font-semibold -mt-5 mb-3'>No se han agregado detenidos</h3>
          <IonButton size='small' onClick={() => handleClick(undefined)}>Agregar</IonButton>
          <p></p>
        </div>
        <IonList className={clsx({ 'hidden' : !listItems.length })}>
          {listItems.map((item, index) => (
            <Item
              data={item}
              key={index}
              onClick={() => handleClick(item)}
              onDelete={() =>
                confirm('Seguro de querer eliminar al detenido?', () => handleDelete(item))
              }
            />
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default DetenidosModal;
