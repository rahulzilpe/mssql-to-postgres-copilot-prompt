-- PostgreSQL Procedure Template

CREATE OR REPLACE FUNCTION schema.procedure_name(
    p_param1 data_type,
    p_param2 data_type
)
RETURNS return_type AS $function$
BEGIN
    -- Procedure logic goes here

    RETURN result; -- Adjust as necessary
END;
$function$ LANGUAGE plpgsql;