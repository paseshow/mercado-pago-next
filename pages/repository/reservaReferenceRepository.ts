import { reservaReferenceMpModel } from "../models/reservaReferenceMp";

export interface ReservaReferenceRepository {
    findByReservaId(reservaId: number): any;
    save(reservaReferenceMp: reservaReferenceMpModel): any
    findByClienteDni(clienteDni: number): any
    findByTransaccionId(transaccionId: number): any
};

export class ReservaReferenceMp {

    constructor(
        private reservaReferenceRpository: ReservaReferenceRepository
    ){}

    findByReservaId(reservaId: number) {
        return this.reservaReferenceRpository.findByReservaId(reservaId);
    };

    save(reservaReferenceMp: reservaReferenceMpModel) {
        return this.reservaReferenceRpository.save(reservaReferenceMp);
    };

    findByClienteDni(clienteDni: number) {
        return this.reservaReferenceRpository.findByClienteDni(clienteDni);
    };

    findByTransaccionId(transaccionId: number) {
        return this.reservaReferenceRpository.findByTransaccionId(transaccionId);
    };
}