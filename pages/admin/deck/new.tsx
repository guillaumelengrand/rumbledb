import { fetchWrapper } from '@/lib/utils';
import { getMiniatures } from '@/models/miniature';
import { Button, Input } from '@nextui-org/react';
import { Prisma, rumble_deck, rumble_miniatures } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface NewDeckProps {
    miniatures: rumble_miniatures[]
}

const NewDeck = ({miniatures}: NewDeckProps) => {
    const router = useRouter()
    const [deck, setDeck] = useState<Prisma.rumble_deckGetPayload<{include: {miniatures: true}}>>({id: '', name: '', createdAt: new Date(), miniatures: []})
    const [leaderView, setLeaderView] = useState(true)

    const saveDeck = async () => {
        const res = await fetchWrapper('/api/deck', deck, 'POST');

        if (res.ok) {
            router.push('/admin/deck')
        }
    }
    return (
        <div className='overflow-hidden'>
            <div className='flex flex-row justify-center items-center gap-1'><Input type='text' value={deck.name} label='Name' onChange={(e) => setDeck({...deck, name: e.target.value})} />
            <Button onClick={saveDeck}>Save</Button></div>

            <div className='flex flex-wrap gap-1'>
                {deck.miniatures && deck.miniatures.map((m: rumble_miniatures) => <div key={m.id}>{(m.name as unknown as LocaleJson).en}</div>)}
            </div>

            {leaderView && <div className='flex flex-wrap overflow-y-auto'>
                {miniatures && miniatures.filter(m => (m.category as unknown as LocaleJson).en === 'leader').map(miniature => <div key={miniature.id} onClick={() => {
                    setDeck({...deck, miniatures: [...deck.miniatures, miniature]})
                    setLeaderView(false)
                }}>
                    <Image src={(miniature.images as unknown as MiniatureImages).portrait} alt={(miniature.name as unknown as LocaleJson).en} height={200} width={200} />
                    <div>{(miniature.name as unknown as LocaleJson).en}</div>
                </div>)}
            </div>}

            {!leaderView && <div className='flex flex-wrap overflow-y-auto'>
                {miniatures && miniatures.filter(m => (m.category as unknown as LocaleJson).en != 'leader').map(miniature => <div key={miniature.id} onClick={() => setDeck({...deck, miniatures: [...deck.miniatures, miniature]})}>
                    <Image src={(miniature.images as unknown as MiniatureImages).portrait} alt={(miniature.name as unknown as LocaleJson).en} height={200} width={200} />
                    <div>{(miniature.name as unknown as LocaleJson).en}</div>
                </div>)}
            </div>}
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const miniatures = await  getMiniatures()
    
    return {
        props:{
            miniatures
        }
    }
}

export default NewDeck