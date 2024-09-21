.DEFAULT_GOAL := help

NPM := npm
NPM_RUN := ${NPM} run
NPX := npx

DOCKER_COMPOSE := docker compose

help: # Show this help
	@egrep -h '\s#\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?# "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

#
# Development environment
#

setup: # Install dependencies
	@${NPM} install
	@${NPM_RUN} prepare

prepare-dev-env:
	@cp .env.development .env

analyze: prepare-dev-env # Analyze bundles
	@${NPM_RUN} analyze

build: prepare-dev-env # Build project
	@${NPM_RUN} build

dev: prepare-dev-env # Run dev server
	@${NPM_RUN} dev

lint: # Run linters
	@${NPM_RUN} lint

fix: # Run automatically fixes
	@${NPM_RUN} next-lint-fix
	@${NPX} prettier -w .

#
# Production environment
#

prepare-prod-env:
	@cp .env.production .env

prod-docker-build: prepare-prod-env # Build Docker image
	@${DOCKER_COMPOSE} -f docker-compose.production.yml build

prod-docker-start: prepare-prod-env # Run Docker container
	@${DOCKER_COMPOSE} -f docker-compose.production.yml up -d

prod-docker-stop: prepare-prod-env # Stop Docker container
	@${DOCKER_COMPOSE} -f docker-compose.production.yml down

prod-docker-app-cli: prepare-prod-env # Attach to Docker container
	@${DOCKER_COMPOSE} -f docker-compose.production.yml exec app sh

prod-docker-logs: prepare-prod-env # Show production related logs
	@${DOCKER_COMPOSE} -f docker-compose.production.yml logs -f
