-- CreateTable
CREATE TABLE "MyTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "frequency" TEXT NOT NULL,
    "displayDays" JSONB NOT NULL
);

-- CreateIndex
CREATE INDEX "MyTask_frequency_idx" ON "MyTask"("frequency");
