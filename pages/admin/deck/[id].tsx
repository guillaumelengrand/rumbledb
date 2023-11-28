import { getDeck } from '@/models/deck';
import { Prisma, rumble_deck, rumble_miniatures } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

interface DeckAdminIndexProps {
    deck: Prisma.rumble_deckGetPayload<{include: {miniatures: true}}>
}
const DeckAdminIndex = ({deck} : DeckAdminIndexProps) => {
    return (
        <div>
            <h1>{deck.name}</h1>

            <div className='flex flex-wrap'>
                {deck.miniatures && deck.miniatures.map((m: rumble_miniatures) => <div key={m.id}><Image src={(m.images as unknown as MiniatureImages).portrait} width="200" height="200" alt={(m.name as unknown as LocaleJson).en} /></div>)}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let id = ctx.query.id;
    if (!id || typeof id != 'string') {
        return {notFound: true}
    }
    let deck = await getDeck(id)

    return {
        props:{
            deck
        }
    }
}

export default DeckAdminIndex