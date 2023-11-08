import { ReactNode } from "react"
import { IonIcon, IonLabel, IonRippleEffect } from "@ionic/react"
import clsx from "clsx"

interface Props {
  className? : string
  label: string
  onClick: () => void
  icon: ReactNode
  active?: boolean
}
const ItemMenu = ({label, icon, onClick, className, active}: Props) => {
  const itemClass = clsx(className, [
    'flex flex-col gap-2 items-center justify-center aspect-square rounded-md rounded-md',
    'ion-activatable overflow-hidden relative select-none',
    {
      'drop-shadow-md': active,
      'opacity-50': !active
    }
  ])
  return (
    <div onClick={onClick} className={itemClass}>
      {icon}
      <IonLabel className="font-medium uppercase text-xl">{label}</IonLabel>
      <IonRippleEffect/>
    </div>
  )
}

export default ItemMenu