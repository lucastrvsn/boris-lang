'use strict'

var errors = require('../errors.js');

class Semantic {
    constructor(tokens, rules) {
        this.tokens = tokens;
        this.rules = rules;
        this.success = false;
        this.position = 0;
    }

    init() {
        this.findFunctionMain().then(() => {
            // while (!this.success) {
            //     var token = this.tokens[this.position++];
            // }
        }).catch(err => {
            errors.MAIN_NOT_FOUND();
        });
    }

    findFunctionMain() {
        return new Promise((resolve, reject) => {
            while (true) {
                var token = this.tokens[this.position++];
                if (token) {
                    if (token.name === 'T_FUNC') {
                        token = this.tokens[this.position];
                        if (token.name === 'T_MAIN') {
                            return resolve();
                        }
                    }
                } else {
                    return reject('Function main not finded.');
                }
            }
        });
    }
}

module.exports = Semantic;
