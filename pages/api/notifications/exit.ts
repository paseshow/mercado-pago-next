import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req;

    if (method == 'GET') {
        return res.writeHead(301, { Location: `${process.env.URL_PASESHOW}#/pago-exito`}).end();
    }

    if (method == 'OPTIONS') {
        return res.json('token');
    }
}
