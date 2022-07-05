import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req;

    if (method == 'GET') {
        return res.writeHead(301, { Location: `${process.env.URL_PASESHOW}#/pago-error`}).end();
    }

    if (method == 'OPTIONS') {
        return res.json('token');
    }
}
