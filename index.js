const utils = require('./utils');

function sha1(text) {
  //constants used later during the hashing function
  let h0 = 01100111010001010010001100000001;
  let h1 = 11101111110011011010101110001001;
  let h2 = 10011000101110101101110011111110;
  let h3 = 00010000001100100101010001110110;
  let h4 = 11000011110100101110000111110000;

  //create array with ascii codes of each character
  const asciiText = text.split('').map((letter) => utils.charToASCII(letter));

  //create array of binary representations of ascii codes of each character, padded with zeros at the front so they are 8 characters long as necessary
  let binary8bit = asciiText.map((num) => utils.asciiToBinary(num)).map((num) => utils.padZero(num, 8));

  //join the array into a singular string appended with a 1
  let numString = binary8bit.join('') + '1';

  let count = 0;
  while (numString.length % 512 < 448) {
    numString += '0';
    count++;
  }

  //append the length of the original 8 bit binary representation of the message to your string, padded with zeros so it is 64 characters in length
  const length = binary8bit.join('').length;
  const binaryLength = utils.asciiToBinary(length);

  //SHA-1 will not support strings above 2^64 - 1 bits, so the length will never be greater than or equal to 64
  const paddedBinLength = utils.padZero(binaryLength, 64);
  numString += paddedBinLength;

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
  })

  //initializing to the constants set at the beginning of the function
  let a = h0;
  let b = h1;
  let c = h2;
  let d = h3;
  let e = h4;

  for (let i = 0; i < words80.length; i++) {
    for (let i = 0; i <= 79; i++) {
      if (i >= 0 && i <= 19) {

      } else if (i >= 20 && i <= 39) {

      } else if (i >= 40 && i <= 59) {

      } else {

      }
    }
  }

  return words80;
}




// console.log(sha1('A Test'));
// console.log(sha1('hello world'));
// console.log(sha1('LAKSFHLKASFFLKA APodnp DSAMKLASKL cannot shift a number above string length'));
