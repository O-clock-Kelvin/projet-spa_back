-- View: public.animals_to_walk

-- DROP VIEW public.animals_to_walk;

CREATE OR REPLACE VIEW public.animals_to_walk
 AS
 SELECT a.id,
    a.species,
    a.name,
    a.gender,
    a.age,
    a.size,
    a.volunteer_experience,
    a.box_id,
    a.url_image,
    a.bio,
    s.animal_id,
    s.date_sortie
   FROM "Animal" a
     LEFT JOIN ( SELECT "Walk".animal_id,
            max("Walk".date) AS date_sortie
           FROM "Walk"
          GROUP BY "Walk".animal_id) s ON a.id = s.animal_id
  ORDER BY (COALESCE(s.date_sortie, '1000-01-01 00:00:00+00:09:21'::timestamp with time zone)), a.id DESC;
