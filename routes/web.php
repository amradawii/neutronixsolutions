<?php

use App\Http\Controllers\WorkController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// English routes
Route::get('/',         fn () => Inertia::render('Home'))->name('home');
Route::get('/services', fn () => Inertia::render('Services'))->name('services');
Route::get('/work', [WorkController::class, 'index'])->name('work');
Route::get('/work/{slug}', [WorkController::class, 'show'])->name('work.show');
Route::get('/about',    fn () => Inertia::render('About'))->name('about');
Route::get('/contact',  fn () => Inertia::render('Contact'))->name('contact');

// Arabic routes
Route::prefix('ar')->name('ar.')->group(function () {
    Route::get('/',         fn () => Inertia::render('Home'))->name('home');
    Route::get('/services', fn () => Inertia::render('Services'))->name('services');
    Route::get('/work', [WorkController::class, 'index'])->name('work');
    Route::get('/work/{slug}', [WorkController::class, 'show'])->name('work.show');
    Route::get('/about',    fn () => Inertia::render('About'))->name('about');
    Route::get('/contact',  fn () => Inertia::render('Contact'))->name('contact');
});

