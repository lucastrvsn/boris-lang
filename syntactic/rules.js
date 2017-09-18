'use strict'

var chalk = require('chalk');

module.exports = {
    arithmetic(syntatic) {
        var token = syntatic.actual();
        console.log(chalk.blue('[ARITHMETIC] Verificando: ') + token.lexeme);

        if (this.unary(syntatic)) {
            token = syntatic.next();

            if (token.name === 'T_AROP') {
                token = syntatic.next();

                if (this.arithmetic(syntatic)) {
                    return true;
                } else {
                    syntatic.prev();
                    console.log(chalk.red('❌ ARITHMETIC ERROR at line ' + token.position.line));
                    console.log(chalk.yellow('Arithmetic Expression was expected'));
                }
            }

            return true;
        } else {
            console.log(chalk.red('❌ ARITHMETIC ERROR at line ' + token.position.line));
            console.log(chalk.yellow('Unary Expression was expected'));
        }

        return false;
    },
    attribution(syntatic) {
        var token = syntatic.actual();
        console.log(chalk.blue('[ATTRIBUTION] Verificando: ') + token.lexeme);

        if (token.name === 'T_ID') {
            token = syntatic.next();
            console.log(chalk.blue('[ATTRIBUTION] Verificando: ') + token.lexeme);

            if (token.name === 'T_ATOP') {
                syntatic.next();

                if (this.arithmetic(syntatic)) {
                    console.log(chalk.green('✔ ATTRIBUTION OK'));
                    return true;
                } else {
                    console.log(chalk.red('❌ ATTRIBUTION ERROR at line ' + token.position.line));
                    console.log(chalk.yellow('Arithmetic Expression was expected'));
                }
            } else {
                console.log(chalk.red('❌ ATTRIBUTION ERROR at line ' + token.position.line));
                console.log(chalk.yellow('Token ATOP was expected'));
            }
        }

        return false;
    },
    command(syntatic) {
        var token = syntatic.actual();

        if (token) {
            console.log(chalk.blue('[COMMAND] ') + 'Verificando: ' + token.lexeme + ', ' + token.name);

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
                default:
                    console.log('Unexpected token: \'' + token.lexeme + '\' at line ' + token.position.line);
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
        console.log(chalk.blue('[DECLARATION] Verificando: ') + token.lexeme);

        // Tipo da variavel
        if (token.name === 'T_TYPE') {
            token = syntatic.next();

            // ID para a variável
            if (token.name === 'T_ID') {
                token = syntatic.next();

                // Atribuição
                if (token.name === 'T_ATOP') {
                    syntatic.next();
                    if (this.unary(syntatic)) {
                        console.log(chalk.green('✔ DECLARATION OK'));
                        syntatic.next();
                        return true;
                    } else {
                        console.log(chalk.red('❌ DECLARATION ERROR at line ' + token.position.line));
                        console.log(chalk.yellow('Unary Expression was expected'));
                    }
                } else {
                    console.log(chalk.red('❌ DECLARATION ERROR at line ' + token.position.line));
                    console.log(chalk.yellow('Token ATOP was expected'));
                }
            } else {
                console.log(chalk.red('❌ DECLARATION ERROR at line ' + token.position.line));
                console.log(chalk.yellow('Token ID was expected'));
            }
        }

        return false;
    },
    loop_for(syntatic) {
        var token = syntatic.actual();
        console.log(chalk.blue('[LOOP_FOR] Verificando: ') + token.lexeme);

        if (token.name === 'T_FOR') {
            token = syntatic.next();

            if (token.name === 'T_ID' || syntatic.rules['DECLARATION'](s)) {
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
                                    console.log(chalk.green('✔ LOOP FOR OK'));
                                    return true;
                                } else {
                                    // ERROR, END EXPECTED
                                    console.log(chalk.red('❌ FOR ERROR at line ' + token.position.line));
                                    console.log(chalk.yellow('Token END was expected'));
                                }
                            } else {
                                // ERROR, BEGIN EXPECTED
                                console.log(chalk.red('❌ FOR ERROR at line ' + token.position.line));
                                console.log(chalk.yellow('Token BEGIN was expected'));
                            }
                        } else {
                            // ERROR, DESC OR ASC EXPECTED
                            console.log(chalk.red('❌ FOR ERROR at line ' + token.position.line));
                            console.log(chalk.yellow('Token DESC or ASC was expected'));
                        }
                    } else {
                        // ERROR, LOGICAL EXPRESSION EXPECTED
                        console.log(chalk.red('❌ FOR ERROR at line ' + token.position.line));
                        console.log(chalk.yellow('Logical Expression was expected'));
                    }
                } else {
                    // ERROR, UNTIL EXPECTED
                    console.log(chalk.red('❌ FOR ERROR at line ' + token.position.line));
                    console.log(chalk.yellow('Token UNTIL was expected'));
                }
            } else {
                // ERROR, ID OR DECLARATION EXPECTED
                console.log(chalk.red('❌ FOR ERROR at line ' + token.position.line));
                console.log(chalk.yellow('Token ID or Declaration was expected'));
            }
        } else {
            // ERROR, FOR TOKEN EXPECTED
            console.log(chalk.red('❌ FOR ERROR at line ' + token.position.line));
            console.log(chalk.yellow('Token FOR was expected'));
        }

        return false;
    },
    logical(syntatic) {
        var token = syntatic.actual();
        console.log(chalk.blue('[LOGICAL] Verificando: ') + token.lexeme);

        if (this.relational(syntatic)) {
            token = syntatic.next();
            console.log(chalk.blue('[LOGICAL] Verificando: ') + token.lexeme);

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

                            if (commands && commands.name !== undefined && commands.name === 'T_END') {
                                console.log(chalk.cyanBright('\n████████████████████████████████████████████'));
                                console.log(chalk.bgMagentaBright.black('ÕOOHHH ÃAAAAHH OH AAHH OOÕOOHH AAAWWNNN OOOO'));
                                console.log(chalk.cyanBright('████████████████████████████████████████████'));
                                return true;
                            } else {
                                console.log(chalk.red('❌ MAIN ERROR at line ' + token.position.line));
                                console.log(chalk.yellow('Token END was expected'));
                            }
                        } else {
                            console.log(chalk.red('❌ MAIN ERROR at line ' + token.position.line));
                            console.log(chalk.yellow('Token BEGIN was expected'));
                        }
                    }
                }
            } else {
                console.log(chalk.red('Main function not founded!'));
                return false;
            }
        }
    },
    relational(syntatic) {
        var token = syntatic.actual();
        console.log(chalk.blue('[RELATIONAL] Verificando: ') + token.lexeme);

        if (this.arithmetic(syntatic)) {
            token = syntatic.actual();
            console.log(chalk.blue('[RELATIONAL] Verificando: ') + token.lexeme);

            if (token.name === 'T_ROP') {
                syntatic.next();
                return this.relational(syntatic);
            } else {
                syntatic.prev();
            }

            return true;
        } else {
            console.log(chalk.red('❌ RELATIONAL ERROR at line ' + token.position.line));
            console.log(chalk.yellow('Arithmetic Expression was expected'));
        }

        return false;
    },
    selection(syntatic) {
        var token = syntatic.actual();
        console.log(chalk.blue('[SELECTION] Verificando: ') + token.lexeme);

        if (token.name === 'T_IF') {
            syntatic.next();

            if (this.logical(syntatic)) {
                token = syntatic.next();

                if (token.name === 'T_BEGIN') {
                    token = syntatic.next();

                    if (this.commands(syntatic).name === 'T_END') {
                        console.log(chalk.green('✔ SELECTION OK'));
                        return true;
                    } else {
                        console.log(chalk.red('❌ SELECTION ERROR at line ' + token.position.line));
                        console.log(chalk.yellow('Token END was expected'));
                    }
                } else {
                    console.log(chalk.red('❌ SELECTION ERROR at line ' + token.position.line));
                    console.log(chalk.yellow('Token BEGIN was expected'));
                }
            } else {
                console.log(chalk.red('❌ SELECTION ERROR at line ' + token.position.line));
                console.log(chalk.yellow('Logical Expression was expected'));
            }
        }

        return false;
    },
    term(syntatic) {
        var token = syntatic.actual();
        console.log(chalk.blue('[TERM] Verificando: ') + token.lexeme);

        if (token.name === 'T_NUMBER' || token.name === 'T_TEXT' || token.name === 'T_BOOLEAN' || token.name === 'T_ID') {
            console.log(chalk.green('✔ TERM OK'));
            return true;
        }

        console.log(chalk.red('❌ TERM ERROR at line ' + token.position.line));
        return false;
    },
    unary(syntatic) {
        var token = syntatic.actual();
        console.log(chalk.blue('[UNARY] Verificando: ') + token.lexeme);

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

        console.log(chalk.red('✔ UNARY ERROR'));
        return false;
    },
    loop_while(syntatic) {
        var token = syntatic.actual();
        console.log(chalk.blue('[LOOP] Verificando: ') + token.lexeme);

        if (token.name === 'T_WHILE') {
            syntatic.next();

            if (this.logical(syntatic)) {
                token = syntatic.next();

                if (token.name === 'T_BEGIN') {
                    token = syntatic.next();

                    if (this.commands(syntatic).name === 'T_END') {
                        console.log(chalk.green('✔ LOOP OK'));
                        return true;
                    } else {
                        console.log(chalk.red('❌ LOOP WHILE ERROR at line ' + token.position.line));
                        console.log(chalk.yellow('Token END was expected'));
                    }
                } else {
                    console.log(chalk.red('❌ LOOP WHILE ERROR at line ' + token.position.line));
                    console.log(chalk.yellow('Token BEGIN was expected'));
                }
            } else {
                console.log(chalk.red('❌ LOOP WHILE ERROR at line ' + token.position.line));
                console.log(chalk.yellow('Logical Expression was expected'));
            }
        }

        return false;
    },
}
