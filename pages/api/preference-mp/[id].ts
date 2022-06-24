import type { NextApiRequest, NextApiResponse } from 'next'
import { HttpService } from '../../service/http.service';
import { HttpPaseshowServiceImpl } from '../../service/implements/httpPaseshowServiceImpl';
import { PreferenceServiceImpl } from '../../service/implements/preferenceServiceImpl';
import { PreferenceMp } from '../../service/preferenceService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let httpPaseshow = new PreferenceMp(new PreferenceServiceImpl(new HttpPaseshowServiceImpl(new HttpService)));

    const { method } = req;
    const { query } = req;
    const body = req.body as any;

    if (method == 'GET') {
        if (query.id && query.token && body.reservaId) {

            let jsonResponse = await httpPaseshow.create_prefernece(body.reservaId, +query.id, query.token.toString());
            return res.status(200).json(jsonResponse);
        }
    }
    // res.status(200).json(req.body.reservaId)
}
