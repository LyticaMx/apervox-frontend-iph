import { IonApp, IonLabel, IonRouterOutlet, setupIonicReact, IonTabs, IonTabBar, IonTabButton, IonIcon  } from '@ionic/react';
import { cog, flash, list } from 'ionicons/icons';
import { StatusBar, Style } from '@capacitor/status-bar';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import Feed from './pages/Feed';
import Lists from './pages/Lists';
import ListDetail from './pages/ListDetail';
import Settings from './pages/Settings';
import Tabs from './pages/Tabs';
import Notifications from './pages/notifications';
import Notification from './pages/notification';
import Note from './pages/note';
import Case from './pages/case';
import Arrested from './pages/arrested';
import Witness from './pages/witness';
import Place from './pages/place';
import Evidence from './pages/evidence';
import Support from './pages/support';
import { useEffect } from 'react';
import { useAuth } from '@/context/Auth';

setupIonicReact({});

window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
  try {
    await StatusBar.setStyle({
      style: status.matches ? Style.Dark : Style.Light,
    });
  } catch {}
});

const AppShell = () => {
  const {actions} = useAuth()

  useEffect(() => {
    actions.signIn()
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/tabs" render={() => <Tabs />} />
          <Route path="/notifications" render={() => <Notifications />} />
          <Route path="/notification" render={() => <Notification />} />
          <Route path="/nota-rapida" render={() => <Note />} />
          <Route path="/case" render={() => <Case />} />
          <Route path="/arrested" render={() => <Arrested />} />
          <Route path="/witness" render={() => <Witness />} />
          <Route path="/place" render={() => <Place />} />
          <Route path="/evidence" render={() => <Evidence />} />
          <Route path="/support" render={() => <Support />} />
          <Route path="/" render={() => <Redirect to="/notifications" />} exact={true} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
