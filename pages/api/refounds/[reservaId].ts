import { NextApiRequest, NextApiResponse } from "next";
import { ReservaReferenceRepositoryImpl } from "../../repository/implements/ReservaReferenceRepositoryImpl";
import { ReservaReferenceServiceImpl } from "../../service/implements/reservaReferenceServiceImpl";
import { ReservaReference } from "../../service/reservaReferenceService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const reservaReferenceService = new ReservaReference(new ReservaReferenceServiceImpl(new ReservaReferenceRepositoryImpl));

    const { query } = req;
    const { method } = req;
    
    if(method == 'GET') {
        if(query.token && query.reservaId) {
            let reservaReferenceByReservaId = await reservaReferenceService.findByReservaId(+query.reservaId)
            return res.json(reservaReferenceByReservaId[0]);
        };
    }

};