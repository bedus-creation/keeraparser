cp .env.example  .env
composer install
touch database/database.sqlite
php artisan key:generate
php artisan migrate:fresh --seed
composer dev

