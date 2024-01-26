#!/bin/bash

docker cp dump.sql iceberg-postgres-alikumbul:/dump.sql

docker exec -it iceberg-postgres-alikumbul psql -U iceberguser -d icebergdb -f /dump.sql