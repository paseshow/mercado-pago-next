import type { NextApiRequest, NextApiResponse } from 'next'
import { SecurityMercadoPagoRepositoryImpl } from '../../repository/implements/SecurityMercadoPagoRepositoryImpl';
import { SecurityMercadoPagoServiceImpl } from '../../service/implements/securityMercadoPagoServiceImpl';
import { SecurityMercadoPago } from '../../service/securityMercadoPagoService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req;
    const { query } = req;

    if (method == 'GET') {
        if (query.id) {

            let serviceSecurityMP = new SecurityMercadoPago(new SecurityMercadoPagoServiceImpl(new SecurityMercadoPagoRepositoryImpl));

            return res.status(200).json(serviceSecurityMP.findByEventoId(+query.id));
        }
    }
    // res.status(200).json(req.body.reservaId)
}
