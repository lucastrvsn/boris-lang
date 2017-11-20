#!/usr/bin/env node

'use strict'

var Lexical = require('./lexical/Lexical.js');
var Syntactic = require('./syntactic/Syntactic.js');
var MachineCode = require('./machine-code/machine-code.js');
var chalk = require('chalk');

var lexical = new Lexical('./tests/file_2.bl');

lexical.init().then(input => {
    lexical.translate();

    lexical.print(lexical.tokenArray);

    var syntactic = new Syntactic(lexical.tokenArray);
    if (syntactic.init()) {
        console.log(chalk.green('[SUCCESS] Syntatic and Semantic process completed.'));
        MachineCode.init(lexical.tokenArray);
    }
}).catch(err => {
    console.log(chalk.red('[ERROR] => ') + err);
});
