const ElGamal = require("./ElGamal");
const RSA = require("./RSA");
const { hashMessage } = require("./utils");

const Algorithms = {
    ElGamal: {
        sign: ElGamal.prototype.signMessage,
        decrypt: ElGamal.prototype.decryptMessage,
        check: ElGamal.prototype.checkSignature
    },
    RSA: {
        sign: RSA.prototype.signMessage,
        check: RSA.prototype.checkSignature
    },
    hash: hashMessage
}

module.exports = Algorithms;
