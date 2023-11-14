// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {updateMiniatureByDefId} from '@/models/miniature';
import type {NextApiRequest, NextApiResponse} from 'next';

type Data = {
    name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'PUT') {
        let newMiniature = req.body;

        let updated = await updateMiniatureByDefId(newMiniature);

        return res.status(200).json(updated);
    }
    return res.status(200).json({name: 'John Doe'});
}
