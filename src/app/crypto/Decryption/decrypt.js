const NodeRSA = require('node-rsa');
const fs = require('fs');
const encrypted = require('../Encryption/sample');

(async () => {
    const keyData = fs.readFileSync('../../../../private.key', 'utf-8');
    // const test = fs.readFileSync('filename goes here', 'utf-8');

    const key = NodeRSA();
    key.importKey(keyData);

    const decrypted = key.decrypt(encrypted, 'utf-8');
    console.log(decrypted);
})();