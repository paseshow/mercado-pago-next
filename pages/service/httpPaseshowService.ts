import { UserLogin } from "../dtos/UserLogin";
import { ReservaModel } from "../models/reserva";

export interface HttpPaseshowService {
    login(user: UserLogin): any;
    eventos(token: string): any;
    reservaFull(reservaId: string, token: string): any;
    notificationMp(token: string, reserva: ReservaModel): any;
};


export class HttpPaseshow {

    constructor(
        private httpPaseshowService: HttpPaseshowService
    ) {
    }

    eventos(token: string) {
        return this.httpPaseshowService.eventos(token);
    };

    login(user: UserLogin) {
        return this.httpPaseshowService.login(user);
    };

    notificationMp(token: string, reserva: ReservaModel) {
        return this.httpPaseshowService.notificationMp(token, reserva);
    }
}