
import mercadopago from "mercadopago";
import { DevolucionModel } from "../../dtos/devolucion";
import { RequestRefounds } from "../../dtos/refounds";
import { reservaReferenceMpModel } from "../../models/reservaReferenceMp";
import { DevolucionRepositoryImpl } from "../../repository/implements/devolucionRepositoryImpl";
import { ReservaReferenceRepositoryImpl } from "../../repository/implements/ReservaReferenceRepositoryImpl";
import { ReservaRepositoryImpl } from "../../repository/implements/ReservaRepositoryImpl";
import { SecurityMercadoPagoRepositoryImpl } from "../../repository/implements/SecurityMercadoPagoRepositoryImpl";
import { ReservaReferenceMp } from "../../repository/reservaReferenceRepository";
import { Devolucion } from "../devolucionService";
import { PreferenceMpService } from "../preferenceService";
import { Reserva } from "../reservaService";
import { SecurityMercadoPago } from "../securityMercadoPagoService";
import { DevolucionServiceImpl } from "./devolucionServiceImpl";
import { HttpPaseshowServiceImpl } from "./httpPaseshowServiceImpl";
import { ReservaServiceImpl } from "./ReservaServiceImpl";

export class PreferenceServiceImpl implements PreferenceMpService {

    reservaReferenceMpService = new ReservaReferenceMp(new ReservaReferenceRepositoryImpl);
    securityMercadoPagoService = new SecurityMercadoPago(new SecurityMercadoPagoRepositoryImpl);
    resevaService = new Reserva(new ReservaServiceImpl(new ReservaRepositoryImpl));
    devolucionService = new Devolucion(new DevolucionServiceImpl(new DevolucionRepositoryImpl));

    constructor(
        private httpPaseshowServiceImpl: HttpPaseshowServiceImpl
    ) {
    }

    async create_preference(reservaId: string, eventoId: number, token: string) {
        let reservaFull: any;

        reservaFull = await this.httpPaseshowServiceImpl.reservaFull(reservaId, token).then(res => reservaFull = res);

        if (!!reservaFull) {

            let reservaReference = await this.reservaReferenceMpService.findByReservaId(+reservaId);

            if (reservaReference == null) {
                let security: any = await this.securityMercadoPagoService.findByEventoId(eventoId);

                if (!!security) {
                    mercadopago.configurations.setAccessToken(security.accessToken);
                    let mercadoPagoCreate = await mercadopago.preferences.create(this.createPreference(reservaFull, security));

                    let saveReservaReference = await this.reservaReferenceMpService.save(this.reservaReferenceMp(mercadoPagoCreate.body, +reservaFull.id, "pending"));
                    // ACA ----- GENERAR EVENTO A SOCKET.IO


                    for (let i = 0; i < reservaFull.ubicacionEventoes.length; i++) {
                        this.resevaService.save(this.resevaService.createReserva(reservaFull, 'P', i, saveReservaReference.id));
                    }
                    return { id: mercadoPagoCreate.body.id, publicKey: security.publicKey };
                }
            }
        };
    };


    createPreference(reserva: any, securityMercadoPago: any): any {
        let preferences = {
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
                    "number": +reserva.clienteId.telefono
                },
                "identification": {
                    "type": "DNI",
                    "number": reserva.clienteId.dni
                },
                "address": {
                    "street_name": reserva.clienteId.direccion,
                    "street_number": 0,
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

    refounds(request: RequestRefounds, accessToken: string, reserva: any, reservaReference: any) {
        mercadopago.configure({ access_token: accessToken });

        if (reserva.importeTotal > request.monto)
            return this.refundsPartial(request, reserva, reservaReference);

        return this.refundsTotal(request, reservaReference, reserva);
    };

    async refundsPartial(requestRefounds: RequestRefounds, reserva: any, reservaReference: any) {
        let montoRestante = reserva.monto - requestRefounds.monto;
        let refound = await mercadopago.payment.refundPartial(
            {
                payment_id: requestRefounds.idTransaccion,
                amount: Number(montoRestante)
            });

        reserva.monto = montoRestante;
        await this.resevaService.update(reserva);

        let devolucion: DevolucionModel = {
            reservaId: reserva.id,
            motivo: requestRefounds.motivo,
            usuarioEncargadoId: +requestRefounds.idUser,
            fechaDevolucion: new Date().getTime(),
            monto: montoRestante
        };

        return await this.devolucionService.save(devolucion);
    };

    async refundsTotal(requestRefounds: RequestRefounds, reservaReference: any, reserva: any) {
        let refound = await mercadopago.payment.refund(requestRefounds.idTransaccion);
        reserva.estado = "A";
        await this.resevaService.update(reserva);

        let devolucion: DevolucionModel = {
            reservaId: reserva.id,
            motivo: requestRefounds.motivo,
            usuarioEncargadoId: +requestRefounds.idUser,
            fechaDevolucion: new Date().getTime(),
            monto: requestRefounds.monto
        };

        return await this.devolucionService.save(devolucion);
    };
}