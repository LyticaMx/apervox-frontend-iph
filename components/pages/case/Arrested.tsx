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
        <IonList>
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
