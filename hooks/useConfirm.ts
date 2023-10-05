import { useIonAlert } from "@ionic/react";

export const useConfirm = () => {
    const [confirm, dismiss] = useIonAlert()

    return (message: string) => confirm(message, [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Alert confirmed');
          },
        },
      ])
    
}