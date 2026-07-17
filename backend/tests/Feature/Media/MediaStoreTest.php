<?php

namespace Tests\Feature\Media;

use App\Enums\MediaCategory;
use App\Models\Media;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MediaStoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_store_media(): void
    {
        Storage::fake('public');
        $mediaCountBeforeRequest = Media::count();

        $response = $this->postJson('/api/media', [
            'file' => UploadedFile::fake()->image('animal.jpg'),
            'category' => MediaCategory::Cat->value,
        ]);

        $response->assertUnauthorized();
        $this->assertSame($mediaCountBeforeRequest, Media::count());
        Storage::disk('public')->assertDirectoryEmpty('media');
    }

    public function test_authenticated_user_can_store_image_media(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/media', [
            'file' => UploadedFile::fake()->image('animal.jpg'),
            'category' => MediaCategory::Cat->value,
            'taken_at' => '2026-07-15',
            'memo' => '公園で撮影した猫',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.type', 'image')
            ->assertJsonPath('data.category', MediaCategory::Cat->value)
            ->assertJsonPath('data.memo', '公園で撮影した猫')
            ->assertJsonPath('data.user.id', $user->id)
            ->assertJsonPath('data.user.name', $user->name);

        $media = Media::sole();

        $this->assertSame($user->id, $media->user_id);
        $this->assertSame('image', $media->type);
        $this->assertSame(MediaCategory::Cat->value, $media->category);
        $this->assertSame('2026-07-15', $media->taken_at->toDateString());
        $this->assertSame('公園で撮影した猫', $media->memo);
        Storage::disk('public')->assertExists($media->file_path);
    }

    public function test_authenticated_user_can_store_video_media(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/media', [
            'file' => UploadedFile::fake()->create('animal.mp4', 1024, 'video/mp4'),
            'category' => MediaCategory::Cat->value,
            'taken_at' => '2026-07-15',
            'memo' => '公園で撮影した猫',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.type', 'video')
            ->assertJsonPath('data.category', MediaCategory::Cat->value)
            ->assertJsonPath('data.memo', '公園で撮影した猫')
            ->assertJsonPath('data.user.id', $user->id)
            ->assertJsonPath('data.user.name', $user->name);

        $media = Media::sole();

        $this->assertSame($user->id, $media->user_id);
        $this->assertSame('video', $media->type);
        $this->assertSame(MediaCategory::Cat->value, $media->category);
        $this->assertSame('2026-07-15', $media->taken_at->toDateString());
        $this->assertSame('公園で撮影した猫', $media->memo);
        Storage::disk('public')->assertExists($media->file_path);
    }

    public function test_authenticated_user_cannot_store_media_without_required_fields(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $mediaCountBeforeRequest = Media::count();

        $response = $this->postJson('/api/media', []);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['file', 'category']);
        $this->assertSame($mediaCountBeforeRequest, Media::count());
        Storage::disk('public')->assertDirectoryEmpty('media');
    }

    public function test_authenticated_user_cannot_store_unsupported_file(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $mediaCountBeforeRequest = Media::count();

        $response = $this->postJson('/api/media', [
            'file' => UploadedFile::fake()->create('document.pdf', 100, 'application/pdf'),
            'category' => MediaCategory::Cat->value,
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors('file');
        $this->assertSame($mediaCountBeforeRequest, Media::count());
        Storage::disk('public')->assertDirectoryEmpty('media');
    }

    public function test_authenticated_user_cannot_store_media_with_invalid_category(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $mediaCountBeforeRequest = Media::count();

        $response = $this->postJson('/api/media', [
            'file' => UploadedFile::fake()->image('animal.jpg'),
            'category' => 'invalid',
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors('category');
        $this->assertSame($mediaCountBeforeRequest, Media::count());
        Storage::disk('public')->assertDirectoryEmpty('media');
    }

    public function test_authenticated_user_cannot_store_media_with_invalid_taken_at(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $mediaCountBeforeRequest = Media::count();

        $response = $this->postJson('/api/media', [
            'file' => UploadedFile::fake()->image('animal.jpg'),
            'category' => MediaCategory::Cat->value,
            'taken_at' => 'invalid-date',
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors('taken_at');
        $this->assertSame($mediaCountBeforeRequest, Media::count());
        Storage::disk('public')->assertDirectoryEmpty('media');
    }

    public function test_authenticated_user_cannot_store_file_exceeding_maximum_size(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $mediaCountBeforeRequest = Media::count();

        $response = $this->postJson('/api/media', [
            'file' => UploadedFile::fake()->create('animal.jpg', 102401, 'image/jpeg'),
            'category' => MediaCategory::Cat->value,
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors('file');
        $this->assertSame($mediaCountBeforeRequest, Media::count());
        Storage::disk('public')->assertDirectoryEmpty('media');
    }
}
