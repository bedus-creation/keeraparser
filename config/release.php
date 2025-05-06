<?php

return [
    'servers' => [
        'local' => [
            'user' => env('SERVER_LOCAL', '127.0.0.1')
        ],
        'prod'  => [
            'domain' => 'keeraparser.com',
            'user' => env('SERVER_PROD', 'forge@127.0.0.1'),
            'path' => '/home/forge/keeraparser.com',
        ]
    ]
];
