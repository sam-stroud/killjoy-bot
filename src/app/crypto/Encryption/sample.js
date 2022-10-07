const NodeRSA = require('node-rsa');
const fs = require('fs');

const inputText = "Some Data to Encrypt";

const keyData = fs.readFileSync('../../../../public.key', 'utf-8');

const key = NodeRSA();
key.importKey(keyData);

const encrypted = key.encrypt(inputText, 'base64');
console.log(encrypted);

module.exports = {
    encrypted,
};