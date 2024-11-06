-- CreateTable
CREATE TABLE "target_audiences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "segment" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "challenges" TEXT NOT NULL,
    "why" TEXT,
    "pain_points" TEXT,
    "targeting_strategy" TEXT,
    "idea_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "evaluated_at" DATETIME,
    CONSTRAINT "target_audiences_idea_id_fkey" FOREIGN KEY ("idea_id") REFERENCES "ideas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
