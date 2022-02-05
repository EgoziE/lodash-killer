#!/usr/bin/env node

const yargs = require('yargs');
const { exec } = require("child_process");

// Read args
const options = yargs
    .usage('Usage:')
    .usage('npx lodash-killer <path-to-file/folder>')
    .argv;

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
