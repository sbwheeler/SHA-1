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
  return decimal.toString(16);
}

function stringSplit(string, num) {
  if (string.length % num !== 0) throw new Error('string will not split evenly');
  let array = [];
  let prev = 0;
  for (let i = num; i <= string.length; i += num) {
    array.push(string.slice(prev, i));
    prev = i;
  }
  return array;
}

function xOR(stringA, stringB) {
  let arrayA = stringA.split('').map((letter) => +letter );
  let arrayB = stringB.split('').map((letter) => +letter );
  const xORarray = arrayA.map((num, index) => num ^ arrayB[index]);
  return xORarray.join('').toString();
}

function and(stringA, stringB) {
  let arrayA = stringA.split('').map((letter) => +letter );
  let arrayB = stringB.split('').map((letter) => +letter );
  const xORarray = arrayA.map((num, index) => num & arrayB[index]);
  return xORarray.join('').toString();
}

function or(stringA, stringB) {
  let arrayA = stringA.split('').map((letter) => +letter );
  let arrayB = stringB.split('').map((letter) => +letter );
  const xORarray = arrayA.map((num, index) => num | arrayB[index]);
  return xORarray.join('').toString();
}

function not(stringA) {
  let array = stringA.split('').map((letter) => letter );
  return array.map(letter => {
    if (letter === '1') return '0';
    return '1';
  }).join('');
}

function binaryAddition(stringA, stringB) {
  const numA = parseInt(stringA, 2);
  const numB = parseInt(stringB, 2);
  const sum = (numA + numB).toString(2);
  const length = stringA.length;

  return sum.length === length ? '1' + sum : sum;
}

function truncate(string, length) {
  while (string.length > length) {
    string = string.slice(1);
  }

  return string;
}

module.exports = {
  charToASCII,
  asciiToBinary,
  padZero,
  leftRotate,
  binaryToHex,
  stringSplit,
  xOR,
  and,
  or,
  not,
  binaryAddition,
  truncate
};
