<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $admin = Auth::guard('admin')->user();

        $stats = [
            'total_inquiries' => Inquiry::count(),
            'unread_inquiries' => Inquiry::unread()->count(),
            'replied_inquiries' => Inquiry::where('status', Inquiry::STATUS_REPLIED)->count(),
            'monthly_inquiries' => Inquiry::where('created_at', '>=', now()->startOfMonth())->count(),
        ];

        $inquiries = Inquiry::query()
            ->latest()
            ->limit(4)
            ->get()
            ->map(fn (Inquiry $inquiry) => [
                'id' => $inquiry->id,
                'name' => $inquiry->name,
                'email' => $inquiry->email,
                'company' => $inquiry->company ?: 'Independent',
                'service' => $inquiry->serviceLabel(),
                'message' => $inquiry->message,
                'created_at' => $inquiry->created_at->diffForHumans(),
                'status' => $inquiry->status,
            ]);

        return Inertia::render('Admin/Dashboard', [
            'admin' => [
                'name' => $admin->name,
                'username' => $admin->username,
                'email' => $admin->email,
                'photo_url' => $admin->photo_url,
            ],
            'stats' => $stats,
            'inquiries' => $inquiries,
        ]);
    }
}
