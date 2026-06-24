<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('db:create', function () {
    if (config('database.default') !== 'mysql') {
        $this->error('Cette commande est réservée à une connexion MySQL.');

        return 1;
    }

    $database = (string) config('database.connections.mysql.database');

    if (! preg_match('/^[a-zA-Z0-9_-]+$/', $database)) {
        $this->error('Le nom de la base de données est invalide.');

        return 1;
    }

    config(['database.connections.mysql.database' => null]);
    DB::purge('mysql');
    DB::connection('mysql')->statement(
        "CREATE DATABASE IF NOT EXISTS `{$database}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci",
    );
    DB::purge('mysql');
    config(['database.connections.mysql.database' => $database]);

    $this->info("Base de données « {$database} » prête.");

    return 0;
})->purpose('Créer la base MySQL configurée dans le fichier .env');
