-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "task" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "displayDay" JSONB NOT NULL,
    "deadline" JSONB NOT NULL
);

-- CreateIndex
CREATE INDEX "Task_frequency_idx" ON "Task"("frequency");
