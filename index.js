#!/usr/bin/env node

const yargs = require('yargs');
const { exec } = require("child_process");

// Read args
const options = yargs
    .usage('Usage:')
    .usage('npx lodash-killer <path-to-file/folder>')
    .option('e', { alias: 'exclude', describe: 'List of functions to exclude from change', type: 'array'})
    .option('o', { alias: 'only', describe: 'List of functions to change excluding all others', type: 'array'})
    .example('npx lodash-killer ./my-folder --exclude isArray reverse')
    .example('npx lodash-killer ./my-file.js --only find findIndex')
    .argv;

// Misuse
if (options._.length === 0) {
    yargs.showHelp();
    return;
}

const command = ['jscodeshift', options._];
if (options.exclude && options.exclude.length) {
    command.push(`--exclude=${options.exclude.join(',')}`)
}
if (options.only && options.only.length) {
    command.push(`--only=${options.only.join(',')}`)
}

// Execute jscodeshift
exec(command.join(' '), (error, stdout, stderr) => {
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
