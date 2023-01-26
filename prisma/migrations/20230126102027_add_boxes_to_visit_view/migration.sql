-- This is an empty migration.
CREATE OR REPLACE VIEW public."BoxesToVisit"
 AS
 SELECT a.id,
    a.type,
    a.number,
    a.nbr_of_places,
    s.box_id,
    s.last_visit
   FROM "Box" a
     LEFT JOIN ( SELECT "Visit".box_id,
            max("Visit".date) AS last_visit
           FROM "Visit"
          GROUP BY "Visit".box_id) s ON a.id = s.box_id
  ORDER BY (COALESCE(s.last_visit, '1000-01-01 00:00:00+00:09:21'::timestamp with time zone)), a.id DESC;
