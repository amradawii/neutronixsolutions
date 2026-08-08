<?php

namespace Database\Factories;

use App\Models\Inquiry;
use Illuminate\Database\Eloquent\Factories\Factory;

class InquiryFactory extends Factory
{
    protected $model = Inquiry::class;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->optional()->phoneNumber(),
            'company' => fake()->optional()->company(),
            'service' => fake()->randomElement(Inquiry::SERVICES),
            'message' => fake()->paragraphs(2, true),
            'locale' => fake()->randomElement(['en', 'ar']),
            'status' => Inquiry::STATUS_UNREAD,
            'read_at' => null,
            'replied_at' => null,
        ];
    }

    public function read(): static
    {
        return $this->state(fn () => [
            'status' => Inquiry::STATUS_READ,
            'read_at' => now(),
            'replied_at' => null,
        ]);
    }

    public function replied(): static
    {
        return $this->state(fn () => [
            'status' => Inquiry::STATUS_REPLIED,
            'read_at' => now()->subHour(),
            'replied_at' => now(),
        ]);
    }
}
