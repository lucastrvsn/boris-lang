'use strict'

var chalk = require('chalk');

class Variable {
    constructor(name, type, value) {
        this.name = name;
        this.type = type;
        this.value = value;
    }
}

var variables = [];

module.exports = {
    isVariable(token) {
        if (token.name !== 'T_NUMBER' && token.name !== 'T_TEXT') {
            return false;
        }

        return true;
    },
    isBoolean(token) {
        if (token.name === 'T_BOOLEAN') {
            return true;
        }

        return false;
    },
    verify(name, type, value) {
        switch (type) {
            case 'string':
                return isNaN(value);
            break;
            case 'float':
                return !isNaN(value);
            break;
            case 'int':
                return !isNaN(value);
            break;
            case 'double':
                return !isNaN(value);
            break;
            case 'bool':
                return value === 'true' || value === 'false';
            break;
        }

        return false;
    },
    exists(name) {
        if (variables.find(x => x.name === name) !== undefined) {
            return true;
        }

        return false;
    },
    declare(name, type, value) {
        if (this.exists(name)) {
            return false;
        }

        if (!this.verify(name, type, value)) {
            if (this.getVariable(value) === null) {
                if (!isNaN(value)) {
                    return false;
                }
            } else {
                return false;
            }
        }

        var variable = new Variable(name, type, value);
        variables.push(variable);

        return true;
    },
    getVariable(name) {
        variables.find(x => {
            if (x.name === name) {
                return x;
            }
        });

        return null;
    }
};
