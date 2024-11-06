/*
  Warnings:

  - You are about to drop the `content_and_strategy_evaluations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `content_strategy_and_growth_plans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ideas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `problem_evaluations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `target_audience_evaluations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_acquisition_and_competitor_analysis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "content_and_strategy_evaluations";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "content_strategy_and_growth_plans";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ideas";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "problem_evaluations";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "target_audience_evaluations";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "user_acquisition_and_competitor_analysis";
PRAGMA foreign_keys=on;
