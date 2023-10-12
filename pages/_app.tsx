import Head from 'next/head';
import Script from 'next/script';
import { setupIonicReact } from '@ionic/react';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import { AuthProvider } from '@/context/Auth';
import { NotificationsProvider } from '@/context/Notifications';
import { CaseProvider } from '@/context/Case';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '../styles/global.css';
import '../styles/variables.css';
import { CasesProvider } from '@/context/Cases';
import { LoaderProvider } from '@/context/Loader/LoaderProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        ></meta>
        <meta name="color-scheme" content="light" />
      </Head>
      <ApolloProvider client={client}>
        <LoaderProvider>
          <AuthProvider>
            <NotificationsProvider>
              <CaseProvider>
                <CasesProvider>
                  <Component {...pageProps} />
                </CasesProvider>
              </CaseProvider>
            </NotificationsProvider>
          </AuthProvider>
        </LoaderProvider>
      </ApolloProvider>
      <Script
        type="module"
        src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.esm.js"
      ></Script>
      {/* <Script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.js"></Script> */}
    </>
  );
}

export default MyApp;
