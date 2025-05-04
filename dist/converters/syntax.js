"use strict";
// This file exports syntax-related utilities for converting SQL Server syntax to PostgreSQL syntax.
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertNullHandling = exports.convertTopClause = exports.convertStringConcatenation = exports.convertVariableDeclaration = exports.convertIfStatement = void 0;
const convertIfStatement = (condition, trueBlock, falseBlock) => {
    let result = `IF ${condition} THEN\n    ${trueBlock}\n`;
    if (falseBlock) {
        result += `ELSE\n    ${falseBlock}\n`;
    }
    result += `END IF;`;
    return result;
};
exports.convertIfStatement = convertIfStatement;
const convertVariableDeclaration = (variableName, dataType, initialValue) => {
    let declaration = `${variableName} ${dataType};\n`;
    if (initialValue) {
        declaration += `${variableName} := ${initialValue};\n`;
    }
    return declaration;
};
exports.convertVariableDeclaration = convertVariableDeclaration;
const convertStringConcatenation = (str1, str2) => {
    return `${str1} || ${str2}`;
};
exports.convertStringConcatenation = convertStringConcatenation;
const convertTopClause = (query, limit) => {
    return `${query} LIMIT ${limit}`;
};
exports.convertTopClause = convertTopClause;
const convertNullHandling = (expression, replacement) => {
    return `COALESCE(${expression}, ${replacement})`;
};
exports.convertNullHandling = convertNullHandling;
