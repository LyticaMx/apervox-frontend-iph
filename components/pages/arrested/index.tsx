import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useHistory } from "react-router"

const Arrested = () => {
  const history = useHistory()

  const back = () => history.goBack()
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Añadir detenido</IonTitle>
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

export default Arrested