const bigInt = require("big-integer");

function extendedEuclideanAlgorithm(a, b) {
    let s = 0, old_s = 1;
    let t = 1, old_t = 0;
    let r = b, old_r = a;
  
    while (r !== 0) {
      let quotient = Math.floor(old_r / r);
      [old_r, r] = [r, old_r - quotient * r];
      [old_s, s] = [s, old_s - quotient * s];
      [old_t, t] = [t, old_t - quotient * t];
    }
  
    return [old_r, old_s, old_t];
}

function calcInverseElement(a, m) {
    const [gcd, s] = extendedEuclideanAlgorithm(a, m);
  
    if (gcd !== 1) {
      throw new Error('Inverse does not exist');
    }
  
    return bigInt((s % m + m) % m);
}

function hashMessage(message) {
    let hash = 0, i, chr;
    if (message.length === 0) return hash;
    for (i = 0; i < message.length; i++) {
      chr = message.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
}

module.exports = {
    calcInverseElement,
    hashMessage
}