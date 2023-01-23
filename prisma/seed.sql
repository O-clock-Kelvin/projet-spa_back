--
--Contenu de la table 'box'
--

INSERT INTO public."Box"(type, "number", nbr_of_places)
	VALUES
    ('CAT', 'C2', 5),
    ('CAT', 'C1', 4),
    ('CAT', 'C3', 5),
    ('CAT', 'C4', 1),
    ('CAT', 'C5', 4),
    ('CAT', 'C6', 6),
    ('DOG', '1', 3),
    ('DOG', '2', 3),
    ('DOG', '3', 3),
    ('DOG', '4', 2),
    ('DOG', '5', 3),
    ('DOG', '6', 3),
    ('DOG', '7', 2);

--
--Contenu de la table 'animal'
--
INSERT INTO public."Animal"(species, name, gender, age, size, volunteer_experience, box_id)
	VALUES
    ('CAT', 'Jess', 'FEMALE','2022-11-10', 'SMALL', 'BEGINNER', 1),
    ('CAT', 'Topinambour', 'MALE','2022-06-01', 'SMALL', 'BEGINNER', 1),
    ('CAT', 'Chance', 'FEMALE','2020-01-01', 'SMALL', 'BEGINNER', 1),
    ('CAT', 'Rafaello', 'MALE','2016-10-12', 'SMALL', 'EXPERT', 4),
    ('CAT', 'Tofaille', 'MALE','2022-06-01', 'SMALL', 'BEGINNER', 2),
    ('CAT', 'Amande', 'FEMALE','2021-07-01', 'SMALL', 'BEGINNER', 2),
    ('CAT', 'Lumo', 'FEMALE','2015-10-31', 'SMALL', 'BEGINNER', 3),
    ('CAT', 'Maya', 'FEMALE','2022-11-10', 'SMALL', 'BEGINNER',3),
    ('CAT', 'Neo', 'MALE','2022-11-10', 'SMALL', 'BEGINNER', 6),
    ('CAT', 'Pacotille', 'FEMALE','2022-02-25', 'SMALL', 'BEGINNER', 5),
    ('CAT', 'Kati', 'FEMALE','2020-11-10', 'SMALL', 'BEGINNER', 5),
    ('CAT', 'YODA', 'MALE','2019-11-10', 'SMALL', 'BEGINNER', 6),
    ('DOG', 'Lazslow', 'MALE','2021-03-10', 'MEDIUM', 'BEGINNER', 7),
    ('DOG', 'Hoover', 'MALE','2019-07-13', 'MEDIUM', 'BEGINNER', 7),
    ('DOG', 'Tyson', 'MALE','2022-01-10', 'MEDIUM', 'EXPERT', 10),
    ('DOG', 'Drack', 'MALE','2019-07-13', 'MEDIUM', 'MEDIUM', 8),
    ('DOG', 'Pumba', 'MALE','2018-06-02', 'MEDIUM', 'BEGINNER', 8),
    ('DOG', 'Bobby', 'MALE','2020-10-23', 'MEDIUM', 'BEGINNER', 9),
    ('DOG', 'Maya', 'FEMALE','2021-03-12', 'MEDIUM', 'MEDIUM', 9),
    ('DOG', 'Pipa', 'FEMALE','2020-08-13', 'SMALL', 'BEGINNER', 11),
    ('DOG', 'Peggy', 'FEMALE','2017-05-15', 'SMALL', 'BEGINNER', 11),
    ('DOG', 'Bobby', 'MALE','2020-10-23', 'MEDIUM', 'BEGINNER', 12),
    ('DOG', 'Laica', 'FEMALE','2021-09-22', 'BIG', 'MEDIUM', 12),
    ('DOG', 'Olaf', 'MALE','2019-12-27', 'BIG', 'EXPERT', 13);

