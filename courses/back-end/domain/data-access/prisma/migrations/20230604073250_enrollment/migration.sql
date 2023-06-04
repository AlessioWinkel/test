-- CreateTable
CREATE TABLE "Enrollment" (
    "studentId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "study" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_studentId_key" ON "Enrollment"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_courseId_key" ON "Enrollment"("courseId");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
