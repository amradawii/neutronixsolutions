<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin overview dashboard.
     */
    public function index()
    {
        $admin = Auth::guard('admin')->user();
        $inquiries = $this->inquiryData();

        // Mock statistics and inquiries representing standard dashboard data
        $stats = [
            'total_inquiries' => 48,
            'unread_inquiries' => 12,
            'active_campaigns' => 8,
            'pipeline_value' => '$68,400',
        ];

        return Inertia::render('Admin/Dashboard', [
            'admin' => $this->adminData($admin),
            'stats' => $stats,
            'inquiries' => array_slice($inquiries, 0, 4),
        ]);
    }

    public function inquiries()
    {
        $admin = Auth::guard('admin')->user();

        return Inertia::render('Admin/Inquiries', [
            'admin' => $this->adminData($admin),
            'inquiries' => $this->inquiryData(),
        ]);
    }

    private function adminData($admin): array
    {
        return [
            'name' => $admin->name,
            'username' => $admin->username,
            'email' => $admin->email,
            'photo_url' => $admin->photo_url,
        ];
    }

    private function inquiryData(): array
    {
        return [
            [
                'id' => 1,
                'name' => 'Hassan Al-Harbi',
                'email' => 'hassan@harbiventures.com',
                'phone' => '+974 5500 1284',
                'company' => 'Harbi Ventures',
                'service' => 'Cloud & Infrastructure',
                'message' => 'We need a full architecture audit for our Azure environment before migrating two business-critical workloads next month.',
                'created_at' => '2 hours ago',
                'submitted_at' => 'Sep 10, 2026 · 1:18 PM',
                'status' => 'unread',
            ],
            [
                'id' => 2,
                'name' => 'Sarah Vance',
                'email' => 's.vance@apexcap.com',
                'phone' => '+974 6621 9032',
                'company' => 'Apex Capital',
                'service' => 'Custom Software & Platforms',
                'message' => 'Our investment team needs a secure client portal with document workflows, role-based access, and reporting dashboards.',
                'created_at' => '5 hours ago',
                'submitted_at' => 'Sep 10, 2026 · 10:06 AM',
                'status' => 'unread',
            ],
            [
                'id' => 3,
                'name' => 'Omar Qabbani',
                'email' => 'omar@solaraenergy.com',
                'phone' => '+974 7714 2450',
                'company' => 'Solara Energy',
                'service' => 'Automation & Integration',
                'message' => 'We want to automate lead qualification and synchronize our CRM, quotation tool, and operations dashboard.',
                'created_at' => 'Yesterday',
                'submitted_at' => 'Sep 9, 2026 · 3:42 PM',
                'status' => 'read',
            ],
            [
                'id' => 4,
                'name' => 'Emily Cole',
                'email' => 'emily@aetherskincare.com',
                'phone' => '+974 5058 7821',
                'company' => 'Aether Skincare',
                'service' => 'Creative & Growth',
                'message' => 'We need a conversion audit and a new set of campaign landing pages for our regional product launch.',
                'created_at' => '2 days ago',
                'submitted_at' => 'Sep 8, 2026 · 11:27 AM',
                'status' => 'replied',
            ],
            [
                'id' => 5,
                'name' => 'Mariam Al-Kuwari',
                'email' => 'mariam@northstar.qa',
                'phone' => '+974 3341 6029',
                'company' => 'Northstar Logistics',
                'service' => 'Data & Business Intelligence',
                'message' => 'Our teams currently compile weekly operational reports manually. We would like one reliable executive dashboard.',
                'created_at' => '3 days ago',
                'submitted_at' => 'Sep 7, 2026 · 9:14 AM',
                'status' => 'unread',
            ],
            [
                'id' => 6,
                'name' => 'Daniel Mercer',
                'email' => 'daniel@lumenedu.com',
                'phone' => '+974 7018 4427',
                'company' => 'Lumen Education',
                'service' => 'Applied AI & Retrieval Systems',
                'message' => 'We are exploring a bilingual knowledge assistant grounded in our internal curriculum and policy documents.',
                'created_at' => '4 days ago',
                'submitted_at' => 'Sep 6, 2026 · 2:51 PM',
                'status' => 'read',
            ],
            [
                'id' => 7,
                'name' => 'Noura Al-Mansoori',
                'email' => 'noura@novusliving.qa',
                'phone' => '+974 5539 1136',
                'company' => 'Novus Living',
                'service' => 'Maintenance & Optimization',
                'message' => 'Our resident platform has become slow during peak hours and deployments are increasingly risky. We need a technical review.',
                'created_at' => '5 days ago',
                'submitted_at' => 'Sep 5, 2026 · 4:03 PM',
                'status' => 'replied',
            ],
            [
                'id' => 8,
                'name' => 'Faisal Rahman',
                'email' => 'faisal@zeta-warehouses.com',
                'phone' => '+974 6670 8215',
                'company' => 'Zeta Warehouses',
                'service' => 'MVP & Startup Engineering',
                'message' => 'We have validated a warehouse booking concept and need help defining and building the first production release.',
                'created_at' => '6 days ago',
                'submitted_at' => 'Sep 4, 2026 · 12:38 PM',
                'status' => 'unread',
            ],
            [
                'id' => 9,
                'name' => 'Leila Haddad',
                'email' => 'leila@crescentsystems.io',
                'phone' => '+974 3092 6754',
                'company' => 'Crescent Systems',
                'service' => 'Cloud & Infrastructure',
                'message' => 'We are preparing for a compliance review and need to assess identity, network, backup, and monitoring controls in Azure.',
                'created_at' => '1 week ago',
                'submitted_at' => 'Sep 3, 2026 · 10:22 AM',
                'status' => 'read',
            ],
            [
                'id' => 10,
                'name' => 'Yousef Al-Salem',
                'email' => 'yousef@meridianhealth.qa',
                'phone' => '+974 4482 9061',
                'company' => 'Meridian Health',
                'service' => 'Custom Software & Platforms',
                'message' => 'We need to replace several spreadsheet-based approval processes with a secure internal operations platform.',
                'created_at' => '1 week ago',
                'submitted_at' => 'Sep 2, 2026 · 8:45 AM',
                'status' => 'replied',
            ],
        ];
    }
}
