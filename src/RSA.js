const bigInt = require("big-integer");
const { calcInverseElement, hashMessage } = require("./utils");

class RSA {
    generatePrimeRandom() {
        const random = bigInt.randBetween(bigInt(999999), bigInt(9999999));
        if (random.isPrime()) return random;
        return this.generatePrimeRandom();
    }

    generateE(phiN) {
        const random = bigInt.randBetween(bigInt(1), phiN);
        if (random.isPrime()) return random;
        return this.generateE(phiN);
    }

    eulerTotient(n) {
        n = bigInt(n)
        let result = n;
      
        for (let i = bigInt(2); i <= Math.sqrt(n); i = i.add(1)) {
          if (n.mod(i).equals(0)) {
            while (n.mod(i).equals(0)) {
              n = n.divide(i);
            }
            result = result.divide(i).multiply(i.subtract(1));
          }
        }
      
        if (n > 1) {
          result = result.divide(n).multiply(n.subtract(1));
        }
      
        return result;
    }

    signMessage(message) {
        const p = this.generatePrimeRandom();
        const q = this.generatePrimeRandom();

        const n = p.multiply(q);
        const phiN = this.eulerTotient(n);

        const e = this.generateE(phiN);
        const d = calcInverseElement(e, phiN);

        const s = bigInt(hashMessage(message)).modPow(d, n);

        return { message, s, e, n }
    }

    checkSignature({ message, s, e, n }) {
        console.log(bigInt(hashMessage(message)), s.modPow(e, n));

        if (bigInt(hashMessage(message)).equals(s.modPow(e, n))) return true;

        return false;
    }
}

module.exports = RSA;