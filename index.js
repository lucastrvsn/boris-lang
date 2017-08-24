'use strict';

var Token = require('./Lex/Token.js');
var Lex = require('./Lex/Lex.js');

var lex = new Lex('function main\nif i < j\ni = 2\nend\nend', {
    'if': (lex) => {

    },
    'while': (lex) => {

    },
});

lex.init();
