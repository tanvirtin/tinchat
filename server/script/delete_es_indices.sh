#!/bin/bash

delete_es_indices() {
    echo 'Deleting all elasticsearch indices'
    echo `curl -XDELETE localhost:9200/*`
    echo 'DONE'
}

delete_es_indices
