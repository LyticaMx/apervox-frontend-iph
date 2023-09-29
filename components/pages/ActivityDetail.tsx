import React from 'react';
import { navigate, time } from 'ionicons/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonIcon,
  IonCard,
  IonCardContent,
} from '@ionic/react';

export const ActivityDetail = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Posible robo de autopartes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Posible robo de autopartes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p>
          Se ha reportado el posible robo de un espejo lateral perteneciente a un auto modelo KIA
          Rio. en el sitio se encuentra el propietario del automóvil.
        </p>
        <div className="mt-2 flex items-center text-sm">
          <IonIcon icon={time} />
          Se reportó a las <strong> 9:12 p.m.</strong>
        </div>
        <div className="mt-2 flex items-center text-sm">
          <IonIcon icon={navigate} />
          Av. 1era. de Mayo y Tlalpan
        </div>
        <div className="mt-2"></div>
        <IonCard>
          <IonCardContent>
            <MapContainer center={[51.505, -0.091]} zoom={13} style={{ height: '500px' }}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.091]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </IonCardContent>
        </IonCard>
        <IonButton expand="full" color="medium">
          Atender más tarde
        </IonButton>
        <IonButton expand="full">Voy en camino</IonButton>
      </IonContent>
    </IonPage>
  );
};
