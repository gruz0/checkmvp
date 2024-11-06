-- CreateTable
CREATE TABLE "concepts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "problem" TEXT NOT NULL,
    "evaluation" TEXT,
    "idea_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "evaluated_at" DATETIME,
    "accepted_at" DATETIME,
    "transitioned_at" DATETIME
);
