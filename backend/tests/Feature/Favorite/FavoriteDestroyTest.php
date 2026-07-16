<?php

namespace Tests\Feature\Favorite;

use App\Models\Favorite;
use App\Models\Media;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class FavoriteDestroyTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_remove_favorite(): void
    {
        $favorite = Favorite::factory()->create();

        $response = $this->deleteJson("/api/favorites/{$favorite->media_id}");

        $response->assertUnauthorized();
        $this->assertDatabaseHas('favorites', [
            'user_id' => $favorite->user_id,
            'media_id' => $favorite->media_id,
        ]);
    }

    public function test_authenticated_user_can_remove_favorite(): void
    {
        $favorite = Favorite::factory()->create();
        Sanctum::actingAs($favorite->user);

        $response = $this->deleteJson("/api/favorites/{$favorite->media_id}");

        $response->assertNoContent();
        $this->assertDatabaseMissing('favorites', [
            'user_id' => $favorite->user_id,
            'media_id' => $favorite->media_id,
        ]);
    }

    public function test_authenticated_user_cannot_remove_another_users_favorite(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $media = Media::factory()->create();
        Favorite::factory()->for($otherUser)->for($media)->create();
        Sanctum::actingAs($user);

        $response = $this->deleteJson("/api/favorites/{$media->id}");

        $response->assertNoContent();
        $this->assertDatabaseHas('favorites', [
            'user_id' => $otherUser->id,
            'media_id' => $media->id,
        ]);
    }

    public function test_authenticated_user_receives_not_found_when_removing_favorite_from_nonexistent_media(): void
    {
        $user = User::factory()->create();
        $nonexistentMediaId = PHP_INT_MAX;
        $favoriteCountBeforeRequest = Favorite::count();
        Sanctum::actingAs($user);

        $response = $this->deleteJson("/api/favorites/{$nonexistentMediaId}");

        $response->assertNotFound();
        $this->assertSame($favoriteCountBeforeRequest, Favorite::count());
    }
}
