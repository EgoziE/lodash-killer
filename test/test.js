const { execSync } = require("child_process");
const { Buffer } = require('buffer');

const buf = Buffer.from(execSync(`jscodeshift -d -s -p ${__dirname}/test-file.js`));
const arr = buf.toString().split('\n').filter(test => Boolean(test) && !test.startsWith('//'));

const errors = [];
for (let i = 0; i < arr.length; i = i + 2) {
    const line1 = arr[i];
    const line2 = arr[i + 1];

    if (line1 !== line2) {
        errors.push(`\x1b[41mTest Failed!\x1b[0m
Expected: \x1b[42m${line2}\x1b[0m
But got:  \x1b[43m${line1}\x1b[0m
`);
    }
}

if (errors.length > 0) {
    errors.forEach(e => console.error(e));
    console.log('\x1b[31m%s\x1b[0m', `${errors.length} tests failed...`);
} else {
    console.log('\x1b[32m%s\x1b[0m', 'All tests passed!');
}
