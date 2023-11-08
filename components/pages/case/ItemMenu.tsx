import { IonIcon, IonLabel, IonRippleEffect } from "@ionic/react"
import { ReactNode } from "react"
import { useHistory } from "react-router"

interface Props {
  label: string
  to: string
  icon: ReactNode
}
const ItemMenu = ({label, icon, to}: Props) => {
  const history = useHistory()
  
  return (
    <div onClick={() => history.push(to)} className="flex flex-col items-center gap-2 p-3 ion-activatable overflow-hidden relative select-none rounded-md">
      {icon}
      <IonLabel>{label}</IonLabel>
      <IonRippleEffect/>
    </div>
  )
}

export default ItemMenu