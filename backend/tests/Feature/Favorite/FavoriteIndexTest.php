<?php

namespace Tests\Feature\Favorite;

use App\Models\Favorite;
use App\Models\Media;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class FavoriteIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_view_favorites(): void
    {
        $response = $this->getJson('/api/favorites');

        $response->assertUnauthorized();
    }

    public function test_authenticated_user_can_view_only_their_favorites(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $userFavoriteMedia = Media::factory()->create();
        $otherUserFavoriteMedia = Media::factory()->create();
        Favorite::factory()->for($user)->for($userFavoriteMedia)->create();
        Favorite::factory()->for($otherUser)->for($otherUserFavoriteMedia)->create();
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/favorites');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $userFavoriteMedia->id)
            ->assertJsonPath('data.0.is_favorited', true);
    }

    public function test_authenticated_user_can_view_empty_favorites(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/favorites');

        $response
            ->assertOk()
            ->assertJsonCount(0, 'data');
    }
}
