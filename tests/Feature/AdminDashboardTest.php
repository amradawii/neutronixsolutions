<?php

namespace Tests\Feature;

use App\Models\Admin;
use App\Models\Inquiry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_uses_real_inquiry_metrics_and_recent_records(): void
    {
        $admin = Admin::create([
            'name' => 'Test Administrator',
            'username' => 'dashboard_admin',
            'email' => 'dashboard@example.com',
            'password' => 'SecurePassword123!',
        ]);
        $this->actingAs($admin, 'admin');

        Inquiry::factory()->count(2)->create();
        Inquiry::factory()->read()->create();
        Inquiry::factory()->replied()->create();
        Inquiry::factory()->create(['created_at' => now()->subMonths(2)]);

        $this->get(route('admin.dashboard'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Dashboard')
                ->where('stats.total_inquiries', 5)
                ->where('stats.unread_inquiries', 3)
                ->where('stats.replied_inquiries', 1)
                ->where('stats.monthly_inquiries', 4)
                ->has('inquiries', 4)
                ->where('adminUnreadInquiries', 3));
    }
}
