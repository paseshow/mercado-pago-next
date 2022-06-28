export interface ReservaReferenceService {
    findByReservaId(reservaId: number): any
    findByClienteDni(clienteDni: number): any
    findByTransaccionId(transaccionId: number): any
}

export class ReservaReference {

    constructor(
        private reservaReferenceService: ReservaReferenceService
    ){}

    findByReservaId(reservaId: number) {
        return this.reservaReferenceService.findByReservaId(reservaId);
    }

    findByClienteDni(clienteDni: number) {
        return this.reservaReferenceService.findByClienteDni(clienteDni);
    }

    findByTransaccionId(transaccionId: number) {
        return this.reservaReferenceService.findByTransaccionId(transaccionId);
    }
}
