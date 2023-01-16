-- CreateEnum
CREATE TYPE "Status" AS ENUM ('EXIT', 'ENTRANCE', 'TRANSFERENCE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "user_id" TEXT NOT NULL,
    "credit" INTEGER NOT NULL DEFAULT 1000,
    "debit" INTEGER NOT NULL DEFAULT 1000,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Account_history" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transference" (
    "id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credit_Card" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Nutaú Card',
    "card_number" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,
    "card_owner" TEXT NOT NULL,
    "validate_date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Credit_Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Account_user_id_key" ON "Account"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Credit_Card_user_id_key" ON "Credit_Card"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Credit_Card_card_number_key" ON "Credit_Card"("card_number");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account_history" ADD CONSTRAINT "Account_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Account"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transference" ADD CONSTRAINT "Transference_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "Account"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transference" ADD CONSTRAINT "Transference_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "Account"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit_Card" ADD CONSTRAINT "Credit_Card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
