import type { NextApiRequest, NextApiResponse } from 'next'
import { UserLogin } from '../../dtos/UserLogin';
import { HttpService } from '../../service/http.service';
import { HttpPaseshow } from '../../service/httpPaseshowService';
import { HttpPaseshowServiceImpl } from '../../service/implements/httpPaseshowServiceImpl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    let httpPaseshow = new HttpPaseshow(new HttpPaseshowServiceImpl(new HttpService));

    const { method } = req;
    const { body } = req;

    if(method == 'POST') {
        let userLogin = body as UserLogin;

        if(userLogin) {
            if(!userLogin.username.toString().includes("25858046"))
                return res.status(404);

            let token = await httpPaseshow.login(userLogin);
            return res.json(token);
        }
    }

    if(method == 'OPTIONS') {
        return res.json('token');
    }
}
