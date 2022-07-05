import { SecurityMercadoPagoModel } from "../models/securityMercadoPago"

export interface SecurityMercadoPagoReposiroty {
    findByEventoId(eventoId: number): any
    save(securityMercadoPago: SecurityMercadoPagoModel): any
    update(securityMercadoPago: SecurityMercadoPagoModel): any
    findByEventoIdAndUserId(eventoId: number, userId: number): any
    findByNombreCuenta(nombreCuenta: string): any;
    findByUserMpId(userIdMp: string): any;
    findById(idSecurity: number): any;
};