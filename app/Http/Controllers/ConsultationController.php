<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ConsultationController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Contact', [
            'storeUrl' => app()->isLocale('ar')
                ? route('ar.consultation.store')
                : route('consultation.store'),
        ]);
    }

    public function store(StoreInquiryRequest $request): RedirectResponse
    {
        Inquiry::create([
            ...$request->safe()->except('website'),
            'locale' => app()->getLocale(),
            'status' => Inquiry::STATUS_UNREAD,
        ]);

        $message = app()->isLocale('ar')
            ? 'تم استلام طلبك. سيتواصل معك أحد مهندسينا خلال يوم عمل واحد.'
            : 'Your consultation request has been received. A senior engineer will reply within one business day.';

        return back()->with('success', $message);
    }
}
