'use strict'

var chalk = require('chalk');

module.exports = {
    'T_FUNC': s => {

    },
    'T_MAIN': s => {
        s.position = 0;

        // Tentando encontrar a função main dentro do código
        // fonte fornecido como input
        while (true) {
            var token = s.actual();
            s.next();

            if (token) {
                if (token.name === 'T_FUNC') {
                    token = s.actual();
                    s.next();

                    if (token.name === 'T_MAIN') {
                        token = s.actual();
                        s.next();

                        if (token.name === 'T_BEGIN') {
                            console.log('aa');
                            return s.rules['COMMANDS'](s);
                        }
                    }
                }
            } else {
                throw 'Function main not founded.';
                return false;
            }
        }
    },
    'T_IF': s => {

    },
    'T_ELSE': s => {

    },
    'T_ROP': s => {

    },
    'T_LOP': s => {

    },
    'T_EOP': s => {

    },
    'T_ATOP': s => {

    },
    'T_UOP': s => {

    },
    'T_AROP': s => {

    },
    'T_BOOLEAN': s => {

    },
    'T_TYPE': s => {
        console.log('type');
    },
    'T_FOR': s => {

    },
    'T_WHILE': s => {

    },
    'T_BEGIN': s => {

    },
    'T_END': s => {

    },
    'T_NUMBER': s => {

    },
    'T_TEXT': s => {

    },
    'T_ID': s => {

    },
    'T_RETURN': s => {

    },
    'COMMANDS': s => {
        while (s.rules['COMMAND'](s)) {
            s.next();
        }

        return true;
    },
    'COMMAND': s => {
        var token = s.actual();

        // Selecionando qual será a regra a ser seguida
        switch (token.name) {
            case 'T_TYPE':
                return s.rules['DECLARATION'](s);
            break;
            case 'T_ID':
                return s.rules['ATTRIBUTION'](s);
            break;
            case 'T_FOR' || 'T_WHILE':
                return s.rules['LOOP'](s);
            break;
            case 'T_IF':
                return s.rules['SELECTION'](s);
            break;
            default:
                console.log('ERROR');
                return false;
            break;
        }
    },
    'ATTRIBUTION': s => {
        var token = s.actual();

        if (token.name === 'T_ID') {
            token = s.next();

            if (token.name === 'T_ATOP') {
                if (s.rules['TERM'](s)) {
                    console.log(chalk.green('✔ ATTRIBUTION OK'));
                    return true;
                }
            }
        }

        return false;
    },
    'DECLARATION': s => {
        var token = s.actual();

        if (token.name === 'T_TYPE') {
            token = s.next();

            if (token.name === 'T_ID') {
                token = s.next();

                if (token.name === 'T_ATOP') {
                    if (s.rules['TERM'](s)) {
                        console.log(chalk.green('✔ DECLARATION OK'));
                        return true;
                    }
                }
            }
        }

        return false;
    },
    'LOOP': s => {
        var token = s.actual();

        if (token.name === 'T_WHILE') {
            token = s.next();

            if (s.rules['LOGICAL'](s)) {
                token = s.next();

                if (token.name === 'T_BEGIN') {
                    s.rules['COMMANDS'](s);
                }
            }
        } else if (token.name === 'T_FOR') {

        }

        return false;
    },
    'SELECTION': s => {
        console.log('✔ SELECTION OK');
        return true;
    },
    'LOGICAL': s => {

    },
    'RELATIONAL': s => {

    },
    'ARITHMETIC': s => {

    },
    'UNARY': s => {
        var token = s.next();

        if (s.rules['TERM'](s)) {
            return true;
        } else if () {

        }

        console.log(chalk.red('✔ UNARY ERROR'));
        return false;
    },
    'TERM': s => {
        var token = s.actual();

        if (token.name === 'T_NUMBER' || token.name === 'T_TEXT' || token.name === 'T_BOOLEAN') {
            console.log(chalk.green('✔ TERM OK'));
            return true;
        }

        console.log(chalk.red('✔ TERM ERROR'));
        return false;
    }
};
