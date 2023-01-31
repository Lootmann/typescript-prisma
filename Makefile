run:
	npx ts-node script.ts

migrate:
	npx prisma migrate dev --name init

reset:
	npx prisma migrate reset
