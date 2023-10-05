import { useEffect } from 'react';
import { IonContent, IonFooter, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useNotifications } from '@/context/Notifications';
import { useHistory } from 'react-router';

function Notifications() {
  const { data, pagination, actions } = useNotifications()
  const history = useHistory()

  const handleClick = async (id) => {
    await actions.getNotification(id)
    history.push('/notification')
  }

  useEffect(() => { actions.getData() }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notificaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonList>
            {data.map((item, index) => (
              <IonItem key={index} button onClick={(e) => {
                e.preventDefault()
                handleClick(item.mongoId)
              }
              }>
                  <IonLabel>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </IonLabel>
              </IonItem>
            ))}
        </IonList>
        <IonInfiniteScroll
            onIonInfinite={(ev) => {
              console.log('ENTRAMOS?')
            actions.getData({cursor: pagination.endCursor});
            setTimeout(() => ev.target.complete(), 500);
            }}
        >
            <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
}
export default Notifications;