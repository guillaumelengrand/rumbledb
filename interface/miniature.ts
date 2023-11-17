interface LocaleJson {
    en: string;
    fr: string;
}

interface LeaderAbilityJson {
    name: LocaleJson;
    description: LocaleJson;
}

interface MiniatureStat {
    name: string;
    value: string;
}

interface MiniatureTrait {
    name: LocaleJson;
    value: LocaleJson;
    urlImg: string;
}

interface MiniatureTalent {
    name: LocaleJson;
    value: LocaleJson;
    urlImg: string;
}

interface MiniatureImages {
    statue: string;
    indicator: string;
    portrait: string;
}
