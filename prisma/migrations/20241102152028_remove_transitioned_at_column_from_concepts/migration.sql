/*
  Warnings:

  - You are about to drop the column `transitioned_at` on the `concepts` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_concepts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "problem" TEXT NOT NULL,
    "evaluation" TEXT,
    "idea_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "evaluated_at" DATETIME,
    "accepted_at" DATETIME,
    "archived_at" DATETIME
);
INSERT INTO "new_concepts" ("accepted_at", "archived_at", "created_at", "evaluated_at", "evaluation", "id", "idea_id", "problem", "updated_at") SELECT "accepted_at", "archived_at", "created_at", "evaluated_at", "evaluation", "id", "idea_id", "problem", "updated_at" FROM "concepts";
DROP TABLE "concepts";
ALTER TABLE "new_concepts" RENAME TO "concepts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
