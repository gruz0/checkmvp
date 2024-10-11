-- CreateTable
CREATE TABLE "ideas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "initial_problem" TEXT NOT NULL,
    "initial_target_audience" TEXT NOT NULL,
    "problem" TEXT,
    "target_audience" TEXT,
    "mvp_features" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "problem_evaluations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "suggestions" TEXT NOT NULL,
    "recommendations" TEXT NOT NULL,
    "pain_points" TEXT NOT NULL,
    "market_existence" TEXT NOT NULL,
    "idea_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "problem_evaluations_idea_id_fkey" FOREIGN KEY ("idea_id") REFERENCES "ideas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "target_audience_evaluations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "existence" TEXT NOT NULL,
    "suggestions" TEXT NOT NULL,
    "recommendations" TEXT NOT NULL,
    "idea_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "target_audience_evaluations_idea_id_fkey" FOREIGN KEY ("idea_id") REFERENCES "ideas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "content_and_strategy_evaluations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value_proposition" TEXT NOT NULL,
    "mvp_recommendation" TEXT NOT NULL,
    "two_week_plan" TEXT NOT NULL,
    "mvp_cost_and_timeline" TEXT NOT NULL,
    "idea_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "content_and_strategy_evaluations_idea_id_fkey" FOREIGN KEY ("idea_id") REFERENCES "ideas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_acquisition_and_competitor_analysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "early_adopters_acquisition_ideas" TEXT NOT NULL,
    "competitor_overview" TEXT NOT NULL,
    "potential_product_names" TEXT NOT NULL,
    "collaboration_opportunities" TEXT NOT NULL,
    "idea_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "user_acquisition_and_competitor_analysis_idea_id_fkey" FOREIGN KEY ("idea_id") REFERENCES "ideas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "content_strategy_and_growth_plans" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idea_id" TEXT NOT NULL,
    "content_marketing_ideas" TEXT NOT NULL,
    "key_metrics_to_track_post_launch" TEXT NOT NULL,
    "recommended_tools_and_services" TEXT NOT NULL,
    "case_study_outline" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "content_strategy_and_growth_plans_idea_id_fkey" FOREIGN KEY ("idea_id") REFERENCES "ideas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "problem_evaluations_idea_id_key" ON "problem_evaluations"("idea_id");

-- CreateIndex
CREATE UNIQUE INDEX "target_audience_evaluations_idea_id_key" ON "target_audience_evaluations"("idea_id");

-- CreateIndex
CREATE UNIQUE INDEX "content_and_strategy_evaluations_idea_id_key" ON "content_and_strategy_evaluations"("idea_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_acquisition_and_competitor_analysis_idea_id_key" ON "user_acquisition_and_competitor_analysis"("idea_id");

-- CreateIndex
CREATE UNIQUE INDEX "content_strategy_and_growth_plans_idea_id_key" ON "content_strategy_and_growth_plans"("idea_id");
