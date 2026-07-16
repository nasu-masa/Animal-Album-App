<?php

namespace Tests\Feature\Favorite;

use App\Models\Favorite;
use App\Models\Media;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class FavoriteStoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_add_favorite(): void
    {
        $media = Media::factory()->create();
        $favoriteCountBeforeRequest = Favorite::count();

        $response = $this->postJson("/api/favorites/{$media->id}");

        $response->assertUnauthorized();
        $this->assertSame($favoriteCountBeforeRequest, Favorite::count());
    }

    public function test_authenticated_user_can_add_favorite(): void
    {
        $user = User::factory()->create();
        $media = Media::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson("/api/favorites/{$media->id}");

        $response->assertNoContent();
        $this->assertDatabaseHas('favorites', [
            'user_id' => $user->id,
            'media_id' => $media->id,
        ]);
    }

    public function test_adding_same_favorite_twice_does_not_create_duplicate(): void
    {
        $user = User::factory()->create();
        $media = Media::factory()->create();
        Sanctum::actingAs($user);

        $firstResponse = $this->postJson("/api/favorites/{$media->id}");
        $secondResponse = $this->postJson("/api/favorites/{$media->id}");

        $firstResponse->assertNoContent();
        $secondResponse->assertNoContent();
        $this->assertSame(
            1,
            Favorite::where('user_id', $user->id)
                ->where('media_id', $media->id)
                ->count(),
        );
    }

    public function test_authenticated_user_receives_not_found_when_favoriting_nonexistent_media(): void
    {
        $user = User::factory()->create();
        $nonexistentMediaId = PHP_INT_MAX;
        $favoriteCountBeforeRequest = Favorite::count();
        Sanctum::actingAs($user);

        $response = $this->postJson("/api/favorites/{$nonexistentMediaId}");

        $response->assertNotFound();
        $this->assertSame($favoriteCountBeforeRequest, Favorite::count());
    }
}
