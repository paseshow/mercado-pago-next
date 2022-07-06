import type { NextApiRequest, NextApiResponse } from 'next'
import { ReservaRepositoryImpl } from '../../repository/implements/ReservaRepositoryImpl';
import { ReservaServiceImpl } from '../../service/implements/ReservaServiceImpl';
import { Reserva } from '../../service/reservaService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let reservaService = new Reserva(new ReservaServiceImpl(new ReservaRepositoryImpl));

    const { method } = req;
    const { body } = req;
    const { query } = req;

    if (query.token) {

        if (method == 'PUT') {

            let reservasResponse: any;

            if (!!body.clienteDni) {
                reservasResponse = await reservaService.findByClienteDni(+body.clienteDni, body?.reservaId);
            }

            if (!!body.reservaId) {
                reservasResponse = await reservaService.findByReservaId(body?.reservaId);
            }

            if (!!body.estado) {
                if (reservasResponse.length != 0 && reservasResponse.length != undefined)
                    reservasResponse = reservasResponse.filter((unaReserva: any) => unaReserva.estado == body.estado);
                else if (reservasResponse.estado != body.estado) {
                    reservasResponse = {};
                }
            }

            return res.json(reservasResponse);
        }

        if (method == 'OPTIONS') {
            return res.json('token');
        }

    } else return res.status(401).json({});

}
