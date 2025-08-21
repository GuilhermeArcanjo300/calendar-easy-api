-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "enterprise_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_phone_enterprise_id_key" ON "clients"("phone", "enterprise_id");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
