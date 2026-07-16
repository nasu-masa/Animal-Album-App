<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MediaResource;
use App\Models\Favorite;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\Resources\Json\ResourceCollection;

class FavoriteController extends Controller
{
    public function index(Request $request): ResourceCollection
    {
        $userId = $request->user()->id;

        $media = Media::whereHas('favorites', fn($q) => $q->where('user_id', $userId))
            ->with([
                'user',
                'favorites' => fn($q) => $q->where('user_id', $userId),
            ])
            ->orderByRaw('taken_at IS NULL')
            ->orderBy('taken_at', 'desc')
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        return MediaResource::collection($media);
    }

    public function store(Request $request, Media $media): Response
    {
        Favorite::firstOrCreate([
            'user_id'  => $request->user()->id,
            'media_id' => $media->id,
        ]);

        return response()->noContent();
    }

    public function destroy(Request $request, Media $media): Response
    {
        Favorite::where('user_id', $request->user()->id)
            ->where('media_id', $media->id)
            ->delete();

        return response()->noContent();
    }
}
