-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id");
