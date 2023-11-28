// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {createDeck, updateDeck} from '@/models/deck';
import type {NextApiRequest, NextApiResponse} from 'next';

type Data = {
    msg: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        let newDeck = req.body;

        // console.log({newDeck});

        try {
            let miniatures = newDeck.miniatures;
            delete newDeck.id;
            delete newDeck.miniatures;

            let created = await createDeck(newDeck);
            let updated = await updateDeck({
                ...created,
                miniatures: {
                    set: [
                        ...miniatures.map((m: any) => {
                            return {id: m.id};
                        }),
                    ],
                },
            });

            return res.status(200).json(updated);
        } catch (error: any) {
            console.log(error);

            return res.status(400).json(error);
        }
    }
    return res.status(400).json({msg: 'Method not allow'});
}
