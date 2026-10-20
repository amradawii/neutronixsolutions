<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Admin::where('username', 'admin')->exists()) {
            $this->command?->warn('The "admin" account already exists; its password was left unchanged.');

            return;
        }

        $password = 'admin123';

        if (app()->isProduction()) {
            $password = (string) $this->command?->secret('Password for the "admin" account (at least 12 characters)');

            if (strlen($password) < 12) {
                throw new RuntimeException('Refusing to create the production admin without a password of at least 12 characters.');
            }
        }

        Admin::create([
            'username' => 'admin',
            'name' => 'Administrator',
            'email' => 'admin@neutronixsolutions.com',
            'password' => Hash::make($password),
        ]);
    }
}
