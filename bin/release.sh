#!/bin/bash

# Check if .env.production exists
if [ ! -f .env.production ]; then
  echo "Error: .env.production file is missing."
  exit 1
fi

current_branch=$(git symbolic-ref --short HEAD)
if [ "$current_branch" != "main" ]; then
  echo "Aborting release: Not on 'main' branch. Current branch is '$current_branch'."
  exit 1
fi

yarn install --pure-lockfile
yarn build:ssr

# Run Pint
./vendor/bin/pint
git diff --quiet && git diff --staged --quiet || git commit -am 'Pint styles fix'

php artisan migrate:fresh --env=testing
if ! ./vendor/bin/pest -d memory_limit=512M --stop-on-failure; then
  echo "PHPUnit tests failed. Stopping release process."
  exit 1
fi

#if ! ./vendor/bin/phpstan analyse --memory-limit=512M; then
#  echo "PHPStan failed. Stopping release process"
#  exit 1
#fi

# Deploy into production
php ./vendor/bin/envoy run deploy

git commit -m "Release: Deploy new version $(date +'%Y-%m-%d %H:%M:%S')"
git push origin main
