
import { UserLogin } from "../../dtos/UserLogin";
import { HttpService } from "../http.service";
import { HttpPaseshowService } from "../httpPaseshowService";

export class HttpPaseshowServiceImpl implements HttpPaseshowService {

    urlPaseshow = process.env.URL_PASESHOW;

    constructor(
        private httpService: HttpService
    ) { }

    login(user: UserLogin, token: string): Promise<Response> {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        myHeaders = this.setHeaders(token, myHeaders);

        var urlencoded = new URLSearchParams();
        urlencoded.append("password", user.password);
        urlencoded.append("username", user.username.toString());

        var requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded
        };

        return fetch(this.setUrl('usuarios/authenticate', null, token), requestOptions);
    };

    async eventos(token: string): Promise<any> {
        var myHeaders = new Headers();
        this.setHeaders(token, myHeaders);

        return this.httpService.get(this.setUrl('eventoes', null, token), myHeaders).then( res => {
            return res;
        });
    };

    async reservaFull(reservaId: string, token: string): Promise<any> {
        var myHeaders = new Headers();
        myHeaders = this.setHeaders(token, myHeaders);

        return this.httpService.get(this.setUrl(`reservas/${reservaId}/full`, null, token), myHeaders).then( res => {
            return res;
        });
    };

    notificationMp(token: string) {

    };

    setUrl(path: string, params: any, token?: string): string {
        let urlReturn = this.urlPaseshow || '';

        if (process.env.IS_PROD == 'false' && token != null) {
            urlReturn = urlReturn.concat(`${path}?`);
            let urlParams: string = '';

            if (!!params) {
                for (let key of params) {
                    urlParams = urlParams.concat(`${key}=${params[key]}&`);
                }
            }

            return urlReturn.concat(urlParams).concat(`token=${token}`);
        }

        return urlReturn?.toString();
    };

    setHeaders(token: string, headers: Headers): Headers {
        if (process.env.IS_PROD && token) {
            headers.append("X-Auth-Token", token);
            return headers;
        }
        return headers;
    };
}