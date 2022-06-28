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

    if (query.token) {

        if (method == 'POST') {
            if (query.id && query.token && body.reservaId) {
                let jsonResponse = await httpPaseshow.create_preference(body.reservaId, +query.id, query.token.toString());
                return res.json(jsonResponse);
            }
        }

        if (method == 'OPTIONS') {
            return res.json('token');
        }

    } else return res.status(401).json({});

}
