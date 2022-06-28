import type { NextApiRequest, NextApiResponse } from 'next'
import { SecurityMercadoPagoModel } from '../../models/securityMercadoPago';
import { SecurityMercadoPagoRepositoryImpl } from '../../repository/implements/SecurityMercadoPagoRepositoryImpl';
import { SecurityMercadoPagoServiceImpl } from '../../service/implements/securityMercadoPagoServiceImpl';
import { SecurityMercadoPago } from '../../service/securityMercadoPagoService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let serviceSecurityMP = new SecurityMercadoPago(new SecurityMercadoPagoServiceImpl(new SecurityMercadoPagoRepositoryImpl));

    const { method } = req;
    const { query } = req;
    const { body } = req;

    if(query.token) {

        if (method == 'GET') {
            if (query.id) {
                return res.json(await serviceSecurityMP.findByEventoId(+query.id));
            }
        }
    
        if (method == 'PUT') {
            if (query.id && body) {
                let updateSecurityMercadoPago = body as SecurityMercadoPagoModel;
                return res.json( await serviceSecurityMP.update(updateSecurityMercadoPago));
            }
        }
    
        if (method == 'POST') {
            if (query.id && body) {
                let updateSecurityMercadoPago = body as SecurityMercadoPagoModel;
                return res.json( await serviceSecurityMP.save(updateSecurityMercadoPago));
            }
        }
    
        if(method == 'OPTIONS') {
            return res.json('token');
        }

    } else return res.status(401).json({});
}
