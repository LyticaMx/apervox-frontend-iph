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
  IonFooter,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import { useNotifications } from '@/context/Notifications';
import { Icon, LatLngExpression } from 'leaflet';
import { useLayoutEffect, useState } from 'react';
import { useWillMount } from '@/hooks/useWillMount';
import { useHistory } from 'react-router';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

const Notification = () => {
  const history = useHistory();
  const { notification } = useNotifications();
  const [status, setStatus] = useState(false);

  useWillMount(() => {
    if (!notification) {
      history.goBack();
    }
  });
  const position: LatLngExpression = [notification?.latitude ?? 0, notification?.longitude ?? 0];

  const [renderMap, setRenderMap] = useState(false);
  useLayoutEffect(() => {
    setTimeout(() => setRenderMap(true), 100);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="/notifications"></IonBackButton>
          </IonButtons>
          <IonTitle>{notification?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <div className="flex flex-col h-full">
          <section className="flex flex-col gap-3">
            <p>{notification?.description}</p>
            <div className="flex items-center text-sm gap-2">
              <IonIcon className="w-5 h-5" icon={time} />
              <span>
                Se reportó a las <strong> 9:12 p.m.</strong>
              </span>
            </div>
            <div className="flex items-center text-sm gap-2">
              <IonIcon className="w-5 h-5" icon={navigate} />
              <span>Av. 1era. de Mayo y Tlalpan</span>
            </div>
          </section>

          <div className="mt-auto">
            {renderMap ? (
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: '50vh' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={position}
                  icon={
                    new Icon({
                      iconUrl: markerIconPng.src,
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                    })
                  }
                >
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            ) : null}
          </div>
        </div>
      </IonContent>
      <IonFooter className="ion-padding">
        {!status ? (
          <div className="space-y-1.5">
            <IonButton expand="block" color="medium">
              {' '}
              Atender más tarde{' '}
            </IonButton>
            <IonButton expand="block" onClick={() => setStatus(true)}>
              Voy en camino
            </IonButton>
          </div>
        ) : (
          <div className="space-y-1.5">
            <IonButton expand="block" color="medium">
              {' '}
              Me retiro{' '}
            </IonButton>
            <IonButton expand="block" onClick={() => history.push('nota-rapida')}>
              Estoy en sitio
            </IonButton>
          </div>
        )}
      </IonFooter>
    </IonPage>
  );
};

export default Notification;
