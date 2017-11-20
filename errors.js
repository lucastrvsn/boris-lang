'use strict'

var chalk = require('chalk');

module.exports = {
    print: {
        MAIN_NOT_FOUND() {
            console.log(chalk.red('❌  function main not founded.'));
        },
        GENERIC_ERROR(name, line) {
            console.log(chalk.red('❌  ' + name + ' at line ' + line));
        },
        TOKEN_EXPECTED(name) {
            console.log(chalk.yellow(name + ' was expected'));
        },
        VARIABLE_NOT_FOUNDED(name) {
            console.log(chalk.red('❌  Variable \'' + name + '\' does not exist.'));
        },
        VARIABLE_ALREADY_DECLARED(name) {
            console.log(chalk.red('❌  Variable \'' + name + '\' already declared.'));
        },
        UNEXPECTED_TOKEN(name, line) {
            console.log(chalk.red('❌  Unexpected token \'' + name + '\' at line ' + line));
        }
    }
};
