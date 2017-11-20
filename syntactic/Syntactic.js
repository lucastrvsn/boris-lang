'use strict'

var errors = require('../errors.js');
var rules = require('./rules.js');

class Syntactic {
    constructor(tokens) {
        this.tokens = tokens;
        this.success = false;
        this.position = 0;
    }

    init() {
        // Procura pelo main e, caso encontre, chama a função para
        // detecção dos comandos
        if (rules.main(this)) {
            this.success = true;
            return true;
        } else {
            this.success = false;
            return false
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
