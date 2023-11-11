import Image from 'next/image';
import {Inter} from 'next/font/google';

const inter = Inter({subsets: ['latin']});

export default function Home() {
    return (
        <main className={`flex flex-row items-center justify-center h-[90vh]`}>
            <h1 className="text-3xl">Warcraft Rumble DB</h1>
        </main>
    );
}
