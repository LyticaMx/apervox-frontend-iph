import { IonIcon, IonItem, IonLabel } from "@ionic/react"

const AudioCard = ({ name, onDelete}) => (<IonItem>
    <IonIcon aria-hidden="true" icon="trash-outline" slot="end" onClick={onDelete}></IonIcon>
    <IonLabel>{name}</IonLabel>
</IonItem>)

export default AudioCard