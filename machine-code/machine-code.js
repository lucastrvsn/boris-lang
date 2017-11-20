'use strict'

var fs = require('fs');
var Chance = require('chance');

var chance = new Chance();

class MachineCodeLine {
    constructor(tokens) {
        this.tokens = tokens;
        this.hash = chance.string({ alpha: true });
    }

    getAssembly() {

    }
}

var finalFile = '';
var lines = [];
var actualLine = 0;
var candidates = [];

module.exports = {
    init(tokens) {
        var tokensCandidates = [];

        for (var i = 4; i < tokens.length; i++) {
            var token = tokens[i];

            if (token.name !== 'T_EOL') {
                tokensCandidates.push(token);
                finalFile += token.lexeme + '\n';
            } else {
                candidates.push(new MachineCodeLine(tokensCandidates));
                tokensCandidates = [];
            }
        }

        console.log(candidates);
    }
};
