#! /bin/bash

ogr2ogr -f "PostgreSQL" \
  PG:"host=localhost port=5432 user='pichot' dbname='directus'" \
  ./ign/COMMUNE_CARTO.shp -overwrite \
	-nlt PROMOTE_TO_MULTI -t_srs EPSG:4326 -progress -nln "communes" 

ogr2ogr -f "PostgreSQL" \
  PG:"host=localhost port=5432 user='pichot' dbname='directus'" \
  ./ign/EPCI_CARTO.shp -overwrite \
	-nlt PROMOTE_TO_MULTI -t_srs EPSG:4326 -progress -nln "epcis"

ogr2ogr -f "PostgreSQL" \
  PG:"host=localhost port=5432 user='pichot' dbname='directus'" \
  ./ign/DEPARTEMENT_CARTO.shp -overwrite \
	-nlt PROMOTE_TO_MULTI -t_srs EPSG:4326 -progress -nln "departements"

ogr2ogr -f "PostgreSQL" \
  PG:"host=localhost port=5432 user='pichot' dbname='directus'" \
  ./ign/REGION_CARTO.shp -overwrite \
	-nlt PROMOTE_TO_MULTI -t_srs EPSG:4326 -progress -nln "regions"

psql -d directus -f prep_tables.sql
