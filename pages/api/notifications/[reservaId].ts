import { NextApiRequest, NextApiResponse } from "next";
import { HttpService } from "../../service/http.service";
import { HttpPaseshowServiceImpl } from "../../service/implements/httpPaseshowServiceImpl";
import { PreferenceServiceImpl } from "../../service/implements/preferenceServiceImpl";
import { PreferenceMp } from "../../service/preferenceService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const preferenceMercadoPagoService = new PreferenceMp(new PreferenceServiceImpl(new HttpPaseshowServiceImpl( new HttpService)));

    const { method } = req;
    const { query } = req;

    if (method == 'GET') {
        if(query.reservaId && query.token) {

            let type = null;
            let id = null;

            for (let value in query) {
                if (value == "type" || value == "topic") type = query[value];
                else if (value.includes("id")) id = query[value];
            };

            if (type == 'payment' && id != null) {
                await preferenceMercadoPagoService.validPreference(query.token.toString(), +id, +query.reservaId)
                return res.status(200).json(null);
            }

            if (type == 'chargebacks') {
                //https://api.mercadopago.com/v1/chargebacks/{id}
                // devoluciones de cargo recibidas
                return res.status(200);
            }

            return res.status(200);
        }
    }

    if (method == 'OPTIONS') {
        return res.json('token');
    }
}
