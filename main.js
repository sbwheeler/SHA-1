const sha1 = require('./src/sha1');
const clc = require('cli-color')

process.stdout.write(clc.white.bold('Input value to be hashed > '));

process.stdin.on('data', function (data) {
  const val = data.toString().trim();

  process.stdout.write(clc.white.bold('Hash value > ') + clc.red.bold(sha1(val)));
  process.stdout.write(clc.white.bold('\n-----------------------------------------------------\nInput value to be hashed > '));
});
