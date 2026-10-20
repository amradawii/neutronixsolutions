<?php

namespace Tests\Feature;

use App\Models\Admin;
use App\Providers\AppServiceProvider;
use Database\Seeders\AdminSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ProductionSafetyTest extends TestCase
{
    use RefreshDatabase;

    protected function tearDown(): void
    {
        DB::prohibitDestructiveCommands(false);

        parent::tearDown();
    }

    public function test_destructive_database_commands_are_blocked_in_production(): void
    {
        $this->app->detectEnvironment(fn () => 'production');
        (new AppServiceProvider($this->app))->boot();

        $this->artisan('migrate:fresh')->assertFailed();
        $this->artisan('migrate:refresh')->assertFailed();
        $this->artisan('migrate:reset')->assertFailed();
        $this->artisan('db:wipe')->assertFailed();
    }

    public function test_admin_seeder_creates_the_default_admin_outside_production(): void
    {
        $this->seed(AdminSeeder::class);

        $admin = Admin::where('username', 'admin')->firstOrFail();
        $this->assertTrue(Hash::check('admin123', $admin->password));
    }

    public function test_admin_seeder_never_resets_an_existing_admin_password(): void
    {
        Admin::create([
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@neutronixsolutions.com',
            'password' => 'ChangedPassword123!',
        ]);

        $this->seed(AdminSeeder::class);

        $this->assertTrue(Hash::check('ChangedPassword123!', Admin::where('username', 'admin')->value('password')));
        $this->assertSame(1, Admin::count());
    }
}
