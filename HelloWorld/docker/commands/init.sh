#!/bin/ash
yarn
yarn typeorm migration:run
yarn start:dev