#!/bin/bash

delete_database_entries() {
    echo 'Deleting all database entries'
    container_id=$(docker ps -aqf "name=postgres")
    docker exec -it $container_id psql -U postgres -c 'DROP SCHEMA public CASCADE; CREATE SCHEMA public;'
    echo 'DONE'
}

delete_database_entries
