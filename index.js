#!/usr/bin/env node

const yargs = require('yargs');
const { exec } = require("child_process");

// Read args
const options = yargs
    .usage('Usage:')
    .usage('npx lodash-killer <path-to-file/folder>')
    .option('e', { alias: 'exclude', describe: 'Functions you want to exclude from changing', type: 'array'})
    .example('npx lodash-killer ./my-file.js --exclude isArray reverse')
    .argv;

console.log(JSON.stringify(options));
return;

// Misuse
if (options._.length === 0) {
    yargs.showHelp();
    return;
}

// Execute jscodeshift
exec(`jscodeshift ${options._.join(' ')}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
