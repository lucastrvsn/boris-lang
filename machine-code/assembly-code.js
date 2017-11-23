'use strict'

var finalAssembly = '';
var position = 0;
var machineCode = '';
var finished = false;
var register = 1;

module.exports = {
    init(code, semantic) {
        this.semantic = semantic;
        machineCode = code;

        finalAssembly += 'load RA, 0\n';
        finalAssembly += 'load RB, -1\n';
        finalAssembly += 'load RC, 1\n';

        console.log(code);

        while (!finished) {
            if (this.verify() === undefined) {
                finished = true;
            }
        }

        return finalAssembly;
    },
    getNext() {
        var result = '';

        for (var i = position; i < machineCode.length; i++) {
            var code = machineCode[i];
            
            if (code !== ' ' && code !== '\n') {
                result += code;
            } else {
                position = i + 1;
                return result;
            }
        }

        return undefined;
    },
    verify() {
        var word = this.getNext();

        if (word === 'if') {
            var words = [
                this.getNext(),
                this.getNext(),
                this.getNext(),
                this.getNext()
            ];

            var first = words[0];
            var firstRegister = undefined;
            var second = words[2];
            var secondRegister = undefined;

            if (this.semantic.exists(first)) {
                firstRegister = 'R' + this.semantic.getVariable(first).getRegister();
                first = this.semantic.getVariable(first).getValue();
            }

            if (this.semantic.exists(second)) {
                secondRegister = 'R' + this.semantic.getVariable(second).getRegister();
                second = this.semantic.getVariable(second).getValue();
            }

            var operator = words[1];
            if (operator === '<=' || operator === '<') {
                finalAssembly += 'jmpLE ' + (firstRegister !== undefined ? firstRegister : first) + ' ' + operator + ' ' + (secondRegister !== undefined ? secondRegister : second);
            } else if (operator === '>=' || operator === '>') {
                finalAssembly += 'jmpLE ' + (secondRegister !== undefined ? secondRegister : second) + ' ' + operator + ' ' + (firstRegister !== undefined ? firstRegister : first);
            } else {
                finalAssembly += 'jmpEQ ' + (secondRegister !== undefined ? secondRegister : second) + ' = ' + (firstRegister !== undefined ? firstRegister : first);
            }

            finalAssembly += '\n';

        } else if (word === 'while') {

        } else if (word === 'for') {

        } else if (word === 'goto') {
            finalAssembly += 'jmp ' + this.getNext() + '\n';
        } else {
            if (this.semantic.exists(word)) {
                var nextWord = this.getNext();

                if (nextWord === '=') {
                    var variable = this.semantic.getVariable(word);
                    variable.setRegister(register++);
                    finalAssembly += 'load R' + variable.getRegister() + ', ' + variable.getValue() + '\n';
                    this.getNext();
                }
            } else {
                finalAssembly += word + ' ';
            }
        }

        return word;
    }
};
