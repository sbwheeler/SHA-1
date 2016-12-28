const utils = require('./utils');

function sha1(text) {
  //constants used later during the hashing function
  let h0 = 01100111010001010010001100000001;
  let h1 = 11101111110011011010101110001001;
  let h2 = 10011000101110101101110011111110;
  let h3 = 00010000001100100101010001110110;
  let h4 = 11000011110100101110000111110000;

  const asciiText = text.split('').map((letter) => utils.charToASCII(letter));

  const binary8bit = asciiText.map((num) => utils.asciiToBinary(num)).map((num) => utils.padZero(num, 8));

  const numString = binary8bit.join('') + '1';

  return numString;
}


console.log(sha1('A Test'));
