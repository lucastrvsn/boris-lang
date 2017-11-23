#!/usr/bin/env node

'use strict'

var Lexical = require('./lexical/Lexical.js');
var Syntactic = require('./syntactic/Syntactic.js');
var MachineCode = require('./machine-code/machine-code.js');
var AsmCode = require('./machine-code/assembly-code.js');
var chalk = require('chalk');

var lexical = new Lexical('./tests/file_2.bl');

lexical.init().then(input => {
    lexical.translate();

    lexical.print(lexical.tokenArray);

    var syntactic = new Syntactic(lexical.tokenArray);
    var syntacticResult = syntactic.init();

    if (syntacticResult.success) {
        console.log(chalk.green('[SUCCESS] Syntatic and Semantic process completed.'));
        var machineCode = MachineCode.init(lexical.tokenArray);

        var assembly = AsmCode.init(machineCode, syntacticResult.semantic);
        console.log(assembly);
    }
}).catch(err => {
    console.log(chalk.red('[ERROR] => ') + err);
});
