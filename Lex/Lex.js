'use strict';

var Token = require('./Token.js');

class Lex {
    constructor(input, tokens) {
        this.input = input;
        this.tokens = tokens;
        this.position = 0;
    }

    nextToken() {
        return this.input;
    }

    init() {
        var workingInput = this.input;
        while (workingInput.length > 0) {
            console.log(workingInput);
            workingInput--;
            console.log(workingInput);
        }
    }
}

module.exports = Lex;
