-- CreateTable
CREATE TABLE "TaskOccurrence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "taskId" TEXT NOT NULL,
    "dateUTC" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "assigneeId" TEXT,
    "assigneeName" TEXT,
    "comment" TEXT,
    "completedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TaskOccurrence_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "TaskOccurrence_dateUTC_idx" ON "TaskOccurrence"("dateUTC");

-- CreateIndex
CREATE INDEX "TaskOccurrence_assigneeId_idx" ON "TaskOccurrence"("assigneeId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskOccurrence_taskId_dateUTC_key" ON "TaskOccurrence"("taskId", "dateUTC");
