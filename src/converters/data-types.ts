export const sqlServerToPostgresDataTypes: Record<string, string> = {
    'INT': 'INTEGER',
    'BIGINT': 'BIGINT',
    'SMALLINT': 'SMALLINT',
    'TINYINT': 'SMALLINT', // PostgreSQL has no TINYINT
    'BIT': 'BOOLEAN',
    'DECIMAL': 'DECIMAL', // Same precision and scale
    'NUMERIC': 'NUMERIC', // Same precision and scale
    'MONEY': 'NUMERIC(19,4)',
    'FLOAT': 'DOUBLE PRECISION',
    'REAL': 'REAL',
    'DATETIME': 'TIMESTAMP', // No timezone by default
    'DATETIME2': 'TIMESTAMP', // Higher precision
    'DATE': 'DATE',
    'TIME': 'TIME',
    'CHAR': 'CHAR',
    'VARCHAR': 'VARCHAR', // For compatibility, maintain VARCHAR rather than TEXT
    'VARCHAR(MAX)': 'VARCHAR', // As per specific requirements, avoid using TEXT
    'NVARCHAR': 'VARCHAR', // PostgreSQL handles Unicode by default
    'NVARCHAR(MAX)': 'VARCHAR', // Do not convert to TEXT unless specified
    'TEXT': 'TEXT',
    'NTEXT': 'TEXT',
    'UNIQUEIDENTIFIER': 'UUID',
    'XML': 'XML',
    'VARBINARY': 'BYTEA',
    'HIERARCHYID': 'No direct equivalent', // Use ltree extension
};

export const postgresToSqlServerDataTypes: Record<string, string> = {
    'INTEGER': 'INT',
    'BIGINT': 'BIGINT',
    'SMALLINT': 'SMALLINT',
    'BOOLEAN': 'BIT',
    'DECIMAL': 'DECIMAL', // Same precision and scale
    'NUMERIC': 'NUMERIC', // Same precision and scale
    'NUMERIC(19,4)': 'MONEY',
    'DOUBLE PRECISION': 'FLOAT',
    'REAL': 'REAL',
    'TIMESTAMP': 'DATETIME', // No timezone by default
    'DATE': 'DATE',
    'TIME': 'TIME',
    'CHAR': 'CHAR',
    'VARCHAR': 'VARCHAR(MAX)', // For compatibility, maintain VARCHAR rather than TEXT
    'TEXT': 'NVARCHAR(MAX)',
    'UUID': 'UNIQUEIDENTIFIER',
    'XML': 'XML',
    'BYTEA': 'VARBINARY',
};