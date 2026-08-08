<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_the_testing_database_connection_is_isolated(): void
    {
        $database = DB::selectOne('select database() as current_database')->current_database;

        $this->assertSame('neutronix_testing', $database);
    }
}
