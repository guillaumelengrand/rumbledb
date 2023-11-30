import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type {AppProps} from 'next/app';
import {SessionProvider} from 'next-auth/react';
import Layout from '@/components/Layout';
import {NextUIProvider} from '@nextui-org/react';
import {NextIntlClientProvider} from 'next-intl';
import {useRouter} from 'next/router';

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
    const router = useRouter();
    return (
        <SessionProvider session={session}>
            <NextIntlClientProvider locale={router.locale} timeZone="Europe/Paris" messages={pageProps.messages}>
                <NextUIProvider>
                    <Layout pageName={pageProps.pageName ? pageProps.pageName : 'Warcraft Rumble DB'}>
                        <Component {...pageProps} />
                    </Layout>
                </NextUIProvider>
            </NextIntlClientProvider>
        </SessionProvider>
    );
}
