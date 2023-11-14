import {Button, Input, Textarea} from '@nextui-org/react';
import {Select, SelectItem} from '@nextui-org/react';
import {rumble_miniatures} from '@prisma/client';
import {JsonValue} from '@prisma/client/runtime/library';

// let families = ['Alliance', 'Horde', 'Blackrock', 'Beast', 'Undead'];

interface MiniatureFormProps {
    miniature: rumble_miniatures;
    setMiniature: (miniature: rumble_miniatures) => void;
    families: LocaleJson[];
    roles: LocaleJson[];
    types: LocaleJson[];
    locale?: string;
    className?: string;
}
const MiniatureForm = ({
    miniature,
    setMiniature,
    families,
    roles,
    types,
    locale = 'en',
    className,
}: MiniatureFormProps) => {
    return (
        <form className={`${className} flex flex-col gap-1 px-1`}>
            <Input
                label="Miniature Name"
                value={
                    locale === 'fr'
                        ? (miniature.name as unknown as LocaleJson).fr
                        : (miniature.name as unknown as LocaleJson).en
                }
                onChange={e => {
                    let newName = {...(miniature.name as unknown as LocaleJson)};
                    if (locale === 'fr') newName.fr = e.target.value;
                    else newName.en = e.target.value;
                    setMiniature({...miniature, name: newName});
                }}
            />
            <Textarea
                label="Description"
                value={
                    locale === 'fr'
                        ? (miniature.description as unknown as LocaleJson).fr
                        : (miniature.description as unknown as LocaleJson).en
                }
                onChange={e => {
                    if (locale === 'fr') {
                        setMiniature({
                            ...miniature,
                            description: {...(miniature.description as unknown as LocaleJson), fr: e.target.value},
                        });
                    } else {
                        setMiniature({
                            ...miniature,
                            description: {...(miniature.description as unknown as LocaleJson), en: e.target.value},
                        });
                    }
                }}
            />

            {(miniature.category as unknown as LocaleJson).en === 'leader' && (
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl">Leader Ability</h2>
                    <Input
                        label="name"
                        value={
                            locale === 'fr'
                                ? (miniature.leaderAbility as unknown as LeaderAbilityJson).name.fr
                                : (miniature.leaderAbility as unknown as LeaderAbilityJson).name.en
                        }
                        onChange={e => {
                            let newLeaderAbility = {...(miniature.leaderAbility as unknown as LeaderAbilityJson)};
                            if (locale === 'fr') {
                                (miniature.leaderAbility as unknown as LeaderAbilityJson).name.fr = e.target.value;
                            } else {
                                (miniature.leaderAbility as unknown as LeaderAbilityJson).name.en = e.target.value;
                            }
                            setMiniature({...miniature, leaderAbility: newLeaderAbility as unknown as JsonValue});
                        }}
                    />
                    <Textarea
                        label="Description"
                        value={
                            locale === 'fr'
                                ? (miniature.leaderAbility as unknown as LeaderAbilityJson).description.fr
                                : (miniature.leaderAbility as unknown as LeaderAbilityJson).description.en
                        }
                        onChange={e => {
                            let newLeaderAbility = {...(miniature.leaderAbility as unknown as LeaderAbilityJson)};
                            if (locale === 'fr') {
                                (miniature.leaderAbility as unknown as LeaderAbilityJson).description.fr =
                                    e.target.value;
                            } else {
                                (miniature.leaderAbility as unknown as LeaderAbilityJson).description.en =
                                    e.target.value;
                            }
                            setMiniature({...miniature, leaderAbility: newLeaderAbility as unknown as JsonValue});
                        }}
                    />
                </div>
            )}
            <h2 className="text-xl">Traits</h2>
            {(miniature.traits as unknown as MiniatureTrait[])?.map((trait: MiniatureTrait, index: number) => (
                <div key={trait.name.en}>
                    <Input
                        label="name"
                        value={locale === 'fr' ? trait.name.fr : trait.name.en}
                        onChange={e => {
                            let newTraits = [...(miniature.traits as unknown as MiniatureTalent[])];
                            if (locale === 'fr') newTraits[index].name.fr = e.target.value;
                            else newTraits[index].name.en = e.target.value;
                            setMiniature({...miniature, traits: newTraits as unknown as JsonValue});
                        }}
                    />
                    <Textarea
                        label="Desc"
                        value={locale === 'fr' ? trait.value.fr : trait.value.en}
                        onChange={e => {
                            let newTraits = [...(miniature.traits as unknown as MiniatureTalent[])];
                            if (locale === 'fr') newTraits[index].value.fr = e.target.value;
                            else newTraits[index].value.en = e.target.value;
                            setMiniature({...miniature, traits: newTraits as unknown as JsonValue});
                        }}
                    />
                </div>
            ))}
            <h2 className="text-xl">Talents</h2>
            {(miniature.talents as unknown as MiniatureTalent[])?.map((talent: MiniatureTalent, index: number) => (
                <div key={talent.name.en}>
                    <Input
                        label="name"
                        value={locale === 'fr' ? talent.name.fr : talent.name.en}
                        onChange={e => {
                            let newTalents = [...(miniature.talents as unknown as MiniatureTalent[])];
                            if (locale === 'fr') newTalents[index].name.fr = e.target.value;
                            else newTalents[index].name.en = e.target.value;
                            setMiniature({...miniature, talents: newTalents as unknown as JsonValue});
                        }}
                    />
                    <Textarea
                        label="Desc"
                        value={locale === 'fr' ? talent.value.fr : talent.value.en}
                        onChange={e => {
                            let newTalents = [...(miniature.talents as unknown as MiniatureTalent[])];
                            if (locale === 'fr') newTalents[index].value.fr = e.target.value;
                            else newTalents[index].value.en = e.target.value;
                            setMiniature({...miniature, talents: newTalents as unknown as JsonValue});
                        }}
                    />
                </div>
            ))}
            {locale === 'en' && (
                <>
                    <Select
                        label="Family"
                        placeholder="Select a family"
                        className="max-w-xs text-black"
                        selectedKeys={[(miniature.family as unknown as LocaleJson).en]}
                        onChange={e => {
                            let value = e.target.value;
                            let newFamily = null;

                            for (const family of families) {
                                if (family.en === value) newFamily = family;
                            }
                            if (!newFamily) newFamily = miniature.family;
                            setMiniature({
                                ...miniature,
                                family: newFamily as JsonValue,
                            });
                        }}
                    >
                        {families.map(family => (
                            <SelectItem className="text-black" key={family.en} value={family.en}>
                                {family.en}
                            </SelectItem>
                        ))}
                    </Select>

                    <Select
                        label="Type"
                        placeholder="Select a family"
                        className="max-w-xs text-black"
                        selectedKeys={[(miniature.type as unknown as LocaleJson).en]}
                        onChange={e => {
                            let value = e.target.value;
                            let newType = null;

                            for (const type of types) {
                                if (type.en === value) newType = type;
                            }
                            if (!newType) newType = miniature.type;
                            setMiniature({
                                ...miniature,
                                type: newType as JsonValue,
                            });
                        }}
                    >
                        {types.map(type => (
                            <SelectItem className="text-black" key={type.en} value={type.en}>
                                {type.en}
                            </SelectItem>
                        ))}
                    </Select>

                    <Select
                        label="Role"
                        placeholder="Select a family"
                        className="max-w-xs text-black"
                        selectedKeys={[(miniature.role as unknown as LocaleJson).en]}
                        onChange={e => {
                            let value = e.target.value;
                            let newRole = null;

                            for (const role of roles) {
                                if (role.en === value) newRole = role;
                            }
                            if (!newRole) newRole = miniature.role;

                            setMiniature({
                                ...miniature,
                                role: newRole as JsonValue,
                            });
                        }}
                    >
                        {roles.map(role => (
                            <SelectItem className="text-black" key={role.en}>
                                {role.en}
                            </SelectItem>
                        ))}
                    </Select>
                </>
            )}
        </form>
    );
};

export default MiniatureForm;
