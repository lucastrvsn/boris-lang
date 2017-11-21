'use strict'

var errors = require('../errors.js');
var semantic = require('./semantic.js');

module.exports = {
    arithmetic(syntatic) {
        var token = syntatic.actual();

        if (!semantic.isVariable(token) && !semantic.exists(token.lexeme)) {
            console.log(token);
            errors.print.VARIABLE_NOT_FOUNDED(token.lexeme);
            return false;
        }

        if (this.unary(syntatic)) {
            token = syntatic.next();

            if (token.name === 'T_AROP') {
                token = syntatic.next();

                if (this.arithmetic(syntatic)) {
                    return true;
                } else {
                    syntatic.prev();
                    errors.print.GENERIC_ERROR('Arithmetic Error', token.position.line);
                    errors.print.TOKEN_EXPECTED('Arithmetic Expression');
                }
            }

            return true;
        } else {
            errors.print.GENERIC_ERROR('Arithmetic Error', token.position.line);
            errors.print.TOKEN_EXPECTED('Unary Expression');
        }

        return false;
    },
    attribution(syntatic) {
        var token = syntatic.actual();

        if (token.name === 'T_ID') {
            if (!semantic.exists(token.lexeme)) {
                errors.print.VARIABLE_NOT_FOUNDED(token.lexeme);
                return false;
            }

            token = syntatic.next();

            if (token.name === 'T_ATOP') {
                token = syntatic.next();

                if (this.arithmetic(syntatic)) {
                    return true;
                } else {
                    errors.print.GENERIC_ERROR('Attribution Error', token.position.line);
                    errors.print.TOKEN_EXPECTED('Arithmetic Expression');
                }
            } else {
                errors.print.GENERIC_ERROR('Attribution Error', token.position.line);
                errors.print.TOKEN_EXPECTED('Token ATOP');
            }
        }

        return false;
    },
    command(syntatic) {
        var token = syntatic.actual();

        if (token) {
            // Selecionando qual será a regra a ser seguida
            switch (token.name) {
                case 'T_TYPE':
                    return this.declaration(syntatic);
                break;
                case 'T_ID':
                    return this.attribution(syntatic);
                break;
                case 'T_WHILE':
                    return this.loop_while(syntatic);
                break;
                case 'T_FOR':
                    return this.loop_for(syntatic);
                break;
                case 'T_IF':
                    return this.selection(syntatic);
                break;
                case 'T_END':
                    syntatic.next();
                    return token;
                break;
                case 'T_EOL':
                    syntatic.next();
                    return this.command(syntatic);
                break;
                default:
                    errors.print.UNEXPECTED_TOKEN(token.lexeme, token.position.line);
                    return false;
                break;
            }
        }
    },
    commands(syntatic) {
        var result = true;

        while (result) {
            result = this.command(syntatic);

            if (result && result.name != null) {
                return result;
            }
        }

        return result;
    },
    declaration(syntatic) {
        var token = syntatic.actual();

        // Tipo da variavel
        if (token.name === 'T_TYPE') {
            var tokenType = token.lexeme;

            token = syntatic.next();

            // ID para a variável
            if (token.name === 'T_ID') {
                var tokenName = token.lexeme;

                token = syntatic.next();

                // Atribuição
                if (token.name === 'T_ATOP') {
                    syntatic.next();

                    if (this.unary(syntatic)) {
                        token = syntatic.actual();

                        if (!semantic.declare(tokenName, tokenType, token.lexeme)) {
                            errors.print.VARIABLE_ALREADY_DECLARED(tokenName);
                            return false;
                        }

                        syntatic.next();
                        return true;
                    } else {
                        errors.print.GENERIC_ERROR('Declaration Error', token.position.line);
                        errors.print.TOKEN_EXPECTED('Unary Expression');
                    }
                } else {
                    errors.print.GENERIC_ERROR('Declaration Error', token.position.line);
                    errors.print.TOKEN_EXPECTED('Token ATOP');
                }
            } else {
                errors.print.GENERIC_ERROR('Declaration Error', token.position.line);
                errors.print.TOKEN_EXPECTED('Token ID');
            }
        }

        return false;
    },
    loop_for(syntatic) {
        var token = syntatic.actual();

        if (token.name === 'T_FOR') {
            token = syntatic.next();

            if (token.name === 'T_ID') {
                if (!semantic.exists(token.lexeme)) {
                    errors.print.VARIABLE_NOT_FOUNDED(token.lexeme);
                    return false;
                }

                token = syntatic.next();

                if (token.name === 'T_UNTIL') {
                    token = syntatic.next();

                    if (this.logical(syntatic)) {
                        token = syntatic.next();

                        if (token.name === 'T_DESC' || token.name === 'T_ASC') {
                            token = syntatic.next();

                            if (token.name === 'T_BEGIN') {
                                token = syntatic.next();
                                var commands = this.commands(syntatic);

                                if (commands.name != undefined && commands.name === 'T_END') {
                                    return true;
                                } else {
                                    // ERROR, END EXPECTED
                                    errors.print.GENERIC_ERROR('Loop For Error', token.position.line);
                                    errors.print.TOKEN_EXPECTED('Token END');
                                }
                            } else {
                                // ERROR, BEGIN EXPECTED
                                errors.print.GENERIC_ERROR('Loop For Error', token.position.line);
                                errors.print.TOKEN_EXPECTED('Token BEGIN');
                            }
                        } else {
                            // ERROR, DESC OR ASC EXPECTED
                            errors.print.GENERIC_ERROR('Loop For Error', token.position.line);
                            errors.print.TOKEN_EXPECTED('Token DESC or ASC');
                        }
                    } else {
                        // ERROR, LOGICAL EXPRESSION EXPECTED
                        errors.print.GENERIC_ERROR('Loop For Error', token.position.line);
                        errors.print.TOKEN_EXPECTED('Logical Expression');
                    }
                } else {
                    // ERROR, UNTIL EXPECTED
                    errors.print.GENERIC_ERROR('Loop For Error', token.position.line);
                    errors.print.TOKEN_EXPECTED('Token UNTIL');
                }
            } else {
                // ERROR, ID OR DECLARATION EXPECTED
                errors.print.GENERIC_ERROR('Loop For Error', token.position.line);
                errors.print.TOKEN_EXPECTED('Token ID');
            }
        } else {
            // ERROR, FOR TOKEN EXPECTED
            errors.print.GENERIC_ERROR('Loop For Error', token.position.line);
            errors.print.TOKEN_EXPECTED('Token FOR');
        }

        return false;
    },
    logical(syntatic) {
        var token = syntatic.actual();

        if (this.relational(syntatic)) {
            token = syntatic.next();

            if (token.name === 'T_LOP') {
                syntatic.next();
                return this.logical(syntatic);
            } else {
                syntatic.prev();
            }

            return true;
        }

        return false;
    },
    main(syntatic) {
        syntatic.position = 0;

        // Tentando encontrar a função main dentro do código
        // fonte fornecido como input
        while (true) {
            var token = syntatic.actual();
            syntatic.next();

            if (token) {
                if (token.name === 'T_FUNC') {
                    token = syntatic.actual();
                    syntatic.next();

                    if (token.name === 'T_MAIN') {
                        token = syntatic.actual();
                        syntatic.next();

                        if (token.name === 'T_BEGIN') {
                            var commands = this.commands(syntatic);
                            console.log(commands);

                            if (commands && commands.name !== undefined && commands.name === 'T_END') {
                                return true;
                            } else {
                                errors.print.GENERIC_ERROR('Function Main Error', token.position.line);
                                errors.print.TOKEN_EXPECTED('Token END');
                            }
                        } else {
                            errors.print.GENERIC_ERROR('Function Main Error', token.position.line);
                            errors.print.TOKEN_EXPECTED('Token BEGIN');
                        }
                    }
                }
            } else {
                errors.print.MAIN_NOT_FOUND();
                return false;
            }
        }
    },
    relational(syntatic) {
        var token = syntatic.actual();

        if (this.arithmetic(syntatic)) {
            token = syntatic.actual();

            if (token.name === 'T_ROP' || token.name === 'T_EOP') {
                syntatic.next();
                return this.relational(syntatic);
            } else {
                syntatic.prev();
            }

            return true;
        } else {
            errors.print.GENERIC_ERROR('Relational Error', token.position.line);
            errors.print.TOKEN_EXPECTED('Arithmetic Expression');
        }

        return false;
    },
    selection(syntatic) {
        var token = syntatic.actual();

        if (token.name === 'T_IF') {
            syntatic.next();

            if (this.logical(syntatic)) {
                token = syntatic.next();

                if (token.name === 'T_BEGIN') {
                    token = syntatic.next();

                    if (this.commands(syntatic).name === 'T_END') {
                        return true;
                    } else {
                        errors.print.GENERIC_ERROR('Selection Error', token.position.line);
                        errors.print.TOKEN_EXPECTED('Token END');
                    }
                } else {
                    errors.print.GENERIC_ERROR('Selection Error', token.position.line);
                    errors.print.TOKEN_EXPECTED('Token BEGIN');
                }
            } else {
                errors.print.GENERIC_ERROR('Selection Error', token.position.line);
                errors.print.TOKEN_EXPECTED('Logical Expression');
            }
        }

        return false;
    },
    term(syntatic) {
        var token = syntatic.actual();

        if (token.name === 'T_NUMBER' || token.name === 'T_TEXT' || token.name === 'T_BOOLEAN' || token.name === 'T_ID') {
            return true;
        }

        errors.print.GENERIC_ERROR('Term Error', token.position.line);
        return false;
    },
    unary(syntatic) {
        var token = syntatic.actual();

        if (this.term(syntatic)) {
            return true;
        } else if (token.name === 'T_ID') {
            token = syntatic.next();

            if (token.name === 'T_UOP') {
                return true;
            } else {
                syntatic.prev();
            }
        }

        errors.print.GENERIC_ERROR('Unary Error', token.position.line);
        return false;
    },
    loop_while(syntatic) {
        var token = syntatic.actual();

        if (token.name === 'T_WHILE') {
            syntatic.next();

            if (this.logical(syntatic)) {
                token = syntatic.next();

                if (token.name === 'T_BEGIN') {
                    token = syntatic.next();

                    if (this.commands(syntatic).name === 'T_END') {
                        return true;
                    } else {
                        errors.print.GENERIC_ERROR('Loop While Error', token.position.line);
                        errors.print.TOKEN_EXPECTED('Token END');
                    }
                } else {
                    errors.print.GENERIC_ERROR('Loop While Error', token.position.line);
                    errors.print.TOKEN_EXPECTED('Token BEGIN');
                }
            } else {
                errors.print.GENERIC_ERROR('Loop While Error', token.position.line);
                errors.print.TOKEN_EXPECTED('Logical Expression');
            }
        }

        return false;
    },
}
