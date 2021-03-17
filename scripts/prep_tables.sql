ALTER TABLE "public"."communes"
  DROP COLUMN "ogc_fid",
  DROP COLUMN "id",
  DROP COLUMN "nom_com_m",
  DROP COLUMN "insee_arr",
  DROP COLUMN "type";
ALTER TABLE "public"."communes" RENAME COLUMN "insee_com" TO "id";
ALTER TABLE "public"."communes" RENAME COLUMN "nom_com" TO "nom";
ALTER TABLE "public"."communes" ADD PRIMARY KEY ("id");

ALTER TABLE "public"."departements"
  DROP COLUMN "ogc_fid",
  DROP COLUMN "id",
  DROP COLUMN "nom_dep_m";
ALTER TABLE "public"."departements" RENAME COLUMN "insee_dep" TO "id";
ALTER TABLE "public"."departements" RENAME COLUMN "nom_dep" TO "nom";
ALTER TABLE "public"."departements" ADD PRIMARY KEY ("id");

ALTER TABLE "public"."regions"
  DROP COLUMN "ogc_fid",
  DROP COLUMN "id",
  DROP COLUMN "nom_reg_m";
ALTER TABLE "public"."regions" RENAME COLUMN "insee_reg" TO "id";
ALTER TABLE "public"."regions" RENAME COLUMN "nom_reg" TO "nom";
ALTER TABLE "public"."regions" ADD PRIMARY KEY ("id");

ALTER TABLE "public"."epcis"
  DROP COLUMN "ogc_fid",
  DROP COLUMN "id";
ALTER TABLE "public"."epcis" RENAME COLUMN "code_epci" TO "id";
ALTER TABLE "public"."epcis" RENAME COLUMN "nom_epci" TO "nom";
ALTER TABLE "public"."epcis" ADD PRIMARY KEY ("id");

UPDATE "public"."communes" SET "code_epci"=NULL WHERE "id"='85113' OR "id"='29155' OR "id"='29083' OR "id"='22016';

ALTER TABLE "public"."communes" ADD FOREIGN KEY (code_epci) REFERENCES epcis(id);
ALTER TABLE "public"."communes" ADD FOREIGN KEY (insee_dep) REFERENCES departements(id);
ALTER TABLE "public"."communes" ADD FOREIGN KEY (insee_reg) REFERENCES regions(id);
ALTER TABLE "public"."departements" ADD FOREIGN KEY (insee_reg) REFERENCES regions(id);
