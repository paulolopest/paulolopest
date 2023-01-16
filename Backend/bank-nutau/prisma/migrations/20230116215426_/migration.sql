/*
  Warnings:

  - Added the required column `type` to the `Account_history` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CREDIT', 'DEBIT');

-- AlterTable
ALTER TABLE "Account_history" ADD COLUMN     "type" "Type" NOT NULL;
