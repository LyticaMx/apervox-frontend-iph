import { IonAlert } from "@ionic/react";

const Confirm = ({ open, ...props }) => {
  console.log("🚀 ~ file: Confrim.tsx:4 ~ Confirm ~ open:", open)
  return (
    <IonAlert
      {...props}
      isOpen={open}
      buttons={[
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
      ]}
      onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
    />
  )
}

export default Confirm