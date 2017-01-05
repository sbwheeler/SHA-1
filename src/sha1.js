const utils = require('./utils');

function sha1(text) {
  //constants used later during the hashing function
  let h0 = '01100111010001010010001100000001';
  let h1 = '11101111110011011010101110001001';
  let h2 = '10011000101110101101110011111110';
  let h3 = '00010000001100100101010001110110';
  let h4 = '11000011110100101110000111110000';

  //create array with ascii codes of each character
  const asciiText = text.split('').map((letter) => utils.charToASCII(letter));

  //create array of binary representations of ascii codes of each character, padded with zeros at the front so they are 8 characters long as necessary
  let binary8bit = asciiText.map((num) => utils.asciiToBinary(num)).map((num) => utils.padZero(num, 8));

  //join the array into a singular string appended with a 1
  let numString = binary8bit.join('') + '1';

  //pad the array with zeros until it is modulo 512 === 448
  while (numString.length % 512 !== 448) {
    numString += '0';
  }

  //append the length of the original 8 bit binary representation of the message to your string, padded with zeros so it is 64 characters in length
  const length = binary8bit.join('').length;
  const binaryLength = utils.asciiToBinary(length);

  //SHA-1 will not support strings above 2^64 - 1 bits, so the length will never be greater than or equal to 64
  const paddedBinLength = utils.padZero(binaryLength, 64);
  numString += paddedBinLength;

  //console.log('numstring: ', numString);
  //split that binary string into chunks of 512
  const chunks = utils.stringSplit(numString, 512);

  //split each of those chunks into 16 'words' (within subarrays) of 32 characters each
  const words = chunks.map((chunk) => utils.stringSplit(chunk, 32));

  //this step will loop through each of those arrays 'chunks' of 16 words and use XOR bitwise operations to extend those arrays into arrays of 80 32-character binary words each
  const words80 = words.map((array) => {
    //loop for each 16-word chunk that will extend it to be a 'chunk' array of 80 words, using bitwise operations on each
    for (let i = 16; i <= 79; i++) {
      //take four words from that chunk using your current i in the loop
      const wordA = array[i - 3];
      const wordB = array[i - 8];
      const wordC = array[i - 14];
      const wordD = array[i - 16];

      //perform consecutive bitwise operations going through each word
      const xorA = utils.xOR(wordA, wordB);
      const xorB = utils.xOR(xorA, wordC);
      const xorC = utils.xOR(xorB, wordD);

      //left rotate by one
      const leftRotated = utils.leftRotate(xorC, 1);
      //append to the array and continue the loop
      array.push(leftRotated);
    }
    return array;
  });

  //large loop where we use bitwise operations on our initial constants and word chunks and continually reassign them
  for (let i = 0; i < words80.length; i++) {
    //initializing to the constants set at the beginning of the function
    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;
    let e = h4;
    //loop 80 times, and perform different bitwise operations and initialize a different k constant depending on where in the loop you are
    for (let j = 0; j < 80; j++) {
      let f;
      let k;
      if (j < 20) {
        const BandC = utils.and(b, c);
        const notB = utils.and(utils.not(b), d);
        f = utils.or(BandC, notB);
        k = '01011010100000100111100110011001';
      }
      else if (j < 40) {
        const BxorC = utils.xOR(b, c);
        f = utils.xOR(BxorC, d);
        k = '01101110110110011110101110100001';
      }
      else if (j < 60) {
        const BandC = utils.and(b, c);
        const BandD = utils.and(b, d);
        const CandD = utils.and(c, d);
        const BandCorBandD = utils.or(BandC, BandD);
        f = utils.or(BandCorBandD, CandD);
        k = '10001111000110111011110011011100';
      }
      else {
        const BxorC = utils.xOR(b, c);
        f = utils.xOR(BxorC, d);
        k = '11001010011000101100000111010110';
      }
      //this occurs in every one of the loops, regardless what count j is at, and is adding together then reassigning all of the constants, which will then be used again in the next (of 80) iterations through the loop
      const word = words80[i][j];
      const tempA = utils.binaryAddition(utils.leftRotate(a, 5), f);
      const tempB = utils.binaryAddition(tempA, e);
      const tempC = utils.binaryAddition(tempB, k);
      let temp = utils.binaryAddition(tempC, word);

      temp = utils.truncate(temp, 32);
      e = d;
      d = c;
      c = utils.leftRotate(b, 30);
      b = a;
      a = temp;
    }

    //after going through 80 times, add together your constants and truncate them to a length of 32
    h0 = utils.truncate(utils.binaryAddition(h0, a), 32);
    h1 = utils.truncate(utils.binaryAddition(h1, b), 32);
    h2 = utils.truncate(utils.binaryAddition(h2, c), 32);
    h3 = utils.truncate(utils.binaryAddition(h3, d), 32);
    h4 = utils.truncate(utils.binaryAddition(h4, e), 32);
  }
  //convert each variable into hexadecimal notation and then concatenate those and return your final hash value
  return [h0, h1, h2, h3, h4].map((string) => utils.binaryToHex(string)).join('');
}


module.exports = sha1;
