Signature Algorithms
====

JavaScript implementations for RSA and ElGamal signature algorithms

## Install

didn't upload on *npm* so you need to:
- clone package from here.
- use `npm link` in the package folder
- install the package in your project's folder using `npm link sign-algos`
(or just install directly in the node_modules folder)

## Basics

`hash()` - method to generate a hash code from the string which 
consists of digits only.

**RSA** consists of two methods:

`sign(messageHash)` returns an objects consisting of original 
message, signature and two public keys to check if the message is *true*.

`check(signedMessage)` inputs an object from the previous method 
and returns *true* if the message signes are correct.

**ElGamal** consists of three methods:

`sign(messageHash)` returns an object of class Signature consisting 
of two signatures, public and private keys. 
To extract only public keys use `getPublic()` method on the input object.

`check(messageHash, Signature.getPublic())` - returns *true* if the 
message signs are correct. 

`decrypt(Signature)` - inputs original signature with private keys 
and returns original encrypted messageHash.

## License 

[MIT](./LICENSE)