-- CreateTable



-- On crée des domains qui permettent de vérifier la validité des données transmises à notre BDD


-- On vérifie que la valeur est égale à CAT, DOG ou OTHER
CREATE DOMAIN animal_specie AS TEXT
CHECK(
   VALUE IN ('CAT','DOG','OTHER')
);

-- On vérifie le genre du chat
CREATE DOMAIN animal_gender AS TEXT
CHECK(
   VALUE IN ('MALE','FEMALE')
);

-- On vérifie le niveau d'expérience du bénévole
CREATE DOMAIN volunteer_experience AS TEXT
CHECK(
   VALUE IN ('BEGINNER','MEDIUM','EXPERT')
);


-- On vérifie la taille du chat
CREATE DOMAIN animal_size AS TEXT
CHECK(
   VALUE IN ('SMALL','MEDIUM','BIG')
);


-- on vérifie le sentiment à l'issue de la balade
CREATE DOMAIN feeling AS TEXT
CHECK(
   VALUE IN ('BAD','MEDIUM','GOOD')
);



-- on vérifie grace à une regex que la valeur transmise correspond au format d'un email
CREATE DOMAIN email AS varchar(255)
    CHECK (VALUE ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$');
   


CREATE TABLE "User" (
    "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY ,

    -- on assigne le type "email", défini dans nos domains
    "email" email NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT,
    "name" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "url_image" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "experience" volunteer_experience NOT NULL DEFAULT 'BEGINNER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Box" (
    "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY ,
    "type" animal_specie NOT NULL DEFAULT 'OTHER',
    "number" TEXT NOT NULL,
    "nbr_of_places" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Box_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
    "species" animal_specie NOT NULL,
    "name" TEXT NOT NULL,
    "gender" animal_gender NOT NULL,
    "age" TIMESTAMPTZ NOT NULL,
    "size" animal_size NOT NULL,
    "volunteer_experience" volunteer_experience NOT NULL DEFAULT 'BEGINNER',
    "box_id" INTEGER NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Walk" (
    "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
    "date" TIMESTAMPTZ NOT NULL,
    "comment" TEXT,
    "feeling" feeling NOT NULL DEFAULT 'GOOD',
    "user_id" INTEGER NOT NULL,
    "animal_id" INTEGER NOT NULL,

    CONSTRAINT "Walk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id"  INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
    "date" TIMESTAMPTZ NOT NULL,
    "comment" TEXT,
    "user_id" INTEGER NOT NULL,
    "box_id" INTEGER NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id"  INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal_has_tag" (
    "tag_id" INTEGER NOT NULL,
    "animal_id" INTEGER NOT NULL,

    CONSTRAINT "Animal_has_tag_pkey" PRIMARY KEY ("animal_id","tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_box_id_fkey" FOREIGN KEY ("box_id") REFERENCES "Box"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Walk" ADD CONSTRAINT "Walk_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Walk" ADD CONSTRAINT "Walk_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_box_id_fkey" FOREIGN KEY ("box_id") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Animal_has_tag" ADD CONSTRAINT "Animal_has_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Animal_has_tag" ADD CONSTRAINT "Animal_has_tag_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE NO ACTION;


