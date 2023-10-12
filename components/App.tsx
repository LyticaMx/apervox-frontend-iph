import { IonApp, IonRouterOutlet, setupIonicReact, IonLoading  } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';

import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

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
import Home from './pages/home';
import Cases from './pages/cases';
import { useLoader } from '@/context/Loader';
import Summary from './pages/summary';

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
  const {show} = useLoader()

  useEffect(() => {
    actions.signIn()
  }, [])

  return (
    <IonApp>
      <IonLoading isOpen={show} />
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/tabs" render={() => <Tabs />} />
          <Route path="/notifications" render={() => <Notifications />} />
          <Route path="/notification" render={() => <Notification />} />
          <Route path="/case" render={() => <Case />} />
          <Route path="/cases" render={() => <Cases />} />
          <Route path="/nota-rapida" render={() => <Note />} />
          <Route path="/arrested" render={() => <Arrested />} />
          <Route path="/witness" render={() => <Witness />} />
          <Route path="/place" render={() => <Place />} />
          <Route path="/evidence" render={() => <Evidence />} />
          <Route path="/support" render={() => <Support />} />
          <Route path="/summary" render={() => <Summary />} />
          <Route path="/" render={() => <Home />} exact={true} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
