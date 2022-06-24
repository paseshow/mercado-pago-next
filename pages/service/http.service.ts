
export class HttpService {

    get(url: string, headers: Headers) {
        var requestOptions: RequestInit = {
            method: 'GET',
            headers: headers
        };

        return new Promise((resolve, reject) => {
            fetch(url, requestOptions)
                .then(eventos => eventos.json())
                .then(result => { resolve(result) });
        });
    };
}