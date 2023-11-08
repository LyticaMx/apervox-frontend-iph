import { ReactNode, useCallback } from "react"
import { IonIcon, IonLabel, IonRippleEffect } from "@ionic/react"
import clsx from "clsx"
import { useHistory } from "react-router"

interface Props {
  className? : string
  label: string
  onClick?: (e?: any) => void
  to?: string
  icon: ReactNode
  active?: boolean
  square?: boolean
}
const MenuItem = ({label, icon, onClick, to, className, active, square}: Props) => {
  const history = useHistory()

  const handleClick = useCallback((e) => {
    if(to) history.push(to)
    else if(onClick) onClick(e)
  }, [to, onClick, history])

  const itemClass = clsx(className, [
    'flex flex-col gap-2 p-4 items-center justify-center rounded-md rounded-md',
    'ion-activatable overflow-hidden relative select-none',
    {
      'aspect-square': square,
      'drop-shadow-md': active,
      'opacity-50': !active
    }
  ])
  return (
    <div onClick={handleClick} className={itemClass}>
      {icon}
      <IonLabel className="font-medium uppercase text-xl">{label}</IonLabel>
      <IonRippleEffect/>
    </div>
  )
}

export default MenuItem