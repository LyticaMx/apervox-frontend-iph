import { IonIcon, IonLabel, IonRippleEffect } from "@ionic/react"
import clsx from "clsx"
import { ReactNode, useCallback } from "react"
import { useHistory } from "react-router"

interface Props {
  label?: string
  onClick?: (e?: any) => void
  to?: string
  icon: ReactNode
  className?: string
}
const TabButton = ({label, icon, to, onClick, className}: Props) => {
  const history = useHistory()
  
  const handleClick = useCallback((e) => {
    if(to) history.push(to)
    else if(onClick) onClick(e)
  }, [to, onClick, history])

  return (
    <div onClick={handleClick} className={clsx("flex flex-col items-center gap-2 p-3 ion-activatable overflow-hidden relative select-none rounded-md", className)}>
      {icon}
      {label ? <IonLabel>{label}</IonLabel> : null}
      <IonRippleEffect/>
    </div>
  )
}

export default TabButton