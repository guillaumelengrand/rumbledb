import {rumble_miniatures} from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface MiniatureListProps {
    miniatures: rumble_miniatures[];
    mode?: string;
}

const MiniatureList = ({miniatures, mode = 'client'}: MiniatureListProps) => {
    let baseUrl = mode === 'client' ? '' : '/admin/miniature';
    return (
        <div className="flex flex-wrap">
            {miniatures &&
                miniatures.map((minia: any) => {
                    return (
                        <Link
                            href={`${baseUrl}/${minia.defId}`}
                            key={minia.defId}
                            className="flex flex-col gap-1 w-1/6"
                        >
                            <Image src={minia.img} width={200} height={400} alt={minia.name} />
                            <div>{(minia.name as unknown as LocaleJson).en}</div>
                        </Link>
                    );
                })}
        </div>
    );
};

export default MiniatureList;
