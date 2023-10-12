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
import { useHistory } from 'react-router';
import { useCase } from '@/context/Case';
import Image from 'next/image';
import clsx from 'clsx';

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

const TestigosModal = ({ open, onDidDismiss, listItems }) => {
  const history = useHistory();
  const confirm = useConfirm();
  const { actions } = useCase();

  const handleClick = item => {
    onDidDismiss();
    history.push('/witness', item);
  };
  const handleDelete = item => {
    actions.deleteWitness(item.mongoId);
  };
  return (
    <IonModal isOpen={open} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Testigos</IonTitle>
          <IonButton slot="end" fill="clear" color="dark" onClick={onDidDismiss}>
            <IonIcon name="close" />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

      <div className={clsx(['h-full flex flex-col items-center justify-center', { 'hidden' : !!listItems.length }])} >
          <Image src='/img/empty.png' alt="empty" width={300} height={100}/>
          <h3 className='font-semibold -mt-5 mb-3'>No se han agregado testigos</h3>
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
                confirm('¿Seguro de querer eliminar al testigo?', () => handleDelete(item))
              }
            />
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default TestigosModal;
