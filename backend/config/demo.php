<?php

$enabled = env('DEMO_SEED_ENABLED');

return [
    'enabled' => $enabled === true || $enabled === 'true',
    'user_name' => env('DEMO_USER_NAME'),
    'user_email' => env('DEMO_USER_EMAIL'),
    'user_password' => env('DEMO_USER_PASSWORD'),
];
