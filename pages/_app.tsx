import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type {AppProps} from 'next/app';
import {SessionProvider} from 'next-auth/react';
import Layout from '@/components/Layout';
import {NextUIProvider} from '@nextui-org/react';

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
    return (
        <SessionProvider session={session}>
            <NextUIProvider>
                <Layout pageName={pageProps.pageName ? pageProps.pageName : 'Warcraft Rumble DB'}>
                    <Component {...pageProps} />
                </Layout>
            </NextUIProvider>
        </SessionProvider>
    );
}
