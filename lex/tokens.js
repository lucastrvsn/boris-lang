'use strict'

var Token = require('./Token.js');

module.exports = {
    'function': position => {
        return new Token('T_FUNC', 'function', position);
    },
    'main': position => {
        return new Token('T_MAIN', 'main', position);
    },
    'if': position => {
        return new Token('T_IF', 'if', position);
    },
    'else': position => {
        return new Token('T_ELSE', 'else', position);
    },

    // Relational operators
    '<': position => {
        return new Token('T_ROP', '<', position);
    },
    '<=': position => {
        return new Token('T_ROP', '<=', position);
    },
    '==': position => {
        return new Token('T_ROP', '==', position);
    },
    '>=': position => {
        return new Token('T_ROP', '>=', position);
    },
    '>': position => {
        return new Token('T_ROP', '>', position);
    },

    // Logical operators
    'and': position => {
        return new Token('T_LOP', 'and', position);
    },
    'or': position => {
        return new Token('T_LOP', 'or', position);
    },
    'not': position => {
        return new Token('T_NOP', 'not', position);
    },

    // Expression operators
    '==': position => {
        return new Token('T_EOP', '==', position);
    },
    '!=': position => {
        return new Token('T_EOP', '!=', position);
    },

    // Attribuiton operators
    '=': position => {
        return new Token('T_ATOP', '=', position);
    },
    '+=': position => {
        return new Token('T_ATOP', '+=', position);
    },
    '-=': position => {
        return new Token('T_ATOP', '-=', position);
    },
    '*=': position => {
        return new Token('T_ATOP', '*=', position);
    },
    '/=': position => {
        return new Token('T_ATOP', '/=', position);
    },

    // Unary operators
    '++': position => {
        return new Token('T_UOP', '++', position);
    },
    '--': position => {
        return new Token('T_UOP', '--', position);
    },

    // Arithmetic operators
    '+': position => {
        return new Token('T_AROP', '+', position);
    },
    '-': position => {
        return new Token('T_AROP', '-', position);
    },
    '*': position => {
        return new Token('T_AROP', '*', position);
    },
    '/': position => {
        return new Token('T_AROP', '/', position);
    },
    '%': position => {
        return new Token('T_AROP', '%', position);
    },

    // Boolean tokens
    'true': position => {
        return new Token('T_BOOLEAN', 'true', position);
    },
    'false': position => {
        return new Token('T_BOOLEAN', 'false', position);
    },

    // Types
    'bool': position => {
        return new Token('T_TYPE', 'bool', position);
    },
    'float': position => {
        return new Token('T_TYPE', 'float', position);
    },
    'int': position => {
        return new Token('T_TYPE', 'int', position);
    },
    'string': position => {
        return new Token('T_TYPE', 'string', position);
    },

    // Loops, begin and end
    'for': position => {
        return new Token('T_FOR', 'for', position);
    },
    'while': position => {
        return new Token('T_WHILE', 'while', position);
    },
    'begin': position => {
        return new Token('T_BEGIN', 'begin', position);
    },
    'end': position => {
        return new Token('T_END', 'end', position);
    },
    'until': position => {
        return new Token('T_UNTIL', 'until', position);
    },
    'asc': position => {
        return new Token('T_ASC', 'asc', position);
    },
    'desc': position => {
        return new Token('T_DESC', 'desc', position);
    },

    // Sequences of somewhat
    'number': (position, value) => {
        return new Token('T_NUMBER', value, position);
    },
    'text': (position, value) => {
        value = value.replace(/\n/g, ''); // Regex para remover os \n dentro da string
        return new Token('T_TEXT', value, position);
    },
    'id': (position, name) => {
        return new Token('T_ID', name, position);
    },
    ',': position => {
        return new Token('T_COMMA', ',', position);
    },
    'return': position => {
        return new Token('T_RETURN', 'return', position);
    },
};
