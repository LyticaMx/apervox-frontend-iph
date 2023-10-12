import { useEffect } from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import { useCases } from '@/context/Cases';
import { useCase } from '@/context/Case';

function Cases() {
  const { data, pagination, actions } = useCases()
  const { actions: caseActions } = useCase()

  const history = useHistory()

  const handleClick = async (id) => {
    try {
      await caseActions.getCase(id)
      history.push('/case')
    } catch (error) {
      
    }
  }

  useEffect(() => { actions.getData() }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Casos</IonTitle>
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
                    <p>{item.mongoId}</p>
                    <h3>{item.folio}</h3>
                    <p>{item.status}</p>
                  </IonLabel>
              </IonItem>
            ))}
        </IonList>
        <IonInfiniteScroll
            onIonInfinite={(ev) => {
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
export default Cases;