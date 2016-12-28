const expect = require('chai').expect;
const utils = require('../utils');

describe('Utils module functionality', () => {
  const letter = 'a';
  const word = 'hello world';

  describe('charToASCII function', () => {

    it('should return a number', () => {
      expect(utils.charToASCII(letter)).to.be.a('number');
    });

    it('should convert a character to its ASCII code', () => {
      expect(utils.charToASCII(letter)).to.equal(97);
    });

    it('should work on an array of characters using .map', () => {
      expect(word.split('').map((lett) => utils.charToASCII(lett)).length).to.equal(11);
      expect(word.split('').map((lett) => utils.charToASCII(lett))).to.deep.equal([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]);
    });
  });

  describe('ASCIItoBinary function', () => {
    const ASCII = utils.charToASCII(letter);
    const aSCIIword = word.split('').map((lett) => utils.charToASCII(lett));

    it('should return a number', () => {
      expect(utils.asciiToBinary(ASCII)).to.be.a('number');
    });

    it('should return the input number in binary notation', () => {
      expect(utils.asciiToBinary(ASCII)).to.be.equal(1100001);
    });

    it('should work on an array of numbers using .map', () => {
      expect(aSCIIword.map((num) => utils.asciiToBinary(num))).to.deep.equal([1101000, 1100101, 1101100, 1101100, 1101111, 100000, 1110111, 1101111, 1110010, 1101100, 1100100]);
    });
  });

  describe('padZero function', () => {
    const ASCII = utils.charToASCII(letter);
    const binary = utils.asciiToBinary(ASCII);

    it('should return a number', () => {
      expect(utils.padZero(binary, 8)).to.be.a('string');
    });

    it('should return a number with length equivalent to the second argument passed in', () => {
      expect(utils.padZero(binary, 8).length).to.equal(8);
      expect(utils.padZero(1, 100).length).to.equal(100);
    });

    it('should add zeros to the beginning of a string', () => {
      expect(utils.padZero(binary, 8)[0]).to.equal('0');
      expect(utils.padZero(1, 100)[98]).to.equal('0');
    });

    it('should throw an error if the length passed in is smaller than or equal to the number length', () => {
      expect(utils.padZero.bind(null, binary, 6)).to.throw(Error, 'length argument is smaller than number length');
      expect(utils.padZero.bind(null, binary, 7)).to.throw(Error, 'length argument is smaller than number length');
    });
  });

  describe('leftRotate function', () => {
    const ASCII = utils.charToASCII(letter);
    const paddedString = utils.padZero(utils.asciiToBinary(ASCII), 8);

    it('should return a string', () => {
      expect(utils.leftRotate(paddedString, 0)).to.be.a('string');
    });

    it('should rotate that string by the specified number', () => {
      expect(utils.leftRotate(paddedString, 1)).to.equal('11000010');
      expect(utils.leftRotate(paddedString, 5)).to.equal('00101100');
      expect(utils.leftRotate('01000001001000000101010001100101', 1)).to.equal('10000010010000001010100011001010');
    });

    it('should throw an error if the number passed in is greater than or equal to the string length', () => {
      expect(utils.leftRotate.bind(null, paddedString, 9)).to.throw(Error, 'cannot shift a number above string length');
    });
  });

  describe('binaryToHex function', () => {
    const ASCII = utils.charToASCII(letter);
    const binary = utils.asciiToBinary(ASCII);
    const binaryString = binary.toString();
    it('should return a string', () => {
      expect(utils.binaryToHex(binary)).to.be.a('string');
    });

    it('returns the string value of the input binary number in hexadecimal notation', () => {
      expect(utils.binaryToHex(binary)).to.equal('61');
    });

    it('accepts either a string or number as input and returns the same value', () => {
      expect(utils.binaryToHex(binary)).to.equal('61');
      expect(utils.binaryToHex(binaryString)).to.equal('61');
    });
  });
});