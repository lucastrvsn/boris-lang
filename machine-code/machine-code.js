'use strict'

var fs = require('fs');
var Chance = require('chance');
var chance = new Chance();

var finalFile = '';
var position = 0;

module.exports = {
    init(tokens) {
        this.tokens = tokens;

        position = 4; // Começa de 4 para pular a função main
        this.verify();

        return finalFile;
    },
    verify() {
        for (; position < this.tokens.length; position++) {
            var token = this.tokens[position];
            
            switch (token.name) {
                case 'T_TYPE':
                    return this.generate.declaration(this);
                break;
                case 'T_ID':
                    return this.generate.attribution(this);
                break;
                case 'T_IF':
                    return this.generate.selection(this);
                break;
                case 'T_WHILE':
                    return this.generate.loop.while(this);
                break;
                case 'T_FOR':
                    return this.generate.loop.for(this);
                break;
                case 'T_END':
                    position++;
                    return true;
                break;
            }
        }
    },
    getTokensFromPositionUntilEnd() {
        var result = [];
        
        for (var i = position; i < this.tokens.length; i++) {
            var token = this.tokens[i];

            if (token.name !== 'T_EOL') {
                result.push(token);
            } else {
                position = i + 1;
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
                position = i + 1;
                return result;
            }
        }
    },
    generate: {
        declaration(self) {
            var tokens = self.getTokensFromPositionUntilEOL();

            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i];

                if (token.name === 'T_ID') {
                    finalFile += token.lexeme + ' ';
                } else if (token.name === 'T_ATOP') {
                    finalFile += token.lexeme + ' ';
                } else if (token.name === 'T_ID' || token.name === 'T_NUMBER' || token.name === 'T_BOOLEAN') {
                    finalFile += token.lexeme + '\n';
                } else if (token.name === 'T_TEXT') {
                    finalFile += '\'' + token.lexeme + '\'\n';
                }
            }

            self.verify();
            return true;
        },
        attribution(self) {
            var tokens = self.getTokensFromPositionUntilEOL();
            var result = '';

            // i = 2
            // i = 2 + a

            if (tokens[0].name === 'T_ID') {
                result += tokens[0].lexeme + ' ';

                if (tokens[1].name === 'T_ATOP') {
                    result += tokens[1].lexeme + ' ';

                    if (tokens[3] !== undefined) {
                        var operators = [];
                        var varTemp = 0;
                        result = '';
                        
                        for (var i = 0; i < tokens.length; i++) {
                            operators.push(tokens[i].lexeme);
                        }

                        for (var n = 0; n < operators.length; n++) {
                            if (operators[n] === '*' || operators[n] === '/') {
                                if (operators.length > 3) {
                                    varTemp++;
                                    var oprTemp = '';
                                    
                                    oprTemp += operators[n - 1] + ' ' + operators[n] + ' ' + operators[n + 1];
                                    operators.splice(n, 2);
                                    operators[n - 1] = 't' + varTemp;
                                    
                                    result += operators[n - 1] + " = " + oprTemp + '\n';
                                    n = 0;
                                }
                            }
                        }

                        for (var n = 0; n < operators.length; n++) {
                            if (operators[n] === '+' || operators[n] === '-') {
                                if (operators.length > 3) {
                                    varTemp++;
                                    var oprTemp = '';

                                    oprTemp += operators[n - 1] + ' ' + operators[n] + ' ' + operators[n + 1];
                                    operators.splice(n, 2);
                                    operators[n - 1] = 't' + varTemp;

                                    result += operators[n - 1] + " = " + oprTemp + "\n";
                                    n = 0;
                                }
                            }
                        }

                        console.log(operators);
    
                        result += tokens[0].lexeme + " = ";
                        for(var n = 2; n < operators.length; n++) {
                            result += operators[n];
                        }
                        result += "\n";
                    } else {
                        result += tokens[2].lexeme + '\n';
                    }
                }
            } else if (token.name === 'T_ID' || token.name === 'T_NUMBER' || token.name === 'T_BOOLEAN') {
                result += token.lexeme + '\n';
            } else if (token.name === 'T_TEXT') {
                result += '\'' + token.lexeme + '\'\n';
            }

            result += '\n';
            finalFile += result;
            self.verify();
            return true;
        },
        selection(self) {
            var tokens = self.getTokensFromPositionUntilEOL();
            var hash = chance.string({ alpha: true, length: 8 });
            
            finalFile += 'goto begin_if_' + hash + '\n';
            finalFile += 'begin_if_' + hash + ': ';

            // Generate signature for if
            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i];

                if (token.name === 'T_IF') {
                    finalFile += token.lexeme + ' ';
                } else if (token.name === 'T_BEGIN') {
                    finalFile += 'goto end_if_' + hash + '\n';
                } else {
                    finalFile += token.lexeme + ' ';
                }
            }

            if (self.verify()) {
                finalFile += 'end_if_' + hash + ': ';
                self.verify();
            }

            return true;
        },
        loop: {
            while(self) {
                var tokens = self.getTokensFromPositionUntilEOL();
                var hash = chance.string({ alpha: true, length: 8 });

                finalFile += 'goto begin_while_' + hash + '\n';
                finalFile += 'begin_while_' + hash + ': ';
    
                // Generate signature for if
                for (var i = 0; i < tokens.length; i++) {
                    var token = tokens[i];
    
                    if (token.name === 'T_WHILE') {
                        finalFile += token.lexeme + ' ';
                    } else if (token.name === 'T_BEGIN') {
                        finalFile += 'goto end_while_' + hash + '\n';
                    } else {
                        finalFile += token.lexeme + ' ';
                    }
                }
    
                if (self.verify()) {
                    finalFile += 'goto begin_while_' + hash + '\n';
                    finalFile += 'end_while_' + hash + ': ';
                    self.verify();
                }
    
                return true;
            },
            for(self) {
                var tokens = self.getTokensFromPositionUntilEOL();
                var hash = chance.string({ alpha: true, length: 8 });

                finalFile += 'goto begin_for_' + hash + '\n';
                finalFile += 'begin_for_' + hash + ': ';
    
                // Generate signature for if
                for (var i = 0; i < tokens.length; i++) {
                    var token = tokens[i];
    
                    if (token.name === 'T_FOR') {
                        finalFile += token.lexeme + ' ';
                    } else if (token.name === 'T_BEGIN') {
                        finalFile += 'goto end_for_' + hash + '\n';
                    } else {
                        finalFile += token.lexeme + ' ';
                    }
                }
    
                if (self.verify()) {
                    finalFile += 'goto begin_for_' + hash + '\n';
                    finalFile += 'end_for_' + hash + ': ';
                    self.verify();
                }
    
                return true;
            }
        }
    }
};
