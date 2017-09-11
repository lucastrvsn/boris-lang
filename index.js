#!/usr/bin/env node

'use strict';

var Lex = require('./lex/Lex.js');
var Semantic = require('./semantic/Semantic.js');
var chalk = require('chalk');

var lex = new Lex('./tests/file_string.bl', require('./lex/tokens.js'));
var tokens = [];

lex.init().then(input => {
    while (!lex.isEnd()) {
        var token = lex.next();
        if (token != null) {
            tokens.push(token);
        }
    }

    lex.print(tokens);

    var semantic = new Semantic(tokens, require('./semantic/rules.js')).init();
}).catch(err => {
    console.log(chalk.red('[ERROR] => ') + err);
});
