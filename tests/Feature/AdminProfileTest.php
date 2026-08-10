<?php

namespace Tests\Feature;

use App\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_cannot_access_profile_endpoints(): void
    {
        $this->get(route('admin.profile'))->assertRedirect(route('admin.login'));
        $this->post(route('admin.profile.update'))->assertRedirect(route('admin.login'));
        $this->post(route('admin.profile.password'))->assertRedirect(route('admin.login'));
    }

    public function test_admin_can_view_profile(): void
    {
        $admin = $this->createAdmin();
        $this->actingAs($admin, 'admin');

        $this->get(route('admin.profile'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Profile')
                ->where('admin.id', $admin->id)
                ->where('admin.name', $admin->name)
                ->where('admin.username', $admin->username)
                ->where('admin.email', $admin->email));
    }

    public function test_admin_can_update_profile_information(): void
    {
        $admin = $this->createAdmin();
        $this->actingAs($admin, 'admin');

        $this->post(route('admin.profile.update'), [
            'name' => 'Updated Administrator',
            'username' => $admin->username,
            'email' => $admin->email,
        ])->assertRedirect(route('admin.profile'))->assertSessionHas('success');

        $admin->refresh();
        $this->assertSame('Updated Administrator', $admin->name);
        $this->assertSame('test_admin', $admin->username);
        $this->assertSame('admin@example.com', $admin->email);
    }

    public function test_profile_information_uses_server_validation_rules(): void
    {
        $admin = $this->createAdmin();
        $other = $this->createAdmin([
            'username' => 'existing_admin',
            'email' => 'existing@example.com',
        ]);
        $this->actingAs($admin, 'admin');

        $this->from(route('admin.profile'))->post(route('admin.profile.update'), [
            'name' => 'A',
            'username' => $other->username,
            'email' => $other->email,
            'photo' => UploadedFile::fake()->create('avatar.txt', 1, 'text/plain'),
        ])->assertRedirect(route('admin.profile'))->assertSessionHasErrors([
            'name',
            'username',
            'email',
            'photo',
        ]);

        $admin->refresh();
        $this->assertSame('Test Administrator', $admin->name);
        $this->assertSame('test_admin', $admin->username);
        $this->assertSame('admin@example.com', $admin->email);
    }

    public function test_password_update_rejects_wrong_current_and_weak_new_passwords(): void
    {
        $admin = $this->createAdmin();
        $this->actingAs($admin, 'admin');

        $this->from(route('admin.profile'))->post(route('admin.profile.password'), [
            'current_password' => 'WrongPassword123!',
            'password' => 'NewSecurePassword123!',
            'password_confirmation' => 'NewSecurePassword123!',
        ])->assertRedirect(route('admin.profile'))->assertSessionHasErrors('current_password');

        $this->from(route('admin.profile'))->post(route('admin.profile.password'), [
            'current_password' => 'SecurePassword123!',
            'password' => 'weakpass',
            'password_confirmation' => 'weakpass',
        ])->assertRedirect(route('admin.profile'))->assertSessionHasErrors('password');

        $this->assertTrue(Hash::check('SecurePassword123!', $admin->fresh()->password));
    }

    public function test_admin_can_update_password(): void
    {
        $admin = $this->createAdmin();
        $this->actingAs($admin, 'admin');

        $this->post(route('admin.profile.password'), [
            'current_password' => 'SecurePassword123!',
            'password' => 'NewSecurePassword123!',
            'password_confirmation' => 'NewSecurePassword123!',
        ])->assertRedirect(route('admin.profile'))->assertSessionHas('success');

        $this->assertTrue(Hash::check('NewSecurePassword123!', $admin->fresh()->password));
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
