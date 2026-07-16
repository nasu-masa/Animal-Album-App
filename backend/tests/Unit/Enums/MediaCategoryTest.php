<?php

namespace Tests\Unit\Enums;

use App\Enums\MediaCategory;
use PHPUnit\Framework\TestCase;

class MediaCategoryTest extends TestCase
{
    public function test_values_returns_all_enum_values(): void
    {
        $expected = array_map(
            static fn (MediaCategory $category): string => $category->value,
            MediaCategory::cases(),
        );

        $this->assertSame($expected, MediaCategory::values());
    }
}
