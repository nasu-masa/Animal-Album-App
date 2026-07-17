<?php

namespace Tests\Feature\Media;

use App\Models\Media;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MediaDestroyTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_delete_media(): void
    {
        $user = User::factory()->create();
        $media = Media::factory()->for($user)->create();

        $response = $this->deleteJson("/api/media/{$media->id}");

        $response->assertUnauthorized();
        $this->assertNotSoftDeleted($media);
        $this->assertDatabaseHas('media', [
            'id' => $media->id,
            'user_id' => $user->id,
            'deleted_at' => null,
        ]);
    }

    public function test_authenticated_user_cannot_delete_media_when_delete_is_disabled(): void
    {
        config(['features.media_delete' => false]);
        $user = User::factory()->create();
        $media = Media::factory()->for($user)->create();
        Sanctum::actingAs($user);

        $response = $this->deleteJson("/api/media/{$media->id}");

        $response
            ->assertForbidden()
            ->assertJsonPath('message', '公開デモ環境では削除できません。');
        $this->assertNotSoftDeleted($media);
        $this->assertDatabaseHas('media', [
            'id' => $media->id,
            'user_id' => $user->id,
            'deleted_at' => null,
        ]);
    }

    public function test_owner_can_delete_media(): void
    {
        $owner = User::factory()->create();
        $media = Media::factory()->for($owner)->create();
        Sanctum::actingAs($owner);

        $response = $this->deleteJson("/api/media/{$media->id}");

        $response->assertNoContent();
        $this->assertSoftDeleted($media);
    }

    public function test_user_cannot_delete_another_users_media(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $media = Media::factory()->for($owner)->create();
        Sanctum::actingAs($otherUser);

        $response = $this->deleteJson("/api/media/{$media->id}");

        $response->assertForbidden();
        $this->assertNotSoftDeleted($media);
        $this->assertDatabaseHas('media', [
            'id' => $media->id,
            'user_id' => $owner->id,
            'deleted_at' => null,
        ]);
    }

    public function test_authenticated_user_receives_not_found_when_deleting_nonexistent_media(): void
    {
        $user = User::factory()->create();
        $media = Media::factory()->for($user)->create();
        $media->refresh();
        $mediaAttributesBeforeRequest = $media->getAttributes();
        $nonexistentMediaId = PHP_INT_MAX;
        Sanctum::actingAs($user);

        $response = $this->deleteJson("/api/media/{$nonexistentMediaId}");

        $response->assertNotFound();
        $this->assertNotSoftDeleted($media);
        $media->refresh();
        $this->assertSame($mediaAttributesBeforeRequest, $media->getAttributes());
    }
}
