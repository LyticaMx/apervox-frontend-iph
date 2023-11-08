import { navigate, time } from 'ionicons/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Geolocation } from '@capacitor/geolocation';
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
import { useLayoutEffect, useMemo, useState } from 'react';
import { useWillMount } from '@/hooks/useWillMount';
import { useHistory } from 'react-router';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

// const ALLOWED_DISTANCE = 0.05 // 50 metros
const ALLOWED_DISTANCE = 1

const Notification = () => {
  const history = useHistory();
  const { notification, notificationResponse, actions } = useNotifications();
  const [renderMap, setRenderMap] = useState(false);
  const [coordinates, setCoordinates] = useState({latitude: 0, longitude: 0});

  const STATUS = useMemo(() => {
    if(!notificationResponse) return 'CREATED'

    return notificationResponse.status
  }, [notificationResponse])
  
  const DISTANCE = useMemo(() => haversineDistance([notification?.longitude, notification?.latitude], [coordinates.longitude, coordinates.latitude]), [notification, coordinates])

  const position: LatLngExpression = [notification?.latitude ?? 0, notification?.longitude ?? 0];

  const handleOnSite = async () => {
      await actions.changeStatus('RESOLVED')
      history.push('/case')
  }

  const getCurrentPosition = async () => {
    const { coords: { longitude, latitude } } = await Geolocation.getCurrentPosition();

    setCoordinates({ latitude, longitude })
  };


  function haversineDistance(coords1, coords2) {
    function toRad(x) {
      return x * Math.PI / 180;
    }
  
    var lon1 = coords1[0];
    var lat1 = coords1[1];
  
    var lon2 = coords2[0];
    var lat2 = coords2[1];
  
    var R = 6371; // km
  
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
  
    return d;
  }

  useWillMount(() => {
    if (!notification || STATUS === 'RESOLVED') {
      history.goBack();
    }
  });

  useLayoutEffect(() => {
    getCurrentPosition()
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
        {STATUS === 'CREATED'  ? (
          <div className="space-y-1.5">
            <IonButton expand="block" color="medium">
              Atender más tarde
            </IonButton>
            <IonButton expand="block" onClick={() => actions.changeStatus('PENDING')}>
              Voy en camino
            </IonButton>
          </div>
        ) : (
          <div className="space-y-1.5">
            <IonButton expand="block" color="medium">
              Me retiro
            </IonButton>
            {/* <IonButton expand="block" onClick={handleOnSite} disabled={DISTANCE > ALLOWED_DISTANCE}> */}
            <IonButton expand="block" onClick={handleOnSite}>
              Estoy en sitio
            </IonButton>
          </div>
        )}
      </IonFooter>
    </IonPage>
  );
};

export default Notification;
