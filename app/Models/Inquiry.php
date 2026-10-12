<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    public const STATUS_UNREAD = 'unread';

    public const STATUS_READ = 'read';

    public const STATUS_REPLIED = 'replied';

    public const STATUSES = [
        self::STATUS_UNREAD,
        self::STATUS_READ,
        self::STATUS_REPLIED,
    ];

    public const SERVICES = [
        'cloud',
        'devops',
        'observability',
        'software',
        'startup',
        'automation',
        'ai',
        'data',
        'optimize',
        'creative',
        'seo',
        'ecommerce',
        'website',
        'other',
    ];

    public const SERVICE_LABELS = [
        'cloud' => 'Cloud & Infrastructure',
        'devops' => 'DevOps, Deployment & Reliability',
        'observability' => 'Proactive Observability & Site Reliability (SRE)',
        'software' => 'Custom Software & Platforms',
        'startup' => 'MVP & Startup Engineering',
        'automation' => 'Automation & Integration',
        'ai' => 'AI-Powered Software & Solutions',
        'data' => 'Data & Business Intelligence',
        'optimize' => 'Maintenance & Optimization',
        'creative' => 'Design & Growth',
        'seo' => 'SEO & GEO',
        'ecommerce' => 'E-commerce Development',
        'website' => 'Corporate Websites',
        'other' => 'Other / Multi-discipline',
    ];

    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'service',
        'message',
        'locale',
        'status',
        'read_at',
        'replied_at',
    ];

    protected function casts(): array
    {
        return [
            'read_at' => 'datetime',
            'replied_at' => 'datetime',
        ];
    }

    public function scopeUnread(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_UNREAD);
    }

    public function serviceLabel(): string
    {
        return self::SERVICE_LABELS[$this->service] ?? $this->service;
    }

    public function markAsRead(): void
    {
        if ($this->status !== self::STATUS_UNREAD) {
            return;
        }

        $this->update([
            'status' => self::STATUS_READ,
            'read_at' => now(),
        ]);
    }

    public function markAsReplied(): void
    {
        $this->update([
            'status' => self::STATUS_REPLIED,
            'read_at' => $this->read_at ?? now(),
            'replied_at' => now(),
        ]);
    }
}
