import { getDecks } from '@/models/deck';
import { rumble_deck } from '@prisma/client';
import { GetServerSideProps } from 'next';

interface DecksIndexProps {
    decks: rumble_deck[]
}

const DecksIndex = ({decks} : DecksIndexProps) => {
    return (
        <div>
            {decks && decks.map(deck => <div key={deck.id}>
                {deck.name}
            </div>)}
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

export default DecksIndex