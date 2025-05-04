import { convertDataType } from '../../src/converters/data-types';

describe('Data Type Conversion', () => {
    test('INT to INTEGER', () => {
        expect(convertDataType('INT')).toBe('INTEGER');
    });

    test('BIGINT to BIGINT', () => {
        expect(convertDataType('BIGINT')).toBe('BIGINT');
    });

    test('SMALLINT to SMALLINT', () => {
        expect(convertDataType('SMALLINT')).toBe('SMALLINT');
    });

    test('TINYINT to SMALLINT', () => {
        expect(convertDataType('TINYINT')).toBe('SMALLINT');
    });

    test('BIT to BOOLEAN', () => {
        expect(convertDataType('BIT')).toBe('BOOLEAN');
    });

    test('DECIMAL(p,s) to DECIMAL(p,s)', () => {
        expect(convertDataType('DECIMAL(10,2)')).toBe('DECIMAL(10,2)');
    });

    test('MONEY to NUMERIC(19,4)', () => {
        expect(convertDataType('MONEY')).toBe('NUMERIC(19,4)');
    });

    test('FLOAT to DOUBLE PRECISION', () => {
        expect(convertDataType('FLOAT')).toBe('DOUBLE PRECISION');
    });

    test('DATETIME to TIMESTAMP', () => {
        expect(convertDataType('DATETIME')).toBe('TIMESTAMP');
    });

    test('VARCHAR(n) to VARCHAR(n)', () => {
        expect(convertDataType('VARCHAR(255)')).toBe('VARCHAR(255)');
    });

    test('NVARCHAR(n) to VARCHAR(n)', () => {
        expect(convertDataType('NVARCHAR(255)')).toBe('VARCHAR(255)');
    });

    test('UNIQUEIDENTIFIER to UUID', () => {
        expect(convertDataType('UNIQUEIDENTIFIER')).toBe('UUID');
    });

    test('HIERARCHYID to No direct equivalent', () => {
        expect(convertDataType('HIERARCHYID')).toBe('No direct equivalent');
    });
});