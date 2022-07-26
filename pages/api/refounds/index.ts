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

    console.log(`req: ${JSON.stringify(req)}`)
    if (method == 'POST') {
        let requestRefounds: RequestRefounds = body;
        console.log(`requestRefounds: ${JSON.stringify(requestRefounds)}`);

        if(!!requestRefounds) {
            let reservaReferenceByTrasanccionId = await reservaReferenceService.findByTransaccionId(requestRefounds.idTransaccion);
            console.log(`reservaReferenceByTrasanccionId: ${JSON.stringify(reservaReferenceByTrasanccionId)}`);

            if(!!reservaReferenceByTrasanccionId) {
                let reservaByReservaId = await reservaService.findByReservaId(+reservaReferenceByTrasanccionId.reservaId);
                console.log(`reservaByReservaId: ${JSON.stringify(reservaByReservaId)}`);
                let securityMercadoPagoByUserIdAndEventId = await securityMercadoPagoService.findById(reservaReferenceByTrasanccionId.idSecurity);
                console.log(`securityMercadoPagoByUserIdAndEventId: ${JSON.stringify(securityMercadoPagoByUserIdAndEventId)}`);

                return res.status(200).json( await preferenceMp.refounds(requestRefounds, securityMercadoPagoByUserIdAndEventId.accessToken, reservaByReservaId[0], reservaReferenceByTrasanccionId));
            }


            
            return res.json({
                status: 'ok'
            });
        }
    }
}
