import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req;

    if (method == 'GET') {
        return res.json({
            status: 'ok'
        });
    }
}
