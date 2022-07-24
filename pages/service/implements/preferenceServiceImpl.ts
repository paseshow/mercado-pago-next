
import mercadopago from "mercadopago";
import { DevolucionModel } from "../../dtos/devolucion";
import { RequestRefounds } from "../../dtos/refounds";
import { UserLogin } from "../../dtos/UserLogin";
import { reservaReferenceMpModel } from "../../models/reservaReferenceMp";
import { DevolucionRepositoryImpl } from "../../repository/implements/devolucionRepositoryImpl";
import { ReservaReferenceRepositoryImpl } from "../../repository/implements/ReservaReferenceRepositoryImpl";
import { ReservaRepositoryImpl } from "../../repository/implements/ReservaRepositoryImpl";
import { SecurityMercadoPagoRepositoryImpl } from "../../repository/implements/SecurityMercadoPagoRepositoryImpl";
import { Devolucion } from "../devolucionService";
import { HttpService } from "../http.service";
import { HttpPaseshow } from "../httpPaseshowService";
import { IPreferenceMpService } from "../preferenceService";
import { ReservaReference } from "../reservaReferenceService";
import { Reserva } from "../reservaService";
import { SecurityMercadoPago } from "../securityMercadoPagoService";
import { DevolucionServiceImpl } from "./devolucionServiceImpl";
import { HttpPaseshowServiceImpl } from "./httpPaseshowServiceImpl";
import { ReservaReferenceServiceImpl } from "./reservaReferenceServiceImpl";
import { ReservaServiceImpl } from "./ReservaServiceImpl";

export class PreferenceServiceImpl implements IPreferenceMpService {

    reservaReferenceMpService = new ReservaReference(new ReservaReferenceServiceImpl( new ReservaReferenceRepositoryImpl));
    securityMercadoPagoService = new SecurityMercadoPago(new SecurityMercadoPagoRepositoryImpl);
    resevaService = new Reserva(new ReservaServiceImpl(new ReservaRepositoryImpl));
    devolucionService = new Devolucion(new DevolucionServiceImpl(new DevolucionRepositoryImpl));
    httpPaseshowService = new HttpPaseshow(new HttpPaseshowServiceImpl(new HttpService));

    isProd = process.env.IS_PROD;

    constructor(
        private httpPaseshowServiceImpl: HttpPaseshowServiceImpl
    ) {
    }

    async create_preference(reservaId: string, eventoId: number, token: string) {
        let reservaFull: any;

        await this.httpPaseshowServiceImpl.reservaFull(reservaId, token).then(res => reservaFull = res);

        if (!!reservaFull) {
            let reservaReference = await this.reservaReferenceMpService.findByReservaId(+reservaId);

            if (reservaReference == null || reservaReference.length == 0) {
                let security: any = await this.securityMercadoPagoService.findByEventoId(eventoId);

                if (!!security) {
                    mercadopago.configurations.setAccessToken(security.accessToken);
                    let mercadoPagoCreate = await mercadopago.preferences.create(this.createPreference(reservaFull, security, eventoId));

                    let saveReservaReference = await this.reservaReferenceMpService.save(this.reservaReferenceMp(mercadoPagoCreate.body, +reservaFull.id, "pending", security));

                    for (let i = 0; i < reservaFull.ubicacionEventoes.length; i++) {
                        this.resevaService.save(this.resevaService.createReserva(reservaFull, 'P', i, saveReservaReference.id));
                    }
                    return { id: mercadoPagoCreate.body.id, publicKey: security.publicKey };
                }
            }
        };
    };


    createPreference(reserva: any, securityMercadoPago: any, eventoId: number): any {
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
                "success": "https://api2.test.mercadopago.paseshow.com.ar/api/notifications/exit",
                "failure": "https://api2.test.mercadopago.paseshow.com.ar/api/notifications/fail",
                "pending": "https://api2.test.mercadopago.paseshow.com.ar/api/notifications/pending"
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
            notification_url: "https://api2.test.mercadopago.paseshow.com.ar/api/notifications/" + reserva.id.toString(), // notificaiones para estados de los procesos
            statement_descriptor: "PaseShow", //descripcion que aparecera en el resumen de tarjeta del comprador
            external_reference: reserva.id.toString(),
            payment_methods: {
                "installments": securityMercadoPago.maxCuotas
            }
        };

        console.log(preferences);
        return preferences;
    };

    reservaReferenceMp(preference: any, reservaId: number, status: string, security: any) {
        let referenceId = preference.id.toString();
        let clientMpId = +preference.client_id;
        let idSecurity = security.id;
        let statusReference = status;

        let reservaReferenceMp: reservaReferenceMpModel = { reservaId, referenceId, clientMpId, idSecurity, statusReference };

        return reservaReferenceMp;
    };

    refounds(request: RequestRefounds, accessToken: string, reserva: any, reservaReference: any) {
        mercadopago.configure({ access_token: accessToken });

        let isPartial = reserva.importeTotal > request.monto;
        return this.refundsMercadoPago(isPartial, request, reserva)
    };

    async refundsMercadoPago(isPartial: boolean, requestRefounds: RequestRefounds, reserva: any) {

        if (isPartial) {
            let refound = await mercadopago.payment.refund(requestRefounds.idTransaccion);
            reserva.estado = "A";

        } else {
            let montoRestante = reserva.monto - requestRefounds.monto;
            let refound = await mercadopago.payment.refundPartial(
                {
                    payment_id: requestRefounds.idTransaccion,
                    amount: Number(montoRestante)
                });

            reserva.monto = montoRestante;
        }

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

    async validPreference(paymentId: number, reservaId: number) {
        let preferenceByReserva = await this.reservaReferenceMpService.findByReservaId(reservaId);
        preferenceByReserva = preferenceByReserva[0];

        if (!!preferenceByReserva) {

            let securityMercadoPagoById = await this.securityMercadoPagoService.findById(preferenceByReserva.idSecurity);

            if (!!securityMercadoPagoById) {
                await mercadopago.configurations.setAccessToken(securityMercadoPagoById.accessToken);
                let preferencesFind = await mercadopago.preferences.findById(preferenceByReserva.referenceId);
                let paymentFindas = await mercadopago.payment.findById(paymentId);
                let reserva = await this.resevaService.findByReservaId(reservaId);
                reserva = reserva[0];

                if (paymentFindas) {
                    if (paymentFindas.response.status == 'approved') {
                        let user: UserLogin = {
                            username: 25858046,
                            password: this.isProd == 'true' ? 'pinares3631' : 'miguel01'
                        };

                        let responseLogin = await this.httpPaseshowService.login(user);
                        await this.httpPaseshowService.notificationMp(responseLogin.token, reserva);

                        reserva.estado = 'E';
                        reserva.fechaReserva = BigInt(reserva.fechaReserva);
                        reserva.fechaFacturacion = BigInt(new Date().getTime());
                        reserva.ubicacionEventoFechaIngreso = BigInt(0);
                        reserva.sectorEventoFechaFuncion = BigInt(reserva.sectorEventoFechaFuncion);
                        await this.resevaService.update(reserva);

                        preferenceByReserva.statusReference = 'approved';
                        preferenceByReserva.clientMpId = BigInt(preferenceByReserva.clientMpId);
                        preferenceByReserva.idTransaccionMp = BigInt(paymentId);
                        return await this.reservaReferenceMpService.update(preferenceByReserva);
                    }
                };
            };
        }
        return null;
    };
}