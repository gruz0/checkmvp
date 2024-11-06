-- CreateTable
CREATE TABLE "ideas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "concept_id" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "market_existence" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ideas_concept_id_key" ON "ideas"("concept_id");
