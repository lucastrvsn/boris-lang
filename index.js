#!/usr/bin/env node

'use strict'

var Lexical = require('./lexical/Lexical.js');
var Syntactic = require('./syntactic/Syntactic.js');
var chalk = require('chalk');

var lexical = new Lexical('./tests/file_1.bl');
var tokens = [];

lexical.init().then(input => {
    while (!lexical.isEnd()) {
        var token = lexical.next();
        if (token != null) {
            tokens.push(token);
        }
    }

    lexical.print(tokens);

    var syntactic = new Syntactic(tokens).init();
}).catch(err => {
    console.log(chalk.red('[ERROR] => ') + err);
});
