import { reservaReferenceMpModel } from "../models/reservaReferenceMp";

export interface PreferenceMpService {
    create_preference(reservaId: string, eventoId: number, token: string): any;
};

export class PreferenceMp {

    constructor(
        private preferenceMpService: PreferenceMpService
    ) {}

    create_prefernece(reservaId: string, eventoId: number, token: string) {
        return this.preferenceMpService.create_preference(reservaId, eventoId, token);
    };

};