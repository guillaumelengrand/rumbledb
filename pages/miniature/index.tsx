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
        <div className="flex flex-wrap">
            {miniatures &&
                miniatures.map((minia: any) => {
                    return (
                        <div key={minia.defId} className="flex flex-col gap-1 w-1/6">
                            <Image src={minia.img} width={200} height={400} alt={minia.name} />
                            <div>{minia.name}</div>
                        </div>
                    );
                })}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    let miniatures = await getMiniatures();

    return {
        props: {miniatures},
    };
};

export default Miniature;
