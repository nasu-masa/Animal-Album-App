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

class MediaShowTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_view_media_detail(): void
    {
        $user = User::factory()->create();
        $media = Media::factory()->for($user)->create([
            'type' => 'image',
            'file_path' => 'media/testing/animal.jpg',
            'category' => MediaCategory::Cat->value,
            'taken_at' => '2026-07-15 12:30:00',
            'memo' => '公園で撮影した猫',
        ]);

        $response = $this->getJson("/api/media/{$media->id}");

        $response
            ->assertOk()
            ->assertJsonPath('data.id', $media->id)
            ->assertJsonPath('data.type', 'image')
            ->assertJsonPath(
                'data.file_path',
                Storage::disk('public')->url($media->file_path),
            )
            ->assertJsonPath('data.category', MediaCategory::Cat->value)
            ->assertJsonPath('data.taken_at', $media->taken_at->toIso8601String())
            ->assertJsonPath('data.memo', '公園で撮影した猫')
            ->assertJsonPath('data.user.id', $user->id)
            ->assertJsonPath('data.user.name', $user->name);
    }

    public function test_guest_receives_not_found_when_viewing_nonexistent_media(): void
    {
        $media = Media::factory()->create();
        $nonexistentMediaId = $media->id + 1;

        $response = $this->getJson("/api/media/{$nonexistentMediaId}");

        $response->assertNotFound();
        $this->assertDatabaseHas('media', [
            'id' => $media->id,
        ]);
    }

    public function test_authenticated_user_can_view_favorite_status_in_media_detail(): void
    {
        $user = User::factory()->create();
        $media = Media::factory()->create();
        Favorite::factory()->for($user)->for($media)->create();
        Sanctum::actingAs($user);

        $response = $this->getJson("/api/media/{$media->id}");

        $response
            ->assertOk()
            ->assertJsonPath('data.id', $media->id)
            ->assertJsonPath('data.is_favorited', true);
    }

    public function test_guest_cannot_view_soft_deleted_media(): void
    {
        $media = Media::factory()->create();
        $media->delete();

        $response = $this->getJson("/api/media/{$media->id}");

        $response->assertNotFound();
        $this->assertSoftDeleted($media);
    }
}
