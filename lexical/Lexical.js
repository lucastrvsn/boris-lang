'use strict';

var fs = require('fs');
var chalk = require('chalk');

var Token = require('./Token.js');
var tokens = require('./tokens.js');

class Lexical {
    constructor(path) {
        this.path = path;
        this.tokens = tokens;
        this.tokenArray = [];
        this.position = 0;
        this.line = 1;
    }

    next() {
        var candidate = '';
        var isString = false;
        var isComment = false;

        while (this.position < this.inputFromFile.length) {
            var letter = this.inputFromFile[this.position];

            // Verifição do input que está sendo recebido.
            this.position++;

            if (!isString && !isComment && (letter === ' ' || letter === '\n')) {
                if (letter === ' ') {
                    var result = this.verify(candidate);
                    return;
                }

                if (letter === '\n') {
                    var position = {
                        position: this.position,
                        line: this.line++
                    };
                    
                    this.verify(candidate)
                    this.tokenArray.push(new Token('T_EOL', 'end_of_line', position));
                    return;
                }
            } else if (!isString && !isComment && letter === '#') {
                isComment = true;
            } else if (!isString && isComment && letter === '\n') {
                isComment = false;
            } else if (!isString && !isComment && letter === '\'') {
                isString = true;
            } else if (isString && !isComment) {
                if (letter === '\'') {
                    isString = false;
                    this.verify(candidate, true);
                    return;
                }

                candidate += letter;
            } else if (!isString && !isComment) {
                candidate += letter;
            }
        }

        return -1;
    }

    verify(candidate, isString) {
        candidate = candidate.trim();

        var position = {
            position: this.position,
            line: this.line
        };

        // Esse if é para identificar uma string vazia, caso for uma
        if (isString) {
            if (candidate === '') {
                this.tokenArray.push(this.tokens['text'](position, ''));
                return false;
            } else {
                this.tokenArray.push(this.tokens['text'](position, candidate));
                return false;
            }
        } else if (candidate in this.tokens) {
            this.tokenArray.push(this.tokens[candidate](position));
            return true;
        } else if (!isNaN(candidate) && candidate !== '') {
            this.tokenArray.push(this.tokens['number'](position, candidate));
            return false;
        } else if (candidate !== '') {
            // Caso não for nenhuma das opções acima, é retornado um token id
            this.tokenArray.push(this.tokens['id'](position, candidate));
            return false;
        }
    }

    isEnd() {
        if (this.position >= this.inputFromFile.length) {
            return true;
        }

        return false;
    }

    translate() {
        while (!this.isEnd()) {
            var token = this.next();
        }
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
            console.log(chalk.yellow('Position: ') + t.position.position);
            console.log(chalk.yellow('Line: ') + t.position.line);
            console.log(chalk.blue('------'));
        });
    }
}

module.exports = Lexical;
