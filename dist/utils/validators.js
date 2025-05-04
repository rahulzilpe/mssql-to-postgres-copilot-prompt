"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePostgresFunction = exports.validateSqlProcedure = exports.validateConversionInput = exports.validateDataType = exports.validateConversionParams = exports.isValidProcedureName = exports.isSqlQuery = void 0;
const lodash_1 = require("lodash");
/**
 * Validates if the input is a SQL query string
 */
function isSqlQuery(input) {
    return (0, lodash_1.isString)(input) && input.trim().length > 0;
}
exports.isSqlQuery = isSqlQuery;
/**
 * Validates if the string is a valid SQL Server stored procedure name
 */
function isValidProcedureName(name) {
    if (!(0, lodash_1.isString)(name))
        return false;
    return /^[a-zA-Z_][a-zA-Z0-9_@#$]*(\.[a-zA-Z_][a-zA-Z0-9_@#$]*)?$/.test(name);
}
exports.isValidProcedureName = isValidProcedureName;
/**
 * Validates conversion parameters
 */
function validateConversionParams(sql, options) {
    if (!isSqlQuery(sql)) {
        throw new Error("Invalid SQL input");
    }
    // Add more validation as needed
}
exports.validateConversionParams = validateConversionParams;
function validateDataType(data, expectedType) {
    switch (expectedType) {
        case 'string':
            return (0, lodash_1.isString)(data);
        case 'number':
            return (0, lodash_1.isNumber)(data);
        case 'boolean':
            return typeof data === 'boolean';
        case 'array':
            return Array.isArray(data);
        case 'object':
            return data !== null && typeof data === 'object' && !Array.isArray(data);
        default:
            throw new Error(`Unknown expected type: ${expectedType}`);
    }
}
exports.validateDataType = validateDataType;
function validateConversionInput(input) {
    if (!input || typeof input !== 'object') {
        throw new Error('Invalid input: Input must be a non-null object.');
    }
    // Additional validation logic can be added here
}
exports.validateConversionInput = validateConversionInput;
function validateSqlProcedure(procedure) {
    // Check if the string contains a valid SQL procedure definition
    if (!procedure.match(/CREATE\s+PROCEDURE|PROC\s+/i)) {
        return false;
    }
    // Check for balanced parentheses, quotes, etc.
    const openParens = (procedure.match(/\(/g) || []).length;
    const closeParens = (procedure.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
        return false;
    }
    // Check for BEGIN/END balance
    const beginCount = (procedure.match(/\bBEGIN\b/gi) || []).length;
    const endCount = (procedure.match(/\bEND\b/gi) || []).length;
    if (beginCount !== endCount) {
        return false;
    }
    return true;
}
exports.validateSqlProcedure = validateSqlProcedure;
function validatePostgresFunction(functionCode) {
    // Check if the string contains a valid PostgreSQL function definition
    if (!functionCode.match(/CREATE\s+(?:OR\s+REPLACE\s+)?FUNCTION/i)) {
        return false;
    }
    // Check for required PostgreSQL function elements
    if (!functionCode.includes('LANGUAGE plpgsql')) {
        return false;
    }
    // Check for dollar quoting
    if (!functionCode.match(/\$[^\$]*\$/)) {
        return false;
    }
    return true;
}
exports.validatePostgresFunction = validatePostgresFunction;
