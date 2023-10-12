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

  const handleClick = witness => {
    onDidDismiss();
    history.push('/witness', witness);
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
        <IonList>
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
