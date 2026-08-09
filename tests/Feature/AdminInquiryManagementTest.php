<?php

namespace Tests\Feature;

use App\Models\Admin;
use App\Models\Inquiry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminInquiryManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_cannot_view_or_update_inquiries(): void
    {
        $inquiry = Inquiry::factory()->create();

        $this->get(route('admin.inquiries'))->assertRedirect(route('admin.login'));
        $this->patch(route('admin.inquiries.status', $inquiry), ['status' => 'read'])
            ->assertRedirect(route('admin.login'));
    }

    public function test_admin_can_filter_and_search_paginated_inquiries(): void
    {
        $this->actingAsAdmin();
        Inquiry::factory()->count(11)->create();
        Inquiry::factory()->read()->create([
            'name' => 'Unique Client',
            'email' => 'unique@example.com',
            'service' => 'cloud',
        ]);

        $this->get(route('admin.inquiries', [
            'search' => 'Unique Client',
            'status' => 'read',
            'service' => 'cloud',
        ]))->assertOk()->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Inquiries')
            ->where('filters.search', 'Unique Client')
            ->where('filters.status', 'read')
            ->where('filters.service', 'cloud')
            ->where('inquiries.total', 1)
            ->has('inquiries.data', 1)
            ->where('inquiries.data.0.email', 'unique@example.com'));
    }

    public function test_admin_can_mark_an_inquiry_as_read_and_replied(): void
    {
        $this->actingAsAdmin();
        $inquiry = Inquiry::factory()->create();

        $this->patch(route('admin.inquiries.status', $inquiry), ['status' => 'read'])
            ->assertRedirect();
        $inquiry->refresh();
        $this->assertSame(Inquiry::STATUS_READ, $inquiry->status);
        $this->assertNotNull($inquiry->read_at);

        $this->patch(route('admin.inquiries.status', $inquiry), ['status' => 'replied'])
            ->assertRedirect()
            ->assertSessionHas('success');
        $inquiry->refresh();
        $this->assertSame(Inquiry::STATUS_REPLIED, $inquiry->status);
        $this->assertNotNull($inquiry->replied_at);
    }

    public function test_invalid_status_is_rejected(): void
    {
        $this->actingAsAdmin();
        $inquiry = Inquiry::factory()->create();

        $this->patch(route('admin.inquiries.status', $inquiry), ['status' => 'deleted'])
            ->assertSessionHasErrors('status');

        $this->assertSame(Inquiry::STATUS_UNREAD, $inquiry->fresh()->status);
    }

    private function actingAsAdmin(): Admin
    {
        $admin = Admin::create([
            'name' => 'Test Administrator',
            'username' => 'test_admin',
            'email' => 'admin@example.com',
            'password' => 'SecurePassword123!',
        ]);

        $this->actingAs($admin, 'admin');

        return $admin;
    }
}
