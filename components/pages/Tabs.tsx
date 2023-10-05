import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cog, flash, list, document } from 'ionicons/icons';
import { PushNotifications } from '@capacitor/push-notifications';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import Home from './Feed';
import Audios from './Audios';
import Lists from './Lists';
import ListDetail from './ListDetail';
import Settings from './Settings';
import Operators from './Operators';
import { ActivityDetail } from './ActivityDetail';
import Case from './case';
const Tabs = () => {
  // let history = useHistory();

  // useEffect(() => {
  //   // registerNotifications();
  // }, []);

  // const redirect = url => {
  //   if (url.notification.data.urlRedirect) {
  //     history.push(url.notification.data.urlRedirect);
  //   }
  // };

  // const registerNotifications = async () => {
  //   let permStatus = await PushNotifications.checkPermissions();

  //   if (permStatus.receive === 'prompt') {
  //     permStatus = await PushNotifications.requestPermissions();
  //   }

  //   if (permStatus.receive !== 'granted') {
  //     throw new Error('User denied permissions!');
  //   }

  //   await PushNotifications.register();
  //   addListeners();
  // };

  // const addListeners = async () => {
  //   await PushNotifications.addListener('registration', token => {
  //     console.info('Registration token: ', token.value);
  //   });

  //   await PushNotifications.addListener('registrationError', err => {
  //     console.error('Registration error: ', err.error);
  //   });

  //   await PushNotifications.addListener('pushNotificationReceived', notification => {
  //     console.log('Push notification received: ', notification);
  //   });

  //   await PushNotifications.addListener('pushNotificationActionPerformed', (notification: any) => {
  //     redirect(notification);
  //   });
  // };

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/feed" render={() => <Home />} exact={true} />
        <Route path="/tabs/audios" render={() => <Audios />} exact={true} />
        <Route path="/tabs/lists" render={() => <Lists />} exact={true} />
        <Route path="/tabs/lists/:listId" render={() => <ListDetail />} exact={true} />
        <Route path="/tabs/settings" render={() => <Settings />} exact={true} />
        <Route path="/tabs/operators" render={() => <Operators />} exact={true} />
        <Route path="/tabs/ActivityDetail" render={() => <ActivityDetail />} exact={true} />
        <Route path="/tabs/cases" render={() => <Case />} exact={true} />
        <Route path="/tabs" render={() => <Redirect to="/tabs/feed" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/feed">
          <IonIcon icon={flash} />
          <IonLabel>Feed</IonLabel>
        </IonTabButton>
        <IonTabButton tab="audios" href="/tabs/audios">
          <IonIcon icon={document} />
          <IonLabel>Audios</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/lists">
          <IonIcon icon={list} />
          <IonLabel>Lists</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/settings">
          <IonIcon icon={cog} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/tabs/ActivityDetail">
          <IonIcon icon={cog} />
          <IonLabel>Operators</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
