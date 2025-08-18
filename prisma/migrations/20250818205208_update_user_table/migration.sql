-- CreateEnum
CREATE TYPE "ProfileRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "profile" "ProfileRole" NOT NULL DEFAULT 'USER',
ALTER COLUMN "password" DROP NOT NULL;
