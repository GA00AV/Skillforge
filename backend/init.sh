#!/bin/sh
echo "Waiting 10 sec for Postgres..."
sleep 10

npx prisma generate
npx prisma migrate deploy
npm start
