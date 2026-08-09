<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateInquiryStatusRequest;
use App\Models\Inquiry;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'status' => ['nullable', Rule::in(Inquiry::STATUSES)],
            'service' => ['nullable', Rule::in(Inquiry::SERVICES)],
        ]);

        $inquiries = Inquiry::query()
            ->when($filters['search'] ?? null, function (Builder $query, string $search) {
                $query->where(function (Builder $query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('company', 'like', "%{$search}%")
                        ->orWhere('service', 'like', "%{$search}%")
                        ->orWhere('message', 'like', "%{$search}%");
                });
            })
            ->when($filters['status'] ?? null, fn (Builder $query, string $status) => $query->where('status', $status))
            ->when($filters['service'] ?? null, fn (Builder $query, string $service) => $query->where('service', $service))
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Inquiry $inquiry) => $this->serialize($inquiry));

        return Inertia::render('Admin/Inquiries', [
            'admin' => $this->adminData(),
            'inquiries' => $inquiries,
            'filters' => [
                'search' => $filters['search'] ?? '',
                'status' => $filters['status'] ?? '',
                'service' => $filters['service'] ?? '',
            ],
            'services' => collect(Inquiry::SERVICE_LABELS)
                ->map(fn (string $label, string $value) => compact('value', 'label'))
                ->values(),
            'summary' => [
                'total' => Inquiry::count(),
                'unread' => Inquiry::unread()->count(),
                'replied' => Inquiry::where('status', Inquiry::STATUS_REPLIED)->count(),
            ],
        ]);
    }

    public function updateStatus(UpdateInquiryStatusRequest $request, Inquiry $inquiry): RedirectResponse
    {
        $status = $request->validated('status');

        if ($status === Inquiry::STATUS_REPLIED) {
            $inquiry->markAsReplied();

            return back()->with('success', 'Inquiry marked as replied.');
        }

        $inquiry->markAsRead();

        return back();
    }

    private function adminData(): array
    {
        $admin = Auth::guard('admin')->user();

        return [
            'name' => $admin->name,
            'username' => $admin->username,
            'email' => $admin->email,
            'photo_url' => $admin->photo_url,
        ];
    }

    private function serialize(Inquiry $inquiry): array
    {
        return [
            'id' => $inquiry->id,
            'name' => $inquiry->name,
            'email' => $inquiry->email,
            'phone' => $inquiry->phone,
            'company' => $inquiry->company ?: 'Independent',
            'service' => $inquiry->service,
            'service_label' => $inquiry->serviceLabel(),
            'message' => $inquiry->message,
            'locale' => $inquiry->locale,
            'created_at' => $inquiry->created_at->diffForHumans(),
            'submitted_at' => $inquiry->created_at->format('M j, Y · g:i A'),
            'status' => $inquiry->status,
        ];
    }
}
