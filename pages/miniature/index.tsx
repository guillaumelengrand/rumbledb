import MiniatureList from '@/components/miniature/miniatureList';
import {getMiniatures} from '@/models/miniature';
import {rumble_miniatures} from '@prisma/client';
import {GetServerSideProps} from 'next';
import Image from 'next/image';

interface MiniaturesProps {
    miniatures: rumble_miniatures[];
}
const Miniature = ({miniatures}: MiniaturesProps) => {
    console.log(miniatures);
    return (
        <>
            <MiniatureList miniatures={miniatures} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    let miniatures = await getMiniatures();

    return {
        props: {miniatures},
    };
};

export default Miniature;
