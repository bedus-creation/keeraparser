yarn install --pure-lockfile
yarn build:ssr

# Run Pint
./vendor/bin/pint
git diff --quiet && git diff --staged --quiet || git commit -am 'Pint styles fix'

php artisan migrate:fresh --env=testing
if ! ./vendor/bin/phpunit -d memory_limit=512M --stop-on-failure; then
  echo "PHPUnit tests failed. Stopping release process."
  exit 1
fi

#if ! ./vendor/bin/phpstan analyse --memory-limit=512M; then
#  echo "PHPStan failed. Stopping release process"
#  exit 1
#fi

# Deploy into production
php ./vendor/bin/envoy run deploy
