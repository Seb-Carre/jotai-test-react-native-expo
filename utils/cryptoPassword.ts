var CryptoJS = require("crypto-js");

var key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f"); // clé

export function encryptPassword(password: string) {
    var iv = CryptoJS.lib.WordArray.random(16); // vecteur d'initialisation 
    var encryptedPassword = CryptoJS.AES.encrypt("MyPassword", key, { iv: iv }).toString();
    return {encryptedPassword, iv};
}

export function decryptPassword(password: string, iv: Buffer) {
    var bytes  = CryptoJS.AES.decrypt(password, key, { iv: iv });
    var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedPassword;
}