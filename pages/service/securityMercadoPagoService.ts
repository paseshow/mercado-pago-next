
import { SecurityMercadoPagoModel } from "../models/securityMercadoPago";

export interface SecurityMercadoPagoService {
    findByEventoId(eventoId: number): any
    save(securityMercadoPago: SecurityMercadoPagoModel): any
    update(securityMercadoPago: SecurityMercadoPagoModel): any
    findByEventoIdAndUserId(eventoId: number, userId: number): any
    findByNombreCuenta(nombreCuenta: string): any;
    findByUserMpId(userIdMp: string): any;
    findById(idSecurity: number): any;
};

export class SecurityMercadoPago {
    constructor(
        private securityMercadoPagoService: SecurityMercadoPagoService
    ){}

    findByEventoId(eventoId: number) {
        return this.securityMercadoPagoService.findByEventoId(eventoId);
    };

    save(securityMercadoPago: SecurityMercadoPagoModel) {
        return this.securityMercadoPagoService.save(securityMercadoPago);
    };

    update(securityMercadoPago: SecurityMercadoPagoModel) {
        return this.securityMercadoPagoService.update(securityMercadoPago);
    };

    findByEventoIdAndUserId(eventoId: number, userId: number) {
        return this.securityMercadoPagoService.findByEventoIdAndUserId(eventoId, userId);
    };

    findByNombreCuenta(nombreCuenta: string) {
        return this.securityMercadoPagoService.findByNombreCuenta(nombreCuenta);
    };

    findByUserMpId(userIdMp: string) {
        return this.securityMercadoPagoService.findByUserMpId(userIdMp);
    };

    findById(idSecurity: number) {
        return this.securityMercadoPagoService.findById(idSecurity);
    };
}