import { reservaReferenceMpModel } from "../../models/reservaReferenceMp";
import { ReservaReferenceRepository } from "../../repository/reservaReferenceRepository";
import { ReservaReferenceService } from "../reservaReferenceService";

export class ReservaReferenceServiceImpl implements ReservaReferenceService {

    constructor(
        private reservaReferenceRpository: ReservaReferenceRepository
    ){}

    findByReservaId(reservaId: number) {
        return this.reservaReferenceRpository.findByReservaId(reservaId);
    };

    findByClienteDni(clienteDni: number) {
        return this.reservaReferenceRpository.findByClienteDni(clienteDni);
    };

    findByTransaccionId(transaccionId: number) {
        return this.reservaReferenceRpository.findByTransaccionId(transaccionId);
    };
    
    save(reservaReferenceMp: reservaReferenceMpModel) {
        return this.reservaReferenceRpository.save(reservaReferenceMp);
    };

    update(reservaReferenceMp: reservaReferenceMpModel){
        return this.reservaReferenceRpository.update(reservaReferenceMp);
    };
}