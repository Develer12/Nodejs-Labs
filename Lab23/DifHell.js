const crypto = require('crypto');

let dh, p, gb, k;

class ServerDH{
    constructor(aLen, g){
        dh = crypto.createDiffieHellman(aLen, g);
        p = dh.getPrime();
        gb = dh.getGenerator();
        k = dh.generateKeys();
    }

    getContext(){
        return {
            p_hex: p.toString('hex'),
            g_hex: gb.toString('hex'),
            key_hex: k.toString('hex')
        };
    };

    getSecret(clientContext){
        const ke = Buffer.from(clientContext.key_hex, 'hex');
        return dh.computeSecret(ke);
    };
}

///////////////////////////////////////////////////////////////////
let dh_c, p_c, g_c, k_c;

class ClientDH{
    constructor(serverContext){
        const ctx = {
            p_hex: serverContext.p_hex? serverContext.p_hex: '1111',
            g_hex: serverContext.g_hex? serverContext.g_hex: '1'
        };
        p_c = Buffer.from(ctx.p_hex, 'hex');
        g_c = Buffer.from(ctx.g_hex, 'hex');
        dh_c = crypto.createDiffieHellman(p_c, g_c);
        k_c = dh_c.generateKeys();
    }

    getContext(){
        return {
            p_hex: p_c.toString('hex'),
            g_hex: g_c.toString('hex'),
            key_hex: k_c.toString('hex')
        };
    };

    getSecret(serverContext){
        const ke = Buffer.from(serverContext.key_hex, 'hex');
        return dh_c.computeSecret(ke);
    };
}


module.exports.ServerDH = ServerDH;
module.exports.ClientDH = ClientDH;
