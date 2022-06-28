import type { NextApiRequest, NextApiResponse } from 'next'
import { SecurityMercadoPagoModel } from '../../models/securityMercadoPago';
import { SecurityMercadoPagoRepositoryImpl } from '../../repository/implements/SecurityMercadoPagoRepositoryImpl';
import { SecurityMercadoPagoServiceImpl } from '../../service/implements/securityMercadoPagoServiceImpl';
import { SecurityMercadoPago } from '../../service/securityMercadoPagoService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let serviceSecurityMP = new SecurityMercadoPago(new SecurityMercadoPagoServiceImpl(new SecurityMercadoPagoRepositoryImpl));

    const { method } = req;
    const { body } = req;
    const { query } = req;

    if (method == 'POST') {
        if (body && query.token) {
            let updateSecurityMercadoPago = body as SecurityMercadoPagoModel;
            return res.json( await serviceSecurityMP.save(updateSecurityMercadoPago));
        }
    }

    if(method == 'OPTIONS') {
        return res.json('token');
    }
}
