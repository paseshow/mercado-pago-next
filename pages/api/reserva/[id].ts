import type { NextApiRequest, NextApiResponse } from 'next'
import { ReservaRepositoryImpl } from '../../repository/implements/ReservaRepositoryImpl';
import { ReservaServiceImpl } from '../../service/implements/ReservaServiceImpl';

import { Reserva } from '../../service/reservaService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let reservaService = new Reserva(new ReservaServiceImpl(new ReservaRepositoryImpl));

    const { method } = req;
    const { query } = req;
    const { body } = req;

    if (query.token) {

        if (method == 'GET') {
            if (query.id) {

                if (!!body.clienteDni) {
                    console.log(query.id);
                    return res.json(await reservaService.findByClienteDni(+body.clienteDni, +query.id));
                }
                console.log(query.id);
                return res.json(await reservaService.findByReservaId(+query.id));
            }
        }

        if (method == 'OPTIONS') {
            return res.json('token');
        }

    } else return res.status(401).json({});
}
