# Procedure Conversion Examples

This document provides examples of converting SQL Server stored procedures to PostgreSQL functions. Each example includes the SQL Server syntax followed by the equivalent PostgreSQL syntax.

## Example 1: Simple Procedure

**SQL Server:**
```sql
CREATE PROCEDURE GetEmployeeById
    @EmployeeId INT
AS
BEGIN
    SELECT * FROM Employees WHERE Id = @EmployeeId;
END
```

**PostgreSQL:**
```sql
CREATE OR REPLACE FUNCTION GetEmployeeById(p_EmployeeId INTEGER)
RETURNS TABLE (Id INTEGER, Name TEXT, Position TEXT) AS $function$
BEGIN
    RETURN QUERY SELECT * FROM Employees WHERE Id = p_EmployeeId;
END;
$function$ LANGUAGE plpgsql;
```

## Example 2: Procedure with Output Parameter

**SQL Server:**
```sql
CREATE PROCEDURE GetEmployeeCount
    @Count INT OUTPUT
AS
BEGIN
    SELECT @Count = COUNT(*) FROM Employees;
END
```

**PostgreSQL:**
```sql
CREATE OR REPLACE FUNCTION GetEmployeeCount()
RETURNS INTEGER AS $function$
DECLARE
    v_Count INTEGER;
BEGIN
    SELECT COUNT(*) INTO v_Count FROM Employees;
    RETURN v_Count;
END;
$function$ LANGUAGE plpgsql;
```

## Example 3: Procedure with Conditional Logic

**SQL Server:**
```sql
CREATE PROCEDURE UpdateEmployeeSalary
    @EmployeeId INT,
    @NewSalary DECIMAL(10, 2)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Employees WHERE Id = @EmployeeId)
    BEGIN
        UPDATE Employees SET Salary = @NewSalary WHERE Id = @EmployeeId;
    END
END
```

**PostgreSQL:**
```sql
CREATE OR REPLACE FUNCTION UpdateEmployeeSalary(p_EmployeeId INTEGER, p_NewSalary NUMERIC)
RETURNS VOID AS $function$
BEGIN
    IF EXISTS (SELECT 1 FROM Employees WHERE Id = p_EmployeeId) THEN
        UPDATE Employees SET Salary = p_NewSalary WHERE Id = p_EmployeeId;
    END IF;
END;
$function$ LANGUAGE plpgsql;
```

## Example 4: Procedure with Transaction Handling

**SQL Server:**
```sql
CREATE PROCEDURE TransferEmployee
    @FromDepartmentId INT,
    @ToDepartmentId INT,
    @EmployeeId INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE Employees SET DepartmentId = @ToDepartmentId WHERE Id = @EmployeeId;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
```

**PostgreSQL:**
```sql
CREATE OR REPLACE FUNCTION TransferEmployee(p_FromDepartmentId INTEGER, p_ToDepartmentId INTEGER, p_EmployeeId INTEGER)
RETURNS VOID AS $function$
BEGIN
    BEGIN
        UPDATE Employees SET DepartmentId = p_ToDepartmentId WHERE Id = p_EmployeeId;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE; -- Handle the exception as needed
    END;
END;
$function$ LANGUAGE plpgsql;
```

## Conclusion

These examples illustrate common patterns for converting SQL Server stored procedures to PostgreSQL functions. Adjustments may be necessary based on specific use cases and requirements.