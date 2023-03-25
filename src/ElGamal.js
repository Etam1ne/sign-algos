const bigInt = require("big-integer");
const { calcInverseElement } = require("./utils");

class Signature {
    a;
    b;
    prime;
    primitiveRoot;
    y;
    privateKey;
    k;
    constructor(a, b, prime, primitiveRoot, y, privateKey, k) {
        this.a = a;
        this.b = b;
        this.prime = prime;
        this.primitiveRoot = primitiveRoot;
        this.y = y;
        this.privateKey = privateKey;
        this.k = k;
    }

    getPublic() {
        return { 
            a: this.a, 
            b: this.b, 
            prime: this.prime, 
            primitiveRoot: this.primitiveRoot, 
            y: this.y 
        };
    }
}

class ElGamal {    
    generatePrime(minNumber) {
        const random = bigInt.randBetween(minNumber, minNumber + bigInt(9999));
        if (random.isPrime()) return random;
        return this.generatePrime(minNumber);
    }

    generatePrimitiveRoot(prime) {
        const primitiveRoot = bigInt.randBetween(bigInt(0), prime);
        if (bigInt.gcd(prime, primitiveRoot) !== bigInt(1)) return primitiveRoot;
        return this.generatePrimitiveRoot()
    }

    generatePrivateKey(prime) {
        return bigInt.randBetween(bigInt(0), prime);
    }

    calcY(prime, primitiveRoot, privateKey) {
        return primitiveRoot.modPow(privateKey, prime);
    }

    generateK(prime) {
        const random = this.generatePrivateKey(prime);
        if (random.isPrime()) return random;
        return this.generateK(prime);
    }

    calcA(prime, primitiveRoot, k) {
        return primitiveRoot.modPow(k, prime);
    }

    calcB(prime, privateKey, k, message, a) {
        const k1 = calcInverseElement(k, prime.subtract(bigInt(1)));
        const result = k1.multiply(message.subtract(privateKey.multiply(a))).mod(prime.subtract(bigInt(1)));
        return result.isPositive() ? result : prime.subtract(bigInt(1)).add(result);
    }

    signMessage(
        message, 
        prime = this.generatePrime(bigInt(message)), 
        primitiveRoot = this.generatePrimitiveRoot(prime), 
        privateKey = this.generatePrivateKey(prime), 
        k = this.generateK(prime)
        ) {
        prime = bigInt(prime);
        primitiveRoot = bigInt(primitiveRoot);
        privateKey = bigInt(privateKey);
        k = bigInt(k);
        
        const a = this.calcA(prime, primitiveRoot, k);
        const b = this.calcB(prime, privateKey, k, bigInt(message), a);
        const y = this.calcY(prime, primitiveRoot, privateKey);

        return new Signature(a, b, prime, primitiveRoot, y, privateKey, k) 
    }

    decryptMessage({ a, b, prime, privateKey, k }) {
        return (privateKey * a + k * b) % (prime - 1);
    }

    checkSignature(message, {a, b, prime, primitiveRoot, y}) {
        if (
            (y.pow(a).multiply(a.pow(b))).mod(prime).equals(
                primitiveRoot.modPow(message, prime)
            )
        ) return true;

        return false;
    }
}

module.exports = ElGamal;