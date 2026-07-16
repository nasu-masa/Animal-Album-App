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

    public function test_favorites_are_ordered_the_same_as_media_index(): void
    {
        $user = User::factory()->create();

        $lowerIdMedia = Media::factory()->create([
            'taken_at' => '2026-07-15 13:00:00',
            'created_at' => '2026-07-15 14:00:00',
        ]);
        $higherIdMedia = Media::factory()->create([
            'taken_at' => '2026-07-15 13:00:00',
            'created_at' => '2026-07-15 14:00:00',
        ]);
        $newerCreatedMedia = Media::factory()->create([
            'taken_at' => '2026-07-15 13:00:00',
            'created_at' => '2026-07-15 15:00:00',
        ]);
        $olderTakenMedia = Media::factory()->create([
            'taken_at' => '2026-07-14 12:30:00',
        ]);
        $nullTakenMedia = Media::factory()->create([
            'taken_at' => null,
        ]);

        foreach ([
            $lowerIdMedia,
            $higherIdMedia,
            $newerCreatedMedia,
            $olderTakenMedia,
            $nullTakenMedia,
        ] as $media) {
            Favorite::factory()->for($user)->for($media)->create();
        }

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/favorites');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.id', $newerCreatedMedia->id)
            ->assertJsonPath('data.1.id', $higherIdMedia->id)
            ->assertJsonPath('data.2.id', $lowerIdMedia->id)
            ->assertJsonPath('data.3.id', $olderTakenMedia->id)
            ->assertJsonPath('data.4.id', $nullTakenMedia->id);
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
