const ElGamal = require("./ElGamal");
const RSA = require("./RSA");
const { hashMessage } = require("./utils");

const Algorithms = {
    ElGamal: {
        sign: ElGamal.signMessage,
        decrypt: ElGamal.decryptMessage,
        check: ElGamal.checkSignature
    },
    RSA: {
        sign: RSA.signMessage,
        check: RSA.checkSignature
    },
    hash: hashMessage
}

module.exports = Algorithms;