--
--Contenu de la table 'user'
--
INSERT INTO public."User"(email, password, phone_number, name, firstname,admin, experience)
	VALUES
    ('louna@gmail.com', 'ghfhsksq', '0625130000', 'Decker', 'Louna',false, 'BEGINNER'),
    ('bob@gmail.com', 'kjfhsksq', '0625132458', 'douglas', 'bob',false, 'BEGINNER'),
    ('fanny@gmail.com', 'khtd44zf121', '0681412474', 'Rosio', 'Fanny',false,'BEGINNER'),
    ('laurent@gmail.com', 'tfgrr5455dfs', '0652584748', 'Boulanger', 'Laurent',false, 'MEDIUM'),
    ('laura@gmail.com', 'vsjfihzf121', '0625445581', 'Millet', 'Laura',false,'MEDIUM'),
    ('Mickael@gmail.com', 'hffhhzf121', '0612121474', 'Lob', 'Mickael',false,'MEDIUM'),
    ('Willem@spa.com', 'ggggrere54gd', '0658822142', 'Larazzi', 'Willem',false,'EXPERT'),
    ('maggy@gmail.com', 'szoizh4568', '0625458755', 'Didier', 'Maggy',false,'EXPERT'),
    ('Mariama@gmail.com', 'rrg442dd21', '0612232474', 'Bomgoura', 'Mariama',false,'EXPERT'),
    ('tom@spa.fr', '4545gdfgd54gd', '0658884512', 'Barkali', 'Tom',true,'MEDIUM'),
    ('marine@spa.com', 's41uuy4568', '0624518755', 'Chapier', 'Marine',true,'EXPERT'),
    ('stephane@spa.fr', 'nndizeugd5455dfs', '0625144748', 'Brio', 'Stéphane',true, 'EXPERT');

--
--Contenu de la table 'walk'
-- 
INSERT INTO public."Walk"(date, comment, feeling, user_id, animal_id)
	VALUES 
    ('2023-01-23', 'Tout va bien , on a passé un bon moment', 'GOOD', 8, 15),
    ('2023-01-23', 'Petit probleme pendant la balade. Le chien a vomi', 'MEDIUM', 9, 24),
    ('2023-01-21', 'Bonne balade mais il a beaucoup tiré', 'MEDIUM', 6, 16),
    ('2023-01-20', 'Tout va bien , on a passé un bon moment', 'GOOD', 9, 24),
    ('2023-01-20', 'RAS', 'GOOD', 1, 13),
    ('2023-01-23', 'chien très energique, difficile a tenir en laisse', 'BAD', 5, 16),
    ('2023-01-20', 'RAS', 'GOOD', 1, 15),
    ('2023-01-20', 'Pas de problème, chienne très douce', 'GOOD', 6, 21),
    ('2023-01-21', 'Très nerveux', 'MEDIUM', 2, 17),
    ('2023-01-21', 'Difficile à tenir mais on a passé un bon moment', 'GOOD', 2,18),
    ('2023-01-21', 'Bagarre avec un autre chien', 'BAD', 1,22),
    ('2023-01-21', 'RAS', 'GOOD', 2, 20),
    ('2023-01-20', 'Tout va bien , on a passé un bon moment', 'GOOD', 4,23);

--
--Contenu de la table 'tag'
-- 
INSERT INTO public."Tag"(name)
	VALUES 
	('Joueur'),
	('Sociable'),
	('Energique'),
	('Doux'),
	('Calin'),
	('Calme'),
	('Associable'),
	('Fugueur');

--
--Contenu de la table 'tag'
--
INSERT INTO public."Visit"(date,user_id, box_id)
	VALUES
    ('2023-01-21',1,3),
    ('2023-01-21',2,3),
    ('2023-01-20',9,4),
    ('2023-01-23',3,5);

--
--Contenu de la table 'animal_has_tag'
--
INSERT INTO public."Animal_has_tag"(tag_id, animal_id)
	VALUES
    (3, 16),
    (1, 16),
    (3, 22),
    (1, 22),
    (2, 23),
    (4, 23),
    (4, 21),
    (5, 21),
    (2, 21),
    (7, 15),
    (5, 15),
    (2, 24),
    (4, 24),
    (8, 24),
    (6, 13),
    (5, 13),
    (1, 17),
    (2, 17),
    (3, 18),
    (1, 18),
    (6, 20),
    (4, 20),
    (2, 23),
    (1, 23),
    (1, 14),
    (2, 14),
    (3, 19),
    (1, 19),
    (1, 1),
    (2, 1),
    (1, 2),
    (2, 2),
    (2, 3),
    (4, 3),
    (7,4),
    (8,4),
    (5, 5),
    (6, 5),
    (1, 6),
    (2, 6),
    (2, 7),
    (3, 7),
    (2, 8),
    (6, 8),
    (1, 9),
    (5, 9),
    (2, 10),
    (5, 10),
    (1, 11),
    (4, 11),
    (4, 12),
    (5, 12);
