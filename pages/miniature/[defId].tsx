import {getMiniatureByDefId} from '@/models/miniature';
import {rumble_miniatures} from '@prisma/client';
import {GetServerSideProps} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';

interface MiniatureByDefIdProps {
    miniature: rumble_miniatures;
}

const MiniatureByDefId = ({miniature}: MiniatureByDefIdProps) => {
    const router = useRouter();
    let locale = router.locale ? router.locale : 'fr';

    console.log({locale});

    return (
        <main className="w-5/6 mx-auto flex flex-col gap-1 p-6">
            <div className="flex flex-row items-center justify-between gap-2 bg-blue-950 p-2 rounded-md">
                <div className="flex flex-row items-center gap-2">
                    <Image
                        src={(miniature.images as unknown as MiniatureImages).indicator}
                        width={400}
                        height={400}
                        className="rounded-full bg-white border-black border-[5px] shadow-slate-950 shadow-xl h-[20vh] w-[20vh]"
                        alt={(miniature.name as unknown as LocaleJson).en}
                    />
                    <div>
                        <div className="flex flex-row gap-4 items-center justify-center">
                            <Link href={`/admin/miniature/${miniature.defId}`}>
                                <h1 className="text-3xl font-extrabold">
                                    {locale === 'en'
                                        ? (miniature.name as unknown as LocaleJson).en
                                        : (miniature.name as unknown as LocaleJson).fr != ''
                                        ? (miniature.name as unknown as LocaleJson).fr
                                        : (miniature.name as unknown as LocaleJson).en}
                                </h1>
                            </Link>
                            <div className="bg-yellow-600 rounded-full px-2 ">{miniature.cost}</div>
                        </div>
                        <div className="px-2">
                            <div className="flex flex-row gap-1">
                                <div className="font-semibold">Family:</div>
                                <div>
                                    {locale === 'en'
                                        ? (miniature.family as unknown as LocaleJson).en
                                        : (miniature.family as unknown as LocaleJson).fr != ''
                                        ? (miniature.family as unknown as LocaleJson).fr
                                        : (miniature.family as unknown as LocaleJson).en}
                                </div>
                            </div>
                            <div className="flex flex-row gap-1">
                                <div className="font-semibold">Type:</div>
                                <div>
                                    {locale === 'en'
                                        ? (miniature.type as unknown as LocaleJson).en
                                        : (miniature.type as unknown as LocaleJson).fr != ''
                                        ? (miniature.type as unknown as LocaleJson).fr
                                        : (miniature.type as unknown as LocaleJson).en}
                                </div>
                            </div>
                            <div className="flex flex-row gap-1">
                                <div className="font-semibold">Role:</div>
                                <div>
                                    {locale === 'en'
                                        ? (miniature.role as unknown as LocaleJson).en
                                        : (miniature.role as unknown as LocaleJson).fr != ''
                                        ? (miniature.role as unknown as LocaleJson).fr
                                        : (miniature.role as unknown as LocaleJson).en}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-1/4 flex flex-col items-center">
                    <Image
                        src={(miniature.images as unknown as MiniatureImages).portrait}
                        width={200}
                        height={400}
                        className="rounded-full bg-black border-black border-[5px] shadow-slate-950 shadow-xl h-[20vh] w-[20vh]"
                        alt={(miniature.name as unknown as LocaleJson).en}
                    />
                </div>
            </div>

            {/** Stat Section */}
            <div className="flex flex-col gap-2 bg-blue-950 px-4 py-2 rounded-md">
                <h2 className="text-xl font-bold">Stats</h2>
                <div className="flex flex-wrap gap-2 px-2">
                    {(miniature.stats as unknown as MiniatureStat[]).map((stat: MiniatureStat) => (
                        <div className="flex flex-row gap-4 w-1/3" key={stat.name}>
                            {/* <div className="flex flex-col items-center justify-center w-1/12">
                                <Image
                                    src={stat.urlImg}
                                    width={100}
                                    height={100}
                                    alt={stat.name.en}
                                    className="w-[45%]"
                                />
                            </div> */}
                            <div className="flex flex-col justify-center w-11/12">
                                <div className="font-semibold">{stat.name}</div>
                                <div className="pl-2" dangerouslySetInnerHTML={{__html: stat.value}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/** Leader Ability Section */}
            {(miniature.category as unknown as LocaleJson).en === 'leader' && (
                <div className="flex flex-col gap-2 bg-blue-950 px-4 py-2 rounded-md">
                    <h2 className="text-xl font-bold">Leader Ability</h2>
                    <div className="flex flex-col gap-2 px-2">
                        <div className="flex flex-col">
                            <div className="font-semibold">
                                {locale === 'en'
                                    ? (miniature.leaderAbility as unknown as LeaderAbilityJson).name.en
                                    : (miniature.leaderAbility as unknown as LeaderAbilityJson).name.fr != ''
                                    ? (miniature.leaderAbility as unknown as LeaderAbilityJson).name.fr
                                    : (miniature.leaderAbility as unknown as LeaderAbilityJson).name.en}
                            </div>
                            <div
                                className="px-4"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        locale === 'en'
                                            ? (miniature.leaderAbility as unknown as LeaderAbilityJson).description.en
                                            : (miniature.leaderAbility as unknown as LeaderAbilityJson).description
                                                  .fr != ''
                                            ? (miniature.leaderAbility as unknown as LeaderAbilityJson).description.fr
                                            : (miniature.leaderAbility as unknown as LeaderAbilityJson).description.en,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {/** Traits and Talents Section */}
            <div className="flex flex-row gap-1">
                {/** Traits Section */}
                <div className="flex flex-col gap-2 bg-blue-950 px-4 py-2 rounded-md w-1/2">
                    <h2 className="text-xl font-bold">Traits</h2>
                    <div className="flex flex-col gap-2 px-2">
                        {(miniature.traits as unknown as MiniatureTrait[]).map((trait: MiniatureTrait) => (
                            <div className="flex flex-row gap-4" key={trait.name.en}>
                                <div className="flex flex-col items-center justify-center w-1/12">
                                    <Image
                                        src={trait.urlImg}
                                        width={100}
                                        height={100}
                                        alt={trait.name.en}
                                        className="w-[45%]"
                                    />
                                </div>
                                <div className="flex flex-col justify-center w-11/12">
                                    <div className="font-semibold">
                                        {locale === 'en'
                                            ? trait.name.en
                                            : trait.name.fr != ''
                                            ? trait.name.fr
                                            : trait.name.en}
                                    </div>
                                    <div
                                        className="pl-2"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                locale === 'en'
                                                    ? trait.value.en
                                                    : trait.value.fr != ''
                                                    ? trait.value.fr
                                                    : trait.value.en,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/** Talents Section */}
                <div className="flex flex-col gap-2 bg-blue-950 px-4 py-2 rounded-md w-1/2">
                    <h2 className="text-xl font-bold">Talents</h2>
                    <div className="flex flex-col gap-2 px-2">
                        {(miniature.talents as unknown as MiniatureTalent[]).map((trait: MiniatureTalent) => (
                            <div className="flex flex-row gap-4" key={trait.name.en}>
                                <div className="flex flex-col items-center w-1/12">
                                    <Image
                                        src={trait.urlImg}
                                        width={100}
                                        height={100}
                                        alt={trait.name.en}
                                        className="w-[90%]"
                                    />
                                </div>
                                <div className="flex flex-col justify-center w-11/12">
                                    <div className="font-semibold">
                                        {locale === 'en'
                                            ? trait.name.en
                                            : trait.name.fr != ''
                                            ? trait.name.fr
                                            : trait.name.en}
                                    </div>
                                    <div
                                        className="pl-2"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                locale === 'en'
                                                    ? trait.value.en
                                                    : trait.value.fr != ''
                                                    ? trait.value.fr
                                                    : trait.value.en,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    let {defId} = ctx.query;

    let miniature = defId && typeof defId === 'string' ? await getMiniatureByDefId(defId) : null;

    if (!miniature) return {notFound: true};
    return {
        props: {miniature},
    };
};

export default MiniatureByDefId;
