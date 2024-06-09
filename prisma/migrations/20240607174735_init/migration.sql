-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN_ROLE', 'USER_ROLE');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "emailValidated" BOOLEAN NOT NULL DEFAULT false,
    "password" VARCHAR NOT NULL,
    "img" VARCHAR NOT NULL,
    "role" "Role"[] DEFAULT ARRAY['USER_ROLE']::"Role"[],

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
