const app = require('express')();
const https = require('http');
const fs = require('fs');
const crypto = require('crypto');
const {ServerDH, ClientDH} = require('./DifHell');
const {ServerSign, ClientVerify} = require('./ESignature');

const request = require('request-promise');

const PORT = 3001;


app.listen(PORT, async () =>{
    await request({
        method: 'GET',
        uri: 'http://localhost:3000/',
        json: true
    })
    .then((response) => {
        if(response){
            const clientDH = new ClientDH(response);
            const clientSecret = clientDH.getSecret(response);
            const clientContext = clientDH.getContext();

            request({
                method: 'GET',
                uri: 'http://localhost:3000/resourse',
                json: true,
                body: clientContext
            })
            .then((response) => {
                let text = response.txt.toString('utf8');
                console.log(`Encrypted text: ${text}`);

                const decipher = crypto.createDecipher('aes256', clientSecret.toString());
                const decrypted = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');

                console.log(`Decrypted text: ${decrypted}`);
            })
            .catch((err) => {
                console.log(`Request2 (module) ERROR: ${err}`);
            });
        }
    })
    .catch((err) => {
        console.log(`Request1 (module) ERROR: ${err}`);
    });

    await request({
        method: 'GET',
        uri: 'http://localhost:3000/signature',
        json: true
    })
    .then((response) => {
        let signature = response.sign;
        let txt = response.file;

        const text = fs.createReadStream(`${__dirname}/fileC.txt`);
        let data = '';
        text.on('data', (chunk) => {
            data += chunk.toString();
        });

        let cv = new ClientVerify();
        cv.verify(signature, text, (result) => {
            if(result){
                console.log('Signature verifyed, text: ', data);
            }
            else{
                console.log('Signature not verifyed ((((((');
            }
        });
    })
    .catch((err) => {
        console.log(`Signature ERROR: ${err}`);
    });
})
.on('error', (e) => {console.log(`Listener | error: ${e.code}`)});
