<?php

namespace Database\Seeders;

use App\Models\Inquiry;
use Illuminate\Database\Seeder;

class InquirySeeder extends Seeder
{
    public function run(): void
    {
        $inquiries = [
            ['name' => 'Hassan Al-Harbi', 'email' => 'hassan@harbiventures.com', 'phone' => '+974 5500 1284', 'company' => 'Harbi Ventures', 'service' => 'cloud', 'message' => 'We need a full architecture audit for our Azure environment before migrating two business-critical workloads next month.', 'locale' => 'en', 'status' => 'unread', 'age' => '2 hours'],
            ['name' => 'Sarah Vance', 'email' => 's.vance@apexcap.com', 'phone' => '+974 6621 9032', 'company' => 'Apex Capital', 'service' => 'software', 'message' => 'Our investment team needs a secure client portal with document workflows, role-based access, and reporting dashboards.', 'locale' => 'en', 'status' => 'unread', 'age' => '5 hours'],
            ['name' => 'Omar Qabbani', 'email' => 'omar@solaraenergy.com', 'phone' => '+974 7714 2450', 'company' => 'Solara Energy', 'service' => 'automation', 'message' => 'We want to automate lead qualification and synchronize our CRM, quotation tool, and operations dashboard.', 'locale' => 'en', 'status' => 'read', 'age' => '1 day'],
            ['name' => 'Emily Cole', 'email' => 'emily@aetherskincare.com', 'phone' => '+974 5058 7821', 'company' => 'Aether Skincare', 'service' => 'creative', 'message' => 'We need a conversion audit and a new set of campaign landing pages for our regional product launch.', 'locale' => 'en', 'status' => 'replied', 'age' => '2 days'],
            ['name' => 'Mariam Al-Kuwari', 'email' => 'mariam@northstar.qa', 'phone' => '+974 3341 6029', 'company' => 'Northstar Logistics', 'service' => 'data', 'message' => 'Our teams currently compile weekly operational reports manually. We would like one reliable executive dashboard.', 'locale' => 'en', 'status' => 'unread', 'age' => '3 days'],
            ['name' => 'Daniel Mercer', 'email' => 'daniel@lumenedu.com', 'phone' => '+974 7018 4427', 'company' => 'Lumen Education', 'service' => 'ai', 'message' => 'We are exploring a bilingual knowledge assistant grounded in our internal curriculum and policy documents.', 'locale' => 'en', 'status' => 'read', 'age' => '4 days'],
            ['name' => 'Noura Al-Mansoori', 'email' => 'noura@novusliving.qa', 'phone' => '+974 5539 1136', 'company' => 'Novus Living', 'service' => 'optimize', 'message' => 'Our resident platform has become slow during peak hours and deployments are increasingly risky. We need a technical review.', 'locale' => 'en', 'status' => 'replied', 'age' => '5 days'],
            ['name' => 'Faisal Rahman', 'email' => 'faisal@zeta-warehouses.com', 'phone' => '+974 6670 8215', 'company' => 'Zeta Warehouses', 'service' => 'startup', 'message' => 'We have validated a warehouse booking concept and need help defining and building the first production release.', 'locale' => 'en', 'status' => 'unread', 'age' => '6 days'],
            ['name' => 'Leila Haddad', 'email' => 'leila@crescentsystems.io', 'phone' => '+974 3092 6754', 'company' => 'Crescent Systems', 'service' => 'cloud', 'message' => 'We are preparing for a compliance review and need to assess identity, network, backup, and monitoring controls in Azure.', 'locale' => 'en', 'status' => 'read', 'age' => '7 days'],
            ['name' => 'Yousef Al-Salem', 'email' => 'yousef@meridianhealth.qa', 'phone' => '+974 4482 9061', 'company' => 'Meridian Health', 'service' => 'software', 'message' => 'We need to replace several spreadsheet-based approval processes with a secure internal operations platform.', 'locale' => 'en', 'status' => 'replied', 'age' => '8 days'],
            ['name' => 'أحمد الكعبي', 'email' => 'ahmed@mada.qa', 'phone' => '+974 6652 1740', 'company' => 'مدى للتجارة', 'service' => 'automation', 'message' => 'نرغب في أتمتة إجراءات الطلبات والموافقات وربطها بنظام إدارة العملاء الحالي.', 'locale' => 'ar', 'status' => 'unread', 'age' => '9 days'],
            ['name' => 'سارة الأنصاري', 'email' => 'sara@baytna.qa', 'phone' => '+974 5528 4103', 'company' => 'بيتنا', 'service' => 'software', 'message' => 'نحتاج إلى منصة داخلية آمنة لإدارة العمليات والتقارير والصلاحيات بين فرق العمل.', 'locale' => 'ar', 'status' => 'read', 'age' => '11 days'],
        ];

        foreach ($inquiries as $data) {
            $createdAt = now()->sub($data['age']);
            unset($data['age']);

            $inquiry = Inquiry::updateOrCreate(['email' => $data['email']], $data);
            $inquiry->forceFill([
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
                'read_at' => $data['status'] === Inquiry::STATUS_UNREAD ? null : $createdAt->copy()->addHour(),
                'replied_at' => $data['status'] === Inquiry::STATUS_REPLIED ? $createdAt->copy()->addHours(3) : null,
            ])->saveQuietly();
        }
    }
}
