import { ReservaModel } from "../models/reserva";

export interface ReservaRepository {
    save(reserva: ReservaModel): any
    findByReservaId(reservaId: number): any
    findByClienteDni(clienteDni: number, reservaId?: number): any
    findByEstado(estado: string): any
    update(reserva: any): any;
};
