import type { NextApiRequest, NextApiResponse } from 'next'
import { HttpService } from '../../service/http.service';
import { HttpPaseshow } from '../../service/httpPaseshowService';
import { HttpPaseshowServiceImpl } from '../../service/implements/httpPaseshowServiceImpl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let httpPaseshow = new HttpPaseshow(new HttpPaseshowServiceImpl(new HttpService));

    const { method } = req;
    const { query } = req;

    if(method == 'GET') {
        if(query.token) {
            let token = query.token as string;
            let eventos = await httpPaseshow.eventos(token);
            return res.status(200).json(eventos);
        }
    }
}
