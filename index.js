'use strict';

var Token = require('./lex/Token.js');
var Lex = require('./lex/Lex.js');

var lex = new Lex('./tests/file_1.bl', {
    'if': (lex) => {
        
    },
    'while': (lex) => {

    },
});

lex.init().then(input => {
    console.log(input);

    while (!lex.isEnd()) {
        var input = lex.next();
        if (input != null) {
            console.log(input);
        }
    }
}).catch(err => {
    console.log('Error.');
});
