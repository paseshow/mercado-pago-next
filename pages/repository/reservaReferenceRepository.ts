import { reservaReferenceMpModel } from "../models/reservaReferenceMp";

export interface ReservaReferenceRepository {
    findByReservaId(reservaId: number): any;
    save(reservaReferenceMp: reservaReferenceMpModel): any
    findByClienteDni(clienteDni: number): any
    findByTransaccionId(transaccionId: number): any
    update(reservaReferenceMp: reservaReferenceMpModel): any
};