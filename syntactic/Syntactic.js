'use strict'

var errors = require('../errors.js');

class Syntactic {
    constructor(tokens, rules) {
        this.tokens = tokens;
        this.rules = rules;
        this.success = false;
        this.position = 0;
    }

    init() {
        // Procura pelo main e, caso encontre, chama a função para
        // detecção dos comandos
        if (this.rules['T_MAIN'](this)) {
            this.rules['COMMANDS'](this);
        }
    }

    actual() {
        return this.tokens[this.position];
    }

    next() {
        return this.tokens[++this.position];
    }

    prev() {
        return this.tokens[--this.position];
    }
}

module.exports = Syntactic;
