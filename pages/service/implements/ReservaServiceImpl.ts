import { ReservaModel } from "../../models/reserva";
import { ReservaRepository } from "../../repository/reservaRepository";
import { ReservaService } from "../reservaService";

export class ReservaServiceImpl implements ReservaService {

    constructor(
        private reservaRepository: ReservaRepository
    ) { }

    findByReservaId(reservaId: number) {
        return this.reservaRepository.findByReservaId(reservaId);
    };

    findByClienteDni(clienteDni: number, reservaId?: number) {
        return this.reservaRepository.findByClienteDni(clienteDni, reservaId);
    };

    findByEstado(estado: string) {
        return this.reservaRepository.findByEstado(estado);
    };

    update(reserva: any) {
        return this.reservaRepository.update(reserva);
    };

    save(reserva: ReservaModel) {
        return this.reservaRepository.save(reserva);
    };
}