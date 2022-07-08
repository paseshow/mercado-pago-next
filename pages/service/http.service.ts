
export class HttpService {

    async get(url: string, headers: Headers) {
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

    async post(url: string, requestOptions: RequestInit) {
        requestOptions.method = 'POST';

        return new Promise(async function (resolve, reject) {
            await fetch(url, requestOptions)
                .then(res => {
                    
                    if(url.includes('notificacionmp'))
                        return null
                    return res;
                })
                .then(result => {
                    if (result)
                        return result.json()
                    resolve(null)
                })
                .then(result => resolve(result));
        })
    };
}