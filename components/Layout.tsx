import Head from 'next/head';
import Header from './header';
import {ReactNode} from 'react';

interface LayoutProps {
    children: ReactNode;
    pageName?: String;
}

export default function Layout({children, pageName = 'Marvel Snap DB'}: LayoutProps) {
    return (
        <>
            <Head>
                <title>{pageName}</title>
                <meta name="description" content="Marvel Snap DB viewer" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="pt-[10vh]">{children}</div>
        </>
    );
}
