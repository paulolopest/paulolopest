-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Account_history" DROP CONSTRAINT "Account_history_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Credit_Card" DROP CONSTRAINT "Credit_Card_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Transference" DROP CONSTRAINT "Transference_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "Transference" DROP CONSTRAINT "Transference_sender_id_fkey";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account_history" ADD CONSTRAINT "Account_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Account"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transference" ADD CONSTRAINT "Transference_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "Account"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transference" ADD CONSTRAINT "Transference_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "Account"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit_Card" ADD CONSTRAINT "Credit_Card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
