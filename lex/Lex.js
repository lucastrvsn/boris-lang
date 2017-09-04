'use strict';

var fs = require('fs');
var chalk = require('chalk');

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
        var isString = false;
        var isComment = false;

        while (this.position < this.inputFromFile.length) {
            var letter = this.inputFromFile[this.position];

            if (letter === '\n') {
                this.line++;
            }

            // Verifição do input que está sendo recebido.
            this.position++;

            if (!isString && !isComment && (letter === ' ' || letter === '\n')) {
                return this.verify(candidate);
            } else if (!isString && !isComment && letter === '#') {
                isComment = true;
            } else if (!isString && isComment && letter === '\n') {
                isComment = false;
            } else if (!isString && letter === '\'') {
                isString = true;
            } else if (isString) {
                if (letter === '\'') {
                    isString = false;
                    return this.verify(candidate, true);
                }

                candidate += letter;
            } else if (!isString) {
                candidate += letter;
            }
        }

        return -1;
    }

    verify(candidate, string) {
        candidate = candidate.trim();

        var position = {
            position: this.position,
            line: this.line
        };

        if (candidate === '') {
            return null;
        } else if (candidate in this.tokens) {
            return this.tokens[candidate](position);
        } else if (string) {
            return this.tokens['text'](position, candidate);
        } else if (!isNaN(candidate)) {
            return this.tokens['number'](position, candidate);
        }

        // Caso não for nenhuma das opções acima, é retornado um token
        return this.tokens['id'](position, candidate);
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

    print(tokens) {
        tokens.forEach(t => {
            console.log(chalk.yellow('Token: ') + t.name);
            console.log(chalk.yellow('Lexeme: ') + t.lexeme);
            console.log(chalk.yellow('Position: ') + t.position.position + ', ' + t.position.line);
            console.log(chalk.blue('------'));
        });
    }
}

module.exports = Lex;
