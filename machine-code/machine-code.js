'use strict'

var fs = require('fs');
var Chance = require('chance');
var chance = new Chance();

var finalFile = '';
var actualLine = 0;
var context = 0;
var candidates = [];
var contexts;
var position = 0;
var tokens = [];

var state = { IF: 0, WHILE: 1, FOR: 2, NONE: 3 };

module.exports = {
    init(tokens) {
        this.tokens = tokens;
        var currentState = state.NONE;
        var tokensCandidates = [];

        for (position = 4; position < tokens.length; position++) {
            var token = tokens[position];

            if (currentState === state.NONE) {
                switch (token.name) {
                    case 'T_TYPE':
                        candidates.push(this.generate.declaration(this.getTokensFromPositionUntilEOL()));
                    break;
                    case 'T_ID':
                        candidates.push(this.generate.attribution(this.getTokensFromPositionUntilEOL()));
                    break;
                }
            } else {

            }
        }

        console.log(candidates);
    },
    getTokensFromPositionUntilEnd() {
        var result = [];
        
        for (var i = position; i < this.tokens.length; i++) {
            var token = this.tokens[i];

            if (token.name !== 'T_EOL') {
                result.push(token);
            } else {
                position = i;
                return new MachineCodeBlock(result);
            }
        }
    },
    getTokensFromPositionUntilEOL() {
        var result = [];

        for (var i = position; i < this.tokens.length; i++) {
            var token = this.tokens[i];

            if (token.name !== 'T_EOL') {
                result.push(token);
            } else {
                position = i;
                return result;
            }
        }
    },
    generate: {
        declaration(tokens) {
            var result = '';

            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i];

                if (token.name === 'T_ID') {
                    result += token.lexeme + ' ';
                } else if (token.name === 'T_ATOP') {
                    result += token.lexeme + ' ';
                } else if (token.name === 'T_ID' || token.name === 'T_NUMBER' || token.name === 'T_TEXT' || token.name === 'T_BOOLEAN') {
                    result += token.lexeme + '\n';
                }
            }

            return result;
        },
        attribution(tokens) {
            console.log(tokens);
        },
        selection() {

        }
    }
};
