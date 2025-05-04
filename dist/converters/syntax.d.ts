export declare const convertIfStatement: (condition: string, trueBlock: string, falseBlock?: string) => string;
export declare const convertVariableDeclaration: (variableName: string, dataType: string, initialValue?: string) => string;
export declare const convertStringConcatenation: (str1: string, str2: string) => string;
export declare const convertTopClause: (query: string, limit: number) => string;
export declare const convertNullHandling: (expression: string, replacement: string) => string;
