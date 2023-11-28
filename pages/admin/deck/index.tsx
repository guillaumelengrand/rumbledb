import { getDecks } from '@/models/deck';
import { Button } from '@nextui-org/react';
import { rumble_deck } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

interface DeckAdminProps {
    decks: rumble_deck[]
}
const DeckAdmin = ({decks} : DeckAdminProps) => {
    return (
        <div className='flex flex-col gap-1 m-2'>
            <Button><Link href={'/admin/deck/new'}>Create</Link></Button>
            {decks && decks.map(deck => <Link href={`/admin/deck/${deck.id}`} key={deck.id}>{deck.name}</Link>)}
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let decks = await getDecks()

    return {
        props:{
            decks
        }
    }
}

export default DeckAdmin