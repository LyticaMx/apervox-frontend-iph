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
    <IonLabel>{data.name}</IonLabel>
    <IonButton slot="end" fill="clear" color="dark" onClick={(e) => {
      e.preventDefault()
      onDelete()
      e.stopPropagation()
    }}>
      <IonIcon name="trash" />
    </IonButton>
  </IonItem>
);

const DetenidosModal = ({ open, onDidDismiss }) => {
  const history = useHistory()
  const confirm = useConfirm()

  const items = [
    {name: "Efrain Cuadras Gonzalez"},
    {name: "Dulce Zazueta Aviles"}
  ]

  const handleClick = () => { 
    onDidDismiss()
    history.push('/arrested') 
  }

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
            <Item data={item} key={index} onClick={handleClick} onDelete={() => confirm('Seguro de querer eliminar al detenido?')}/>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default DetenidosModal;
