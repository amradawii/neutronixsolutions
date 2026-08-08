<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use RuntimeException;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        if (($_ENV['APP_ENV'] ?? null) !== 'testing' || ($_ENV['DB_DATABASE'] ?? null) !== 'neutronix_testing') {
            throw new RuntimeException('Tests may only run with APP_ENV=testing and DB_DATABASE=neutronix_testing.');
        }

        parent::setUp();

        $connection = config('database.default');
        $database = config("database.connections.{$connection}.database");

        if ($connection !== 'mysql' || $database !== 'neutronix_testing') {
            throw new RuntimeException('Refusing to run tests against a non-testing database.');
        }
    }
}
