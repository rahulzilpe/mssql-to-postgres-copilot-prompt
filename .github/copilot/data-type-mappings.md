# SQL Server to PostgreSQL Data Type Mappings

This guide provides comprehensive mappings for converting SQL Server data types to their PostgreSQL equivalents.

## Common Data Type Mappings

| SQL Server Type | PostgreSQL Type | Notes |
|----------------|----------------|-------|
| INT | INTEGER | |
| BIGINT | BIGINT | |
| SMALLINT | SMALLINT | |
| TINYINT | SMALLINT | PostgreSQL has no TINYINT |
| BIT | BOOLEAN | Use TRUE/FALSE instead of 1/0 |
| DECIMAL(p,s) | DECIMAL(p,s) | Same precision and scale |
| NUMERIC(p,s) | NUMERIC(p,s) | Same precision and scale |
| MONEY | NUMERIC(19,4) | |
| SMALLMONEY | NUMERIC(10,4) | |
| FLOAT | DOUBLE PRECISION | |
| REAL | REAL | |
| DATETIME | TIMESTAMP | No timezone by default |
| DATETIME2 | TIMESTAMP | Higher precision |
| DATETIME2 with NOT NULL default '0001-01-01 00:00:00.0000000' | TIMESTAMP DEFAULT LOCALTIMESTAMP | |
| SMALLDATETIME | TIMESTAMP | |
| DATE | DATE | |
| TIME | TIME | |
| DATETIMEOFFSET | TIMESTAMP WITH TIME ZONE | |
| CHAR(n) | CHAR(n) | |
| VARCHAR(n) | VARCHAR(n) | |
| VARCHAR(MAX) | TEXT | |
| NCHAR(n) | CHAR(n) | PostgreSQL handles Unicode by default |
| NVARCHAR(n) | VARCHAR(n) | PostgreSQL handles Unicode by default |
| NVARCHAR(MAX) | TEXT | |
| TEXT | TEXT | |
| NTEXT | TEXT | PostgreSQL TEXT type supports Unicode |
| BINARY(n) | BYTEA | |
| VARBINARY(n) | BYTEA | |
| VARBINARY(MAX) | BYTEA | |
| IMAGE | BYTEA | |
| UNIQUEIDENTIFIER | UUID | |
| XML | XML | |
| HIERARCHYID | No direct equivalent | Use ltree extension |
| SQL_VARIANT | No direct equivalent | Use specific types or jsonb |
| TIMESTAMP | bytea | SQL Server TIMESTAMP is not a datetime type |
| ROWVERSION | bytea | Equivalent to TIMESTAMP in SQL Server |
| GEOMETRY | geometry | Requires PostGIS extension |
| GEOGRAPHY | geography | Requires PostGIS extension |

## Type Conversion Functions

| SQL Server | PostgreSQL | Notes |
|------------|------------|-------|
| CAST(expr AS type) | CAST(expr AS type) | Similar syntax |
| CONVERT(type, expr) | expr::type | PostgreSQL's shorthand notation |
| TRY_CAST | Use exception handling | No direct equivalent in PostgreSQL |
| TRY_CONVERT | Use exception handling | No direct equivalent in PostgreSQL |
| PARSE | Use TO_DATE, TO_TIMESTAMP | For date/time conversions |

## Important Type Handling Rules

1. **Explicit Type Casting**: Always add explicit casts in RETURN QUERY statements:
   ```sql
   RETURN QUERY
   SELECT col1::VARCHAR, col2::INTEGER FROM table;
   ```

2. **Boolean Values**: Replace SQL Server boolean expressions with PostgreSQL equivalents:
   ```sql
   -- SQL Server: WHERE active = 1
   -- PostgreSQL: WHERE active = TRUE
   ```

3. **Null and Empty String Handling**: Replace SQL Server null or empty string checks with PostgreSQL equivalents:
   ```sql
   -- SQL Server: @param IS NULL OR @param = ''
   -- PostgreSQL: p_param IS NULL OR p_param::text = ''
   ```

4. **Division with Null Handling**: Replace SQL Server division with null handling with PostgreSQL equivalents:
   ```sql
   -- SQL Server: amount / ISNULL(NULLIF(quantity, 0), 1)
   -- PostgreSQL: amount / COALESCE(NULLIF(quantity, 0), 1)
   ```

5. **Date Comparisons**: Replace SQL Server date comparisons with PostgreSQL equivalents:
   ```sql
   -- SQL Server: WHERE create_date > '20210101'
   -- PostgreSQL: WHERE create_date > '2021-01-01'::date
   ```

6. **Default Values**: Replace SQL Server default values with PostgreSQL equivalents:
   ```sql
   -- SQL Server: DEFAULT GETDATE()
   -- PostgreSQL: DEFAULT CURRENT_TIMESTAMP
   ```

7. **UUID Generation**: Replace SQL Server UUID generation with PostgreSQL equivalents:
   ```sql
   -- SQL Server: NEWID()
   -- PostgreSQL: gen_random_uuid()
   ```
