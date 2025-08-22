-- CreateEnum
CREATE TYPE "StatusCalendar" AS ENUM ('COMPLETED', 'CONFIRMED', 'PENDING', 'CANCELED');

-- CreateTable
CREATE TABLE "calendar" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "status" "StatusCalendar" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "calendar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "calendar" ADD CONSTRAINT "calendar_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendar" ADD CONSTRAINT "calendar_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
