"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSqlServerToPostgres = void 0;
__exportStar(require("./data-types"), exports);
__exportStar(require("./functions"), exports);
__exportStar(require("./procedures"), exports);
__exportStar(require("./syntax"), exports);
/**
 * Main function to convert SQL Server code to PostgreSQL
 */
function convertSqlServerToPostgres(sqlServerCode) {
    // This is a placeholder for the actual conversion logic
    // The real implementation would use the comprehensive conversion rules
    // For demonstration purposes only:
    let pgCode = sqlServerCode
        .replace(/CREATE\s+PROCEDURE/i, 'CREATE OR REPLACE FUNCTION')
        .replace(/@(\w+)/g, 'p_$1')
        .replace(/AS\s+BEGIN/i, 'AS $BODY$\nBEGIN')
        .replace(/END$/i, 'END;\n$BODY$ LANGUAGE plpgsql;');
    return pgCode;
}
exports.convertSqlServerToPostgres = convertSqlServerToPostgres;
