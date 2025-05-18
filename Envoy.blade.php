@php
    require_once './vendor/autoload.php';
    use Illuminate\Foundation\Console\Kernel;

    $app = require './bootstrap/app.php';
    $app->make(Kernel::class)->bootstrap();

    $servers = collect(config('release.servers'))->map(fn($item)=>$item['user'])->toArray();
    $prod = config('release.servers.prod');
@endphp

@servers($servers)

@setup
$base = $prod['path'];
$repository = 'git@github.com:bedus-creation/keeraparser.git';
$releaseDir = sprintf('%s/releases', $base);

$release = date('YmdHis');
$newReleaseDir = sprintf('%s/%s',$releaseDir, $release);
@endsetup

@story('deploy')
clone_repository
composer
upload-assets
deflate-assets
symlinks
laravel
old-releases
nginx
@endstory

@task('clone_repository',['on' => 'prod'])
echo 'Cloning repository'
[ -d {{ $releaseDir }} ] || mkdir {{ $releaseDir }}
git clone --depth 1 {{ $repository }} {{ $newReleaseDir }}
cd {{ $newReleaseDir }}
git reset --hard {{ $commit }}
@endtask

@task('upload-assets', ['on' => 'local'])
echo "Zipping SSR folder..."
zip -r bootstrap/ssr.zip bootstrap/ssr

echo "Uploading SSR ZIP to remote server..."
scp -r bootstrap/ssr.zip {{$prod['user']}}:{{$newReleaseDir}}/bootstrap/ssr.zip
rm -rf bootstrap/ssr.zip

echo "Zipping build folder..."
zip -r public/build.zip public/build

echo "Uploading Build ZIP to remote server..."
scp -r ./public/build.zip {{$prod['user']}}:{{$newReleaseDir}}/public/build.zip
rm -rf ./public/build.zip

echo "Copy Environment files to Production"
scp -r .env.production {{$prod['user']}}:{{$newReleaseDir}}/.env
@endtask

@task('symlinks', ['on' => 'prod'])
echo "Linking storage directory"
rm -rf {{ $newReleaseDir }}/storage
ln -nfs {{ $base }}/storage {{ $newReleaseDir }}/storage

echo 'Linking Database'
ln -s "{{ $base }}/database/database.sqlite" "{{ $newReleaseDir }}/database/database.sqlite"

echo 'Linking current release'
ln -nfs {{ $newReleaseDir }} {{ $base }}/current

echo "Move the workers for supervisors"
sudo mv {{$newReleaseDir}}/bin/keeraparser-ssr-worker.conf /etc/supervisor/conf.d/keeraparser-ssr-worker.conf
sudo mv {{$newReleaseDir}}/bin/keeraparser-horizon.conf /etc/supervisor/conf.d/keeraparser-horizon.conf
@endtask

@task('deflate-assets', ['on' => 'prod'])
echo "Unzipping on remote server..."
unzip -o {{$newReleaseDir}}/public/build.zip -d {{$newReleaseDir}}/
unzip -o {{$newReleaseDir}}/bootstrap/ssr.zip -d {{$newReleaseDir}}/

rm {{$newReleaseDir}}/public/build.zip
rm {{$newReleaseDir}}/bootstrap/ssr.zip
@endtask

@task('composer', ['on' => 'prod'])
echo "Starting deployment ({{ $release }})"
cd {{ $newReleaseDir }}
php8.3 /usr/bin/composer install --no-dev --prefer-dist --no-scripts -q -o
php8.3 artisan vendor:publish --tag=laravel-assets --ansi --force
@endtask

@task('laravel',  ['on' => 'prod'])
cd {{ $newReleaseDir }}
php8.3 artisan storage:link
{{--php8.3 artisan optimize--}}
{{--php8.3 artisan view:clear--}}
{{--php8.3 artisan config:cache--}}

php8.3 artisan horizon:terminate
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl stop "keeraparser-horizon:*"
sudo supervisorctl stop "keeraparser-ssr-worker:*"
sudo supervisorctl start "keeraparser-horizon:*"
sudo supervisorctl start "keeraparser-ssr-worker:*"
@endtask

@task('nginx', ['on' => 'prod'])
sudo cp {{ $newReleaseDir }}/bin/nginx.conf /etc/nginx/sites-available/{{$prod['domain']}}
sudo nginx -t
sudo service nginx reload
@endtask

@task('old-releases', ['on' => 'prod'])
cd {{ $releaseDir }} && ls . | grep -v "{{$release}}" | xargs rm -r
@endtask


