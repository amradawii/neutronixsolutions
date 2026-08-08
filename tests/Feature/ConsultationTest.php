<?php

namespace Tests\Feature;

use App\Models\Inquiry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ConsultationTest extends TestCase
{
    use RefreshDatabase;

    public function test_consultation_pages_are_available_in_both_locales(): void
    {
        $this->get(route('consultation.create'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Contact')
                ->where('storeUrl', route('consultation.store')));

        $this->get(route('ar.consultation.create'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Contact')
                ->where('storeUrl', route('ar.consultation.store')));
    }

    public function test_a_valid_consultation_request_is_stored_as_unread(): void
    {
        $response = $this->post(route('consultation.store'), $this->validPayload());

        $response->assertRedirect()->assertSessionHas('success');
        $this->assertDatabaseHas('inquiries', [
            'email' => 'client@example.com',
            'phone' => '+97470313061',
            'service' => 'software',
            'locale' => 'en',
            'status' => Inquiry::STATUS_UNREAD,
        ]);
    }

    public function test_arabic_submission_persists_its_locale(): void
    {
        $this->post(route('ar.consultation.store'), [
            ...$this->validPayload(),
            'email' => 'arabic@example.com',
        ])->assertSessionHas('success');

        $this->assertDatabaseHas('inquiries', [
            'email' => 'arabic@example.com',
            'locale' => 'ar',
        ]);
    }

    public function test_invalid_submission_returns_field_errors_without_persisting(): void
    {
        $this->post(route('consultation.store'), [
            'name' => 'A',
            'email' => 'invalid',
            'service' => 'unknown',
            'message' => 'Too short',
        ])->assertSessionHasErrors(['name', 'email', 'service', 'message']);

        $this->assertDatabaseCount('inquiries', 0);
    }

    public function test_honeypot_submission_is_rejected(): void
    {
        $this->post(route('consultation.store'), [
            ...$this->validPayload(),
            'website' => 'https://spam.example',
        ])->assertSessionHasErrors('website');

        $this->assertDatabaseCount('inquiries', 0);
    }

    public function test_precognition_uses_the_same_form_request_rules(): void
    {
        $this->withHeaders([
            'Precognition' => 'true',
            'Precognition-Validate-Only' => 'email',
        ])->post(route('consultation.store'), ['email' => 'valid@example.com'])
            ->assertNoContent();

        $this->assertDatabaseCount('inquiries', 0);
    }

    public function test_real_submissions_are_rate_limited(): void
    {
        foreach (range(1, 5) as $attempt) {
            $this->post(route('consultation.store'), [
                ...$this->validPayload(),
                'email' => "client{$attempt}@example.com",
            ])->assertSessionHas('success');
        }

        $this->post(route('consultation.store'), [
            ...$this->validPayload(),
            'email' => 'blocked@example.com',
        ])->assertSessionHas('error');

        $this->assertDatabaseCount('inquiries', 5);
    }

    public function test_old_contact_urls_redirect_to_consultation_pages(): void
    {
        $this->get('/contact')->assertRedirect('/book-a-consultation');
        $this->get('/ar/contact')->assertRedirect('/ar/book-a-consultation');
    }

    public function test_name_rejects_digits_and_special_characters(): void
    {
        $this->post(route('consultation.store'), [
            ...$this->validPayload(),
            'name' => 'John 123',
        ])->assertSessionHasErrors('name');

        $this->post(route('consultation.store'), [
            ...$this->validPayload(),
            'name' => 'John!',
        ])->assertSessionHasErrors('name');

        $this->assertDatabaseCount('inquiries', 0);
    }

    public function test_name_accepts_arabic_letters_and_spaces(): void
    {
        $this->post(route('ar.consultation.store'), [
            ...$this->validPayload(),
            'email' => 'arabic.name@example.com',
            'name' => 'أحمد العتيبي',
        ])->assertSessionHas('success');

        $this->assertDatabaseHas('inquiries', [
            'email' => 'arabic.name@example.com',
            'name' => 'أحمد العتيبي',
        ]);
    }

    public function test_phone_rejects_spaces_parentheses_and_letters(): void
    {
        $this->post(route('consultation.store'), [
            ...$this->validPayload(),
            'phone' => '+974 7031 3061',
        ])->assertSessionHasErrors('phone');

        $this->post(route('consultation.store'), [
            ...$this->validPayload(),
            'phone' => '(974) 7031-3061',
        ])->assertSessionHasErrors('phone');

        $this->post(route('consultation.store'), [
            ...$this->validPayload(),
            'phone' => '+97470313abc',
        ])->assertSessionHasErrors('phone');

        $this->assertDatabaseCount('inquiries', 0);
    }

    public function test_phone_accepts_digits_with_optional_leading_plus(): void
    {
        $this->post(route('consultation.store'), [
            ...$this->validPayload(),
            'email' => 'digits@example.com',
            'phone' => '+97470313061',
        ])->assertSessionHas('success');

        $this->post(route('consultation.store'), [
            ...$this->validPayload(),
            'email' => 'digits2@example.com',
            'phone' => '97470313061',
        ])->assertSessionHas('success');

        $this->assertDatabaseCount('inquiries', 2);
    }

    private function validPayload(): array
    {
        return [
            'name' => 'Qatar Client',
            'email' => 'client@example.com',
            'phone' => '+97470313061',
            'company' => 'Example Company',
            'service' => 'software',
            'message' => 'We need a secure custom platform for our internal operational workflows.',
            'website' => '',
        ];
    }
}
