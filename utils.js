function charToASCII(letter) {
  return letter.charCodeAt(0);
}

function asciiToBinary(num) {
  return +num.toString(2);
}

function padZero(num, length) {
  let array = num.toString().split('');
  if (length <= array.length) {
    throw new Error('length argument is smaller than number length');
  }
  while (array.length < length) {
    array.unshift('0');
  }

  return array.join('');
}

function leftRotate(string, num) {
  if (num > string.length) {
    throw new Error('cannot shift a number above string length');
  }
  return string.slice(num) + string.slice(0, num);
}

function binaryToHex(string) {
  if (typeof string !== 'string') string = string.toString();
  let decimal = parseInt(string, 2);
  return decimal.toString(16)
}

module.exports = {
  charToASCII,
  asciiToBinary,
  padZero,
  leftRotate,
  binaryToHex
};
