/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `enterprise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `enterprise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "enterprise" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "enterprise_user_id_key" ON "enterprise"("user_id");

-- AddForeignKey
ALTER TABLE "enterprise" ADD CONSTRAINT "enterprise_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
