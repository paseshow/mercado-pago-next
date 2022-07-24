import { RequestRefounds } from "../dtos/refounds";

export interface IPreferenceMpService {
    create_preference(reservaId: string, eventoId: number, token: string): any;
    refounds(request: RequestRefounds, accessToken: string, reserva: any, reservaReference: any): any;
    validPreference(paymentId: number, reservaId: number): any;
};

export class PreferenceMp {

    constructor(
        private preferenceMpService: IPreferenceMpService
    ) {}

    create_preference(reservaId: string, eventoId: number, token: string) {
        return this.preferenceMpService.create_preference(reservaId, eventoId, token);
    };

    refounds(request: RequestRefounds, accessToken: string, reserva: any, reservaReference: any) {
        return this.preferenceMpService.refounds(request, accessToken, reserva, reservaReference);
    };

    validPreference(paymentId: number, reservaId: number) {
        return this.preferenceMpService.validPreference(paymentId, reservaId);
    };

};