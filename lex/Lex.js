'use strict';

var fs = require('fs');
var Token = require('./Token.js');

class Lex {
    constructor(path, tokens) {
        this.path = path;
        this.tokens = tokens;
        this.position = 0;
        this.line = 1;
    }

    next() {
        var candidate = '';

        while (this.position < this.inputFromFile.length) {
            var letter = this.inputFromFile[this.position];

            if (letter === '\n') {
                this.line++;
            }

            // Verifição do input que está sendo recebido.
            if (letter === ' ' || letter === '\n') {
                this.position++;
                return this.verify(candidate);
            } else {
                this.position++;
                candidate += letter;
            }
        }

        return -1;
    }

    last() {

    }

    verify(candidate) {
        candidate = candidate.trim();

        var position = {
            position: this.position,
            line: this.line
        };

        if (candidate === '') {
            return null;
        } else if (candidate in this.tokens) {
            return this.tokens[candidate](position);
        } else if (!isNaN(candidate)) {
            return this.tokens['number'](position, candidate);
        } else {
            return this.tokens['id'](position, candidate);
        }
    }

    isEnd() {
        if (this.position >= this.inputFromFile.length) {
            return true;
        }

        return false;
    }

    // Read the file and return entire file readed.
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
