const expect = require('chai').expect;
const utils = require('../src/utils');

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

  describe('stringSplit function', () => {
    const stringA = 'hello world';
    const stringB = 'hello world!';
    it('should return an array', () => {
      expect(utils.stringSplit(stringB, 2)).to.be.an('array');
    });

    it('should split the input string into chunks of the given size', () => {
      expect(utils.stringSplit(stringB, 2)).to.deep.equal(['he', 'll', 'o ', 'wo', 'rl', 'd!']);
    });

    it('should throw an error if the input size will not split the string evenly', () => {
      expect(utils.stringSplit.bind(null, stringA, 2)).to.throw(Error, 'string will not split evenly');
    });
  });

  describe('bitwise functions', () => {
    const stringA = '10101010';
    const stringB = '01010101';

    it('should return a string', () => {
      expect(utils.xOR(stringA, stringB)).to.be.a('string');
      expect(utils.and(stringA, stringB)).to.be.a('string');
      expect(utils.or(stringA, stringB)).to.be.a('string');
    });

    it('xOr should return the bitwise XOR result of those two binary strings combined for xOR function', () => {
      expect(utils.xOR(stringA, stringB)).to.equal('11111111');
      expect(utils.xOR(stringA, stringA)).to.equal('00000000');
    });

    it('and should return the bitwise AND result of those two binary strings combined for AND function', () => {
      expect(utils.and(stringA, stringB)).to.equal('00000000');
      expect(utils.and(stringA, stringA)).to.equal('10101010');
    });

    it('or should return the bitwise OR result of those two binary strings combined for OR function', () => {
      expect(utils.or(stringA, stringB)).to.equal('11111111');
      expect(utils.or(stringA, stringA)).to.equal('10101010');
    });

    it('not should return the inverse of the input binary string', () => {
      expect(utils.not(stringA)).to.equal('01010101');
      expect(utils.not(stringB)).to.equal('10101010');
    });
  });

  describe('binary addition function', () => {
    const a = '00000000100100111101110001110010';
    const b = '01011000001001011101101001110111';
    const x = '1010100101111110101101010001000000';
    const y = '11001010011000101100000111010110';
    const z = '111';

    it('returns a string', () => {
      expect(utils.binaryAddition(z, z)).to.be.a('string');
    });

    it('returns a string that is the binary sum of the two binary input binary strings', () => {
      expect(utils.binaryAddition(z, z)).to.equal('1110');
    });

    it('prepends 0s onto the result if the length of the result is smaller than the length of the input, and a 1 onto the result if/when the length of the result is equal to that of the first input', () => {
      expect(utils.binaryAddition(x, y)).to.equal('11101110000010111011001011000010110');
      expect(utils.binaryAddition(a, b)).to.equal('101011000101110011011011011101001');
    });
  });

  describe('truncate function', () => {
    const temp = 'hello world';

    it('returns a string', () => {
      expect(utils.truncate(temp, 5)).to.be.a('string');
    });

    it('returns a string truncated from the beginning to equal the specified length', () => {
      expect(utils.truncate(temp, 8).length).to.equal(8);
      expect(utils.truncate(temp, 5)).to.equal('world');
    });
  });
});
