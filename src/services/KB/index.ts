import { request } from 'https'

export async function getToken(username: string, password: string) {

    const credentials = JSON.stringify({
        username,
        password
    });

    let tokenResponse: Promise<string> = new Promise((resolve, reject) => {

        let tokenResponseData = "";

        const req = request({
            hostname: 'opendata.nationalrail.co.uk',
            port: 443,
            path: '/authenticate',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': credentials.length
            }
        }, (res) => {
            res.on('data', (data => {
                tokenResponseData += data
            }))
            res.on('error', (err: Error) => {
                reject(err)
            })
            res.on('end', () => {
                resolve(tokenResponseData)
            })
        });

        req.write(credentials);
        req.end();
    })

    const tokenData = await tokenResponse;

    return JSON.parse(tokenData).token

}