
import mercadopago from "mercadopago";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";
import { reservaReferenceMpModel } from "../../models/reservaReferenceMp";
import { ReservaReferenceMpServiceImpl } from "../../repository/implements/ReservaReferenceMpServiceImpl";
import { ReservaServiceImpl } from "../../repository/implements/ReservaServiceImpl";
import { SecurityMercadoPagoRepositoryImpl } from "../../repository/implements/SecurityMercadoPagoRepositoryImpl";
import { ReservaReferenceMp } from "../../repository/reservaReferenceMpService";
import { Reserva } from "../../repository/reservaService";
import { PreferenceMpService } from "../preferenceService";
import { SecurityMercadoPago } from "../securityMercadoPagoService";
import { HttpPaseshowServiceImpl } from "./httpPaseshowServiceImpl";

export class PreferenceServiceImpl implements PreferenceMpService {

    constructor(
        private httpPaseshowServiceImpl: HttpPaseshowServiceImpl,
    ) {
    }

    async create_preference(reservaId: string, eventoId: number, token: string) {
        let reservaFull: any;
        await this.httpPaseshowServiceImpl.reservaFull(reservaId, token).then(res => reservaFull = res);

        if (!!reservaFull) {
            const reservaReferenceMp = new ReservaReferenceMp(new ReservaReferenceMpServiceImpl);

            let reservaReference = await reservaReferenceMp.findByReservaId(+reservaId);

            if (!!reservaReference) {
                const securityMercadoPago = new SecurityMercadoPago(new SecurityMercadoPagoRepositoryImpl)
                let security = await securityMercadoPago.findByEventoId(eventoId);

                if (!!security) {
                    mercadopago.configurations.setAccessToken(security.accessToken);
                    mercadopago.preferences.create(this.createPreference(reservaFull, security))
                        .then(response => {
                            let saveReservaReference = reservaReferenceMp.save(this.reservaReferenceMp(response.body,+reservaFull.id, "pending"));

                            // ACA ----- GENERAR EVENTO A SOCKET.IO

                            const reseva = new Reserva(new ReservaServiceImpl);

                            for(let i = 0; i < reservaFull.ubicacionEventoes.length; i++) {
                                reseva.save(reseva.createReserva(reservaFull, 'P', i, saveReservaReference.id));
                            }

                            return { id: response.body.id,  publicKey: reservaReference[reservaReference.length -1].publicKey };
                        });
                }
            }
        };
    };


    createPreference(reserva: any, securityMercadoPago: any) {
        let preferences: CreatePreferencePayload = {
            // auto_return: "https://api2.test.mercadopago.paseshow.com.ar/notifications/exit",
            items: [
                {
                    title: 'PaseShow',
                    unit_price: reserva.importeTotal,
                    quantity: 1
                }
            ],
            back_urls: {
                "success": "https://api2.test.mercadopago.paseshow.com.ar/notifications/exit",
                "failure": "https://api2.test.mercadopago.paseshow.com.ar/notifications/fail",
                "pending": "https://api2.test.mercadopago.paseshow.com.ar/notifications/pending"
            },
            payer: {
                "name": reserva.clienteId.nombre,
                "surname": reserva.clienteId.username,
                "email": reserva.clienteId.email,
                "phone": {
                    "area_code": "+",
                    "number": reserva.clienteId.telefono
                },
                "identification": {
                    "type": "DNI",
                    "number": reserva.clienteId.dni
                },
                "address": {
                    "street_name": reserva.clienteId.direccion,
                    "street_number": '0',
                    "zip_code": reserva.clienteId.cp
                }
            },
            notification_url: "https://api2.test.mercadopago.paseshow.com.ar/notifications/" + securityMercadoPago.nombreCuenta, // notificaiones para estados de los procesos
            statement_descriptor: "PaseShow", //descripcion que aparecera en el resumen de tarjeta del comprador
            external_reference: reserva.id.toString(),
            payment_methods: {
                "installments": securityMercadoPago.maximoCuotas
            }
        };

        return preferences;
    };

    reservaReferenceMp(preference: any, reservaId: number, status: string) {
        let referenceId = preference.id.toString();
        let clientMpId = +preference.client_id;
        let collectorId = +preference.collector_id;
        let statusReference = status;
    
        let reservaReferenceMp: reservaReferenceMpModel = { reservaId, referenceId, clientMpId, collectorId, statusReference };
    
        return reservaReferenceMp;
    };
}