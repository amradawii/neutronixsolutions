<?php

namespace Tests\Feature;

use App\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_view_login_page(): void
    {
        $this->get(route('admin.login'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Admin/Login'));
    }

    public function test_authenticated_admin_visiting_login_redirects_to_dashboard(): void
    {
        $admin = $this->createAdmin();

        $this->actingAs($admin, 'admin')
            ->get(route('admin.login'))
            ->assertRedirect(route('admin.dashboard'));
    }

    public function test_admin_can_log_in_and_log_out(): void
    {
        $admin = $this->createAdmin();

        $this->from(route('admin.login'))->post(route('admin.login.post'), [
            'username' => $admin->username,
            'password' => 'SecurePassword123!',
        ])->assertRedirect(route('admin.dashboard'))->assertSessionHas('success');

        $this->assertAuthenticatedAs($admin, 'admin');

        $this->post(route('admin.logout'))
            ->assertRedirect(route('admin.login'))
            ->assertSessionHas('success');

        $this->assertGuest('admin');
    }

    public function test_invalid_credentials_are_rejected(): void
    {
        $admin = $this->createAdmin();

        $this->from(route('admin.login'))->post(route('admin.login.post'), [
            'username' => $admin->username,
            'password' => 'WrongPassword123!',
        ])->assertRedirect(route('admin.login'))->assertSessionHasErrors('username');

        $this->assertGuest('admin');
    }

    public function test_login_is_rate_limited_after_five_attempts_for_the_same_username_and_ip(): void
    {
        $admin = $this->createAdmin(['username' => 'limited_admin']);
        $ip = '198.51.100.10';
        $userKey = 'admin-login-user:limited_admin|'.$ip;
        $ipKey = 'admin-login-ip:'.$ip;
        RateLimiter::clear($userKey);
        RateLimiter::clear($ipKey);

        for ($attempt = 0; $attempt < 5; $attempt++) {
            $this->withServerVariables(['REMOTE_ADDR' => $ip])
                ->from(route('admin.login'))
                ->post(route('admin.login.post'), [
                    'username' => $admin->username,
                    'password' => 'WrongPassword123!',
                ])->assertSessionHasErrors('username');
        }

        $this->withServerVariables(['REMOTE_ADDR' => $ip])
            ->from(route('admin.login'))
            ->post(route('admin.login.post'), [
                'username' => $admin->username,
                'password' => 'WrongPassword123!',
            ])->assertRedirect(route('admin.login'))->assertSessionHasErrors([
                'username' => 'Too many login attempts. Please wait a minute and try again.',
            ]);

        RateLimiter::clear($userKey);
        RateLimiter::clear($ipKey);
    }

    private function createAdmin(array $attributes = []): Admin
    {
        return Admin::create(array_merge([
            'name' => 'Test Administrator',
            'username' => 'test_admin',
            'email' => 'admin@example.com',
            'password' => 'SecurePassword123!',
        ], $attributes));
    }
}
