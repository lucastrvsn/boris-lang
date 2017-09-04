'use strict'

var chalk = require('chalk');

module.exports = {
    MAIN_NOT_FOUND() {
        console.log(chalk.red('[ERROR] function main not founded.'));
    }
};
