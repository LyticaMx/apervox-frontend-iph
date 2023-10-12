import { IonIcon, IonLabel, IonRippleEffect } from "@ionic/react"
import { ReactNode, useCallback } from "react"
import { useHistory } from "react-router"

interface Props {
  label: string
  onClick?: (e?: any) => void
  to?: string
  icon: ReactNode
}
const TabButton = ({label, icon, to, onClick}: Props) => {
  const history = useHistory()
  
  const handleClick = useCallback((e) => {
    if(to) history.push(to)
    else if(onClick) onClick(e)
  }, [to, onClick, history])

  return (
    <div onClick={handleClick} className="flex flex-col items-center gap-2 p-3 ion-activatable overflow-hidden relative select-none rounded-md">
      {icon}
      <IonLabel>{label}</IonLabel>
      <IonRippleEffect/>
    </div>
  )
}

export default TabButton