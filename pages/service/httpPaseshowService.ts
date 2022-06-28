import { UserLogin } from "../dtos/UserLogin";

export interface HttpPaseshowService {
    login(user: UserLogin): any;
    eventos(token: string): any;
    reservaFull(reservaId: string, token: string): any;
    notificationMp(token: string): any;
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
}