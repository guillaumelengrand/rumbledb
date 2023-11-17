import {rumble_miniatures} from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';

interface MiniatureListProps {
    miniatures: rumble_miniatures[];
    mode?: string;
}

const MiniatureList = ({miniatures, mode = 'client'}: MiniatureListProps) => {
    let router = useRouter();
    let locale = router.locale ? router.locale : 'fr';
    let baseUrl = mode === 'client' ? '/miniature' : '/admin/miniature';
    return (
        <div className="flex flex-wrap mx-auto w-full xl:w-5/6">
            {miniatures &&
                miniatures.map((minia: rumble_miniatures) => {
                    return (
                        <Link
                            href={`${baseUrl}/${minia.defId}`}
                            key={minia.defId}
                            className="h-[30vh] w-1/2 p-2 sm:w-1/3 md:w-1/4 xl:w-1/6"
                        >
                            <div
                                className={`flex flex-col gap-1 items-center justify-between h-full opacity-60 hover:opacity-100 rounded p-2 font-bold text-lg hover:text-white relative ${
                                    (minia.family as unknown as LocaleJson).en === 'Alliance'
                                        ? 'bg-blue-600'
                                        : (minia.family as unknown as LocaleJson).en === 'Horde'
                                        ? 'bg-red-700'
                                        : (minia.family as unknown as LocaleJson).en === 'Beast'
                                        ? 'bg-yellow-600'
                                        : (minia.family as unknown as LocaleJson).en === 'Blackrock'
                                        ? 'bg-gray-600'
                                        : 'bg-violet-600'
                                }`}
                            >
                                <div className="absolute top-2 left-2">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={`/${(minia.family as unknown as LocaleJson).en}.svg`}
                                        className="w-1/4 bg-slate-200 rounded-full p-1"
                                        alt={`${(minia.family as unknown as LocaleJson).en}`}
                                    />
                                </div>
                                <div className="absolute top-2 right-2 bg-yellow-500 rounded-full px-2">
                                    {minia.cost}
                                </div>
                                <div></div>

                                <Image
                                    src={(minia.images as unknown as MiniatureImages).portrait}
                                    width={200}
                                    height={400}
                                    className="rounded-full bg-black border-[3px] border-black shadow-slate-950 shadow-xl h-[20vh] w-[20vh]"
                                    alt={(minia.name as unknown as LocaleJson).en}
                                />

                                <div className="text-center">
                                    {locale === 'fr' && (minia.name as unknown as LocaleJson).fr != ''
                                        ? (minia.name as unknown as LocaleJson).fr
                                        : (minia.name as unknown as LocaleJson).en}
                                </div>
                            </div>
                        </Link>
                    );
                })}
        </div>
    );
};

export default MiniatureList;
