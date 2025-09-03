-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "task" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "displayDay" JSONB NOT NULL,
    "deadline" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "assignedTo" TEXT NOT NULL DEFAULT '',
    "comment" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Task" ("deadline", "description", "displayDay", "frequency", "id", "task") SELECT "deadline", "description", "displayDay", "frequency", "id", "task" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE INDEX "Task_frequency_idx" ON "Task"("frequency");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
