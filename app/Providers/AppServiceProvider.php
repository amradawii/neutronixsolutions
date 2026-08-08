<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('consultations', function (Request $request) {
            if ($request->isAttemptingPrecognition()) {
                return Limit::perMinute(60)->by('consultation-validation:'.$request->ip());
            }

            return Limit::perMinute(5)
                ->by('consultation-submission:'.$request->ip())
                ->response(fn () => back()->with(
                    'error',
                    app()->isLocale('ar')
                        ? 'تم إرسال عدة طلبات خلال وقت قصير. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.'
                        : 'Too many requests were submitted. Please wait a moment and try again.'
                ));
        });
    }
}
