import type { NextApiRequest, NextApiResponse } from 'next'
import { RequestRefounds } from '../../dtos/refounds';
import { ReservaReferenceRepositoryImpl } from '../../repository/implements/ReservaReferenceRepositoryImpl';
import { ReservaRepositoryImpl } from '../../repository/implements/ReservaRepositoryImpl';
import { SecurityMercadoPagoRepositoryImpl } from '../../repository/implements/SecurityMercadoPagoRepositoryImpl';
import { HttpService } from '../../service/http.service';
import { HttpPaseshowServiceImpl } from '../../service/implements/httpPaseshowServiceImpl';
import { PreferenceServiceImpl } from '../../service/implements/preferenceServiceImpl';
import { ReservaReferenceServiceImpl } from '../../service/implements/reservaReferenceServiceImpl';
import { ReservaServiceImpl } from '../../service/implements/ReservaServiceImpl';
import { SecurityMercadoPagoServiceImpl } from '../../service/implements/securityMercadoPagoServiceImpl';
import { PreferenceMp } from '../../service/preferenceService';
import { ReservaReference } from '../../service/reservaReferenceService';
import { Reserva } from '../../service/reservaService';
import { SecurityMercadoPago } from '../../service/securityMercadoPagoService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let reservaReferenceService = new ReservaReference(new ReservaReferenceServiceImpl( new ReservaReferenceRepositoryImpl));
    let reservaService = new Reserva(new ReservaServiceImpl( new ReservaRepositoryImpl));
    let securityMercadoPagoService = new SecurityMercadoPago( new SecurityMercadoPagoServiceImpl( new SecurityMercadoPagoRepositoryImpl));
    let preferenceMp = new PreferenceMp(new PreferenceServiceImpl( new HttpPaseshowServiceImpl(new HttpService)));

    const { method } = req;
    const { body } = req;

    if (method == 'POST') {
        let requestRefounds: RequestRefounds = body;

        if(!!requestRefounds) {
            
            let reservaReferenceByTrasanccionId = await reservaReferenceService.findByTransaccionId(requestRefounds.idTransaccion);
            
            if(!!reservaReferenceByTrasanccionId) {
                let reservaByReservaId = await reservaService.findByReservaId(+reservaReferenceByTrasanccionId.reservaId);
                let securityMercadoPagoByUserIdAndEventId = await securityMercadoPagoService.findByEventoIdAndUserId(requestRefounds.eventoId, reservaReferenceByTrasanccionId.collectorId);

                return res.status(200).json( await preferenceMp.refounds(requestRefounds, securityMercadoPagoByUserIdAndEventId.accessToken, reservaByReservaId, reservaReferenceByTrasanccionId));
            }


            
            return res.json({
                status: 'ok'
            });
        }
    }
}
