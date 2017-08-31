'use strict';

var fs = require('fs');
var Token = require('./Token.js');

class Lex {
    constructor(path, tokens) {
        this.path = path;
        this.tokens = tokens;
        this.position = 0;
    }

    next() {
        var candidate = '';

        for ( ; this.position < this.inputFromFile.length; this.position++) {
            var letter = this.inputFromFile[this.position];

            // Verifição do input que está sendo recebido.
            if (letter === ' ' || letter === '\n') {
                this.position++;
                return this.verify(candidate);
            } else {
                candidate += letter;
            }
        }

        return -1;
    }

    last() {

    }

    verify(candidate) {
        if (candidate === '') {
            return null;
        } else if (candidate === '\n') {
            return 'barra n';
        }

        return candidate.trim();
    }

    isEnd() {
        if (this.position >= this.inputFromFile.length) {
            return true;
        }

        return false;
    }

    init() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }

                this.inputFromFile = data;
                return resolve(this.inputFromFile);
            });
        });
    }
}

module.exports = Lex;
