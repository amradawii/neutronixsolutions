<?php

namespace Tests\Unit;

use Tests\TestCase;

class InertiaPagePathsTest extends TestCase
{
    public function test_configured_page_paths_match_the_real_directory_case(): void
    {
        foreach (config('inertia.pages.paths') as $path) {
            $this->assertContains(
                basename($path),
                scandir(dirname($path)),
                "Inertia page path [{$path}] does not match the on-disk directory case; it will fail on Linux."
            );
        }
    }
}
