import { ReservaModel } from "../models/reserva";

export interface ReservaRepository {
    save(reserva: ReservaModel): any
    findByReservaId(reservaId: number): any
    findByClienteDni(clienteDni: number, reservaId?: number): any
    findByEstado(estado: string): any
    update(reserva: any): any;
};

export class Reserva {

    constructor(
        private reservaRepository: ReservaRepository
    ) { }

    save(reserva: ReservaModel) {
        return this.reservaRepository.save(reserva);
    };

};