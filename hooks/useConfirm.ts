import { useIonAlert } from '@ionic/react';

export const useConfirm = () => {
  const [confirm, dismiss] = useIonAlert();

  return (message: string, onOk: () => void) =>
    confirm(message, [
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
        handler: onOk,
      },
    ]);
};
