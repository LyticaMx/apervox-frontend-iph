import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useHistory } from "react-router"

const Place = () => {
  const history = useHistory()

  const back = () => history.goBack()
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Información del lugar</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={back}> Descartar </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen></IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  )    
}

export default Place