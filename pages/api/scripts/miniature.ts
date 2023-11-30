// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {getMiniatures, updateMiniatureByDefId} from '@/models/miniature';
import type {NextApiRequest, NextApiResponse} from 'next';

type Data = {
    name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'GET') {
        // let newMiniature = req.body;

        // let updated = await updateMiniatureByDefId(newMiniature);

        let traits = <any>[];
        let globalTraits = <any>{};
        const miniatures = await getMiniatures();

        for (const miniature of miniatures) {
            for (const trait of miniature.traits) {
                if (!traits.some((e: any) => e.name === trait.name.en)) {
                    let newTrait = <any>{name: trait.name.en};
                    globalTraits[`${trait.name.en.toLowerCase().replace(' ', '_')}`] = {
                        title: trait.name.en,
                        value: trait.value.en,
                        urlImg: trait.urlImg,
                    };
                    traits.push(newTrait);
                }
            }
        }

        return res.status(200).json(globalTraits);
    }
    return res.status(200).json({name: 'John Doe'});
}
