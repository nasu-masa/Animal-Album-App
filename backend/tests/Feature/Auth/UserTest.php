<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_view_their_profile(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/user');

        $response
            ->assertOk()
            ->assertJsonPath('id', $user->id)
            ->assertJsonPath('name', $user->name)
            ->assertJsonPath('email', $user->email);
    }

    public function test_guest_cannot_view_user_profile(): void
    {
        $response = $this->getJson('/api/user');

        $response
            ->assertUnauthorized()
            ->assertJsonMissingPath('id')
            ->assertJsonMissingPath('name')
            ->assertJsonMissingPath('email');
    }
}
