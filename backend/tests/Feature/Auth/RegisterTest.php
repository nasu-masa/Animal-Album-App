<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_register(): void
    {
        $password = 'password123';

        $response = $this->postJson('/register', [
            'name' => '山田 太郎',
            'email' => 'taro@example.com',
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('users', [
            'name' => '山田 太郎',
            'email' => 'taro@example.com',
        ]);

        $user = User::sole();

        $this->assertNotSame($password, $user->password);
        $this->assertTrue(Hash::check($password, $user->password));
        $this->assertAuthenticatedAs($user);
    }

    public function test_guest_cannot_register_without_required_fields(): void
    {
        $userCountBeforeRequest = User::count();

        $response = $this->postJson('/register', []);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'email', 'password']);
        $this->assertSame($userCountBeforeRequest, User::count());
        $this->assertGuest();
    }

    public function test_guest_cannot_register_with_duplicate_email(): void
    {
        $user = User::factory()->create();
        $password = 'password123';
        $userCountBeforeRequest = User::count();

        $response = $this->postJson('/register', [
            'name' => '山田 太郎',
            'email' => $user->email,
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors('email');
        $this->assertSame($userCountBeforeRequest, User::count());
        $this->assertGuest();
    }

    public function test_guest_cannot_register_with_password_shorter_than_minimum_length(): void
    {
        $password = 'short';
        $userCountBeforeRequest = User::count();

        $response = $this->postJson('/register', [
            'name' => '山田 太郎',
            'email' => 'taro@example.com',
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors('password');
        $this->assertSame($userCountBeforeRequest, User::count());
        $this->assertGuest();
    }

    public function test_guest_cannot_register_with_mismatched_password_confirmation(): void
    {
        $userCountBeforeRequest = User::count();

        $response = $this->postJson('/register', [
            'name' => '山田 太郎',
            'email' => 'taro@example.com',
            'password' => 'password123',
            'password_confirmation' => 'different-password',
        ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors('password');
        $this->assertSame($userCountBeforeRequest, User::count());
        $this->assertGuest();
    }
}
