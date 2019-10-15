#!/bin/bash

delete_es_indices() {
    echo 'Deleting all elasticsearch indices'
    echo `curl -XDELETE ${DOCKER_IP}:9200/*`
    echo 'DONE'
}

delete_es_indices
