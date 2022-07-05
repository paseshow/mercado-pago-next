
export class HttpService {

    get(url: string, headers: Headers) {
        var requestOptions: RequestInit = {
            method: 'GET',
            headers: headers
        };

        return new Promise((resolve, reject) => {
            fetch(url, requestOptions)
                .then(result => result.json())
                .then(result => { resolve(result) });
        });
    };

    post(url: string, requestOptions: RequestInit) {
        requestOptions.method = 'POST';

        return new Promise((resolve, reject) => {
            fetch(url, requestOptions)
                .then(result => result.json())
                .then(result => {
                    if (result) resolve(result)
                    resolve(null)
                });
        });
    };
}