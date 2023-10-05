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

const DetenidosModal = ({ open, onDidDismiss }) => {
  const history = useHistory();
  const confirm = useConfirm();

  const items = [
    {
      fathersName: 'Hernandez',
      firstName: 'Luis',
      fullName: 'Luis Hernandez salas ',
      id: '651f31b0087d78ecb39074af',
      mothersName: 'salas ',
    },
    {
      fathersName: 'sabina',
      firstName: 'Juaquin',
      fullName: 'Juaquin sabina flores',
      id: '651f348d087d78ecb39074b1',
      mothersName: 'flores',
    },
  ];

  const handleClick = item => {
    onDidDismiss();

    history.push('/arrested', item);
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
        <IonList>
          {items.map((item, index) => (
            <Item
              data={item}
              key={index}
              onClick={() => handleClick(item)}
              onDelete={() => confirm('Seguro de querer eliminar al detenido?')}
            />
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default DetenidosModal;
