'use strict'

module.exports = {
    'T_FUNC': tokens => {

    },
    'T_MAIN': tokens => {
        var position = 0;

        while (true) {
            var token = tokens[position++];
            if (token) {
                if (token.name === 'T_FUNC') {
                    token = tokens[position];
                    if (token.name === 'T_MAIN') {
                        return true;
                    }
                }
            } else {
                return null;
            }
        }
    },
    'T_IF': token => {

    },
    'T_ELSE': token => {

    },
    'T_ROP': token => {

    },
    'T_LOP': token => {

    },
    'T_EOP': token => {

    },
    'T_ATOP': token => {

    },
    'T_UOP': token => {

    },
    'T_AROP': token => {

    },
    'T_BOOLEAN': token => {

    },
    'T_TYPE': token => {

    },
    'T_FOR': token => {

    },
    'T_WHILE': token => {

    },
    'T_BEGIN': token => {

    },
    'T_END': token => {

    },
    'T_NUMBER': token => {

    },
    'T_TEXT': token => {

    },
    'T_ID': token => {

    },
    'T_RETURN': token => {

    },
};
