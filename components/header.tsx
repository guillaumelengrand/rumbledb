import {signIn, signOut, useSession} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    const {data: session} = useSession();
    return (
        <div className="flex flex-row justify-between px-2 items-center h-[10vh] py-2 bg-gray-800 w-full z-50">
            <Link href={'/'} className="w-20">
                <Image src={'/rumble_logo.webp'} width={200} height={200} alt="logo" priority={true} />
            </Link>
            {/* <h1>Marvel Snap DB</h1> */}
            <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2 font-bold">
                    <Link href={'/miniature'}>Miniature</Link>
                    <Link href={'/decks'}>Deck</Link>
                </div>

                <div className="flex flex-row gap-2 font-bold">
                    <Link href={'/admin'}>Admin</Link>
                </div>
            </div>

            <div>
                {session ? (
                    <>
                        Signed in as {session?.user?.email} <br />
                        <button onClick={() => signOut()}>Sign out</button>
                    </>
                ) : (
                    <>
                        <button className="button" onClick={() => signIn()}>
                            Sign in
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
