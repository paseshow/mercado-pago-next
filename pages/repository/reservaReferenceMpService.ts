import { reservaReferenceMpModel } from "../models/reservaReferenceMp";

export interface ReservaReferenceMpService {
    findByReservaId(reservaId: number): any;
    save(reservaReferenceMp: reservaReferenceMpModel): any
};

export class ReservaReferenceMp {

    constructor(
        private reservaReferenceMp: ReservaReferenceMpService
    ){}

    findByReservaId(reservaId: number) {
        return this.reservaReferenceMp.findByReservaId(reservaId);
    };

    save(reservaReferenceMp: reservaReferenceMpModel) {
        return this.reservaReferenceMp.save(reservaReferenceMp);
    };
}