#!/bin/sh

echo "Waiting for 10 secs for postgres to be ready"
sleep 10

npx prisma generate
npx prisma migrate deploy
npm start
