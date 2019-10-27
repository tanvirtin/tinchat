#!/bin/bash

rm -rf server/public && rm -rf web-client/build && echo 'Removed old folders'
cd ./web-client/ && yarn build production
mv build ../server/public && echo 'Client build created and moved'
echo 'DONE'