<?php

namespace Tests\Feature\Media;

use App\Enums\MediaCategory;
use App\Models\Favorite;
use App\Models\Media;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MediaIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_view_media_list(): void
    {
        $user = User::factory()->create();
        $media = Media::factory()->for($user)->create([
            'type' => 'image',
            'file_path' => 'media/testing/animal.jpg',
            'category' => MediaCategory::Cat->value,
            'taken_at' => '2026-07-15 12:30:00',
            'memo' => '公園で撮影した猫',
        ]);

        $response = $this->getJson('/api/media');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.id', $media->id)
            ->assertJsonPath('data.0.type', 'image')
            ->assertJsonPath(
                'data.0.file_path',
                Storage::disk('public')->url($media->file_path),
            )
            ->assertJsonPath('data.0.category', MediaCategory::Cat->value)
            ->assertJsonPath('data.0.taken_at', $media->taken_at->toIso8601String())
            ->assertJsonPath('data.0.memo', '公園で撮影した猫')
            ->assertJsonPath('data.0.user.id', $user->id)
            ->assertJsonPath('data.0.user.name', $user->name)
            ->assertJsonStructure([
                'data',
                'links',
                'meta',
            ]);
    }

    public function test_guest_can_filter_media_list_by_category(): void
    {
        $user = User::factory()->create();
        $catMedia = Media::factory()->for($user)->create([
            'category' => MediaCategory::Cat->value,
        ]);
        $dogMedia = Media::factory()->for($user)->create([
            'category' => MediaCategory::Dog->value,
        ]);

        $response = $this->getJson('/api/media?category='.MediaCategory::Cat->value);

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $catMedia->id);
    }

    public function test_guest_can_filter_media_list_by_type(): void
    {
        $user = User::factory()->create();
        $imageMedia = Media::factory()->for($user)->create([
            'type' => 'image',
        ]);
        $videoMedia = Media::factory()->for($user)->create([
            'type' => 'video',
        ]);

        $response = $this->getJson('/api/media?type=video');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $videoMedia->id);
    }

    public function test_guest_can_paginate_media_list(): void
    {
        Media::factory()->count(21)->create();

        $response = $this->getJson('/api/media?page=2');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('meta.current_page', 2)
            ->assertJsonPath('meta.per_page', 20)
            ->assertJsonPath('meta.total', 21);
    }

    public function test_guest_can_sort_media_list_in_ascending_order(): void
    {
        $user = User::factory()->create();
        $olderMedia = Media::factory()->for($user)->create([
            'taken_at' => '2026-07-14 12:30:00',
        ]);
        $newerMedia = Media::factory()->for($user)->create([
            'taken_at' => '2026-07-15 13:00:00',
        ]);

        $response = $this->getJson('/api/media?sort=asc');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.id', $olderMedia->id)
            ->assertJsonPath('data.1.id', $newerMedia->id);
    }

    public function test_guest_sees_media_list_in_descending_order_by_default(): void
    {
        $user = User::factory()->create();
        $olderMedia = Media::factory()->for($user)->create([
            'taken_at' => '2026-07-14 12:30:00',
        ]);
        $newerMedia = Media::factory()->for($user)->create([
            'taken_at' => '2026-07-15 13:00:00',
        ]);

        $response = $this->getJson('/api/media');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.id', $newerMedia->id)
            ->assertJsonPath('data.1.id', $olderMedia->id);
    }

    public function test_guest_cannot_filter_media_list_with_invalid_query_parameters(): void
    {
        $response = $this->getJson('/api/media?category=invalid&type=invalid&sort=invalid&page=0');

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['category', 'type', 'sort', 'page']);
    }

    public function test_authenticated_user_can_view_favorite_status_in_media_list(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $userFavoriteMedia = Media::factory()->create();
        $otherUserFavoriteMedia = Media::factory()->create();
        Favorite::factory()->for($user)->for($userFavoriteMedia)->create();
        Favorite::factory()->for($otherUser)->for($otherUserFavoriteMedia)->create();
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/media');

        $response
            ->assertOk()
            ->assertJsonFragment([
                'id' => $userFavoriteMedia->id,
                'is_favorited' => true,
            ])
            ->assertJsonFragment([
                'id' => $otherUserFavoriteMedia->id,
                'is_favorited' => false,
            ]);
    }

    public function test_guest_cannot_view_soft_deleted_media_in_list(): void
    {
        $user = User::factory()->create();
        $visibleMedia = Media::factory()->for($user)->create();
        $deletedMedia = Media::factory()->for($user)->create();
        $deletedMedia->delete();

        $response = $this->getJson('/api/media');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $visibleMedia->id);
        $this->assertSoftDeleted($deletedMedia);
    }
}
