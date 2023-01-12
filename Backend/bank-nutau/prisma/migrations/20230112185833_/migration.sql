/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Credit_Card" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Nutaú Card',
    "card_number" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,
    "card_owner" TEXT NOT NULL,
    "validate_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Credit_Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credit_Card_card_number_key" ON "Credit_Card"("card_number");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");
