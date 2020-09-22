import { Request, Response } from 'express';
import { get } from 'https';
import {
    parseStringPromise as parseXml
} from 'xml2js';
import { getToken } from '../KB'

import { TocBody, TrainOperatingCompanyList, TrainOperatingCompany } from '../../types/tocs';

export default async (req: Request, res: Response) => {

    get('https://opendata.nationalrail.co.uk/api/staticfeeds/4.0/tocs', {
        headers: {
            'X-Auth-Token': await getToken('', '')
        }
    }, response => {
        response.setEncoding("utf8");
        let body = "";
        response.on("data", data => {
            body += data;
        });
        response.on("end", async () => {
            if (response.statusCode !== 200){
                res.status(401)
                res.send('Unauthorized')
            }
            const parsedBody: TocBody = await parseXml(body, {
                explicitArray: false
            })
            try {
                res.json(parsedBody)
                // res.render('tocs', {
                //     title: 'Train Operting Companies',
                //     tocs: parsedBody.TrainOperatingCompanyList.TrainOperatingCompany
                // })
            } catch (e){
                console.log(e)
                res.json(parsedBody)
            }

        });
    });

}