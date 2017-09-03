'use strict';

var Lex = require('./lex/Lex.js');
var chalk = require('chalk');

var lex = new Lex('./tests/file_1.bl', require('./tokens.js'));
var tokens = [];

lex.init().then(input => {
    while (!lex.isEnd()) {
        var token = lex.next();
        if (token != null) {
            tokens.push(token);
        }
    }

    console.log(tokens);
}).catch(err => {
    console.log(chalk.red('[ERROR] => ') + err);
});
