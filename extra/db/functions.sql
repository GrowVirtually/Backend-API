-- execute these functions in the database before starting the node server

DROP FUNCTION sort_by_location;

CREATE
OR REPLACE FUNCTION sort_by_location(coordinates geography, latitude double precision,longitude double precision
                                            )
    RETURNS double precision
    LANGUAGE plpgsql
AS
$$
BEGIN
RETURN $1 <-> ST_MakePoint($2, $3)::geography;
END ;
$$;

DROP FUNCTION filter_by_distance;

CREATE
OR REPLACE FUNCTION filter_by_distance(coordinates geography, latitude double precision,longitude double precision,
                                               distance double precision)
    RETURNS bool
    LANGUAGE plpgsql
AS
$$
BEGIN
RETURN ST_DWithin($1, ST_Makepoint($2, $3)::geography, $4);
END;
$$;
