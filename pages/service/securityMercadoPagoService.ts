import { reservaReferenceMpModel } from "../models/reservaReferenceMp";

export interface SecurityMercadoPagoService {
    findByEventoId(eventoId: number): any
};

export class SecurityMercadoPago {
    constructor(
        private securityMercadoPagoService: SecurityMercadoPagoService
    ){}

    findByEventoId(eventoId: number) {
        return this.securityMercadoPagoService.findByEventoId(eventoId);
    };
}