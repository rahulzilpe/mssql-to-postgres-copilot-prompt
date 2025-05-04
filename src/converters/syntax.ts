// This file exports syntax-related utilities for converting SQL Server syntax to PostgreSQL syntax.

export const convertIfStatement = (condition: string, trueBlock: string, falseBlock?: string): string => {
    let result = `IF ${condition} THEN\n    ${trueBlock}\n`;
    if (falseBlock) {
        result += `ELSE\n    ${falseBlock}\n`;
    }
    result += `END IF;`;
    return result;
};

export const convertVariableDeclaration = (variableName: string, dataType: string, initialValue?: string): string => {
    let declaration = `${variableName} ${dataType};\n`;
    if (initialValue) {
        declaration += `${variableName} := ${initialValue};\n`;
    }
    return declaration;
};

export const convertStringConcatenation = (str1: string, str2: string): string => {
    return `${str1} || ${str2}`;
};

export const convertTopClause = (query: string, limit: number): string => {
    return `${query} LIMIT ${limit}`;
};

export const convertNullHandling = (expression: string, replacement: string): string => {
    return `COALESCE(${expression}, ${replacement})`;
};