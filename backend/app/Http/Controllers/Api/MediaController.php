<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMediaRequest;
use App\Http\Resources\MediaResource;
use App\Models\Media;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function index(Request $request): ResourceCollection
    {
        $userId = $request->user()?->id;

        $media = Media::with([
            'user',
            'favorites' => fn($q) => $q->where('user_id', $userId),
        ])
            ->orderBy('taken_at', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return MediaResource::collection($media);
    }

    public function show(Request $request, Media $media): MediaResource
    {
        $userId = $request->user()?->id;

        $media->load([
            'user',
            'favorites' => fn($q) => $q->where('user_id', $userId),
        ]);

        return new MediaResource($media);
    }

    public function store(StoreMediaRequest $request): JsonResponse
    {
        $file = $request->file('file');
        $mimeType = $file->getMimeType() ?? '';
        $type = str_starts_with($mimeType, 'video/') ? 'video' : 'image';

        $path = Storage::disk('public')->putFile('media', $file);

        if ($path === false) {
            abort(500, 'ファイルの保存に失敗しました。');
        }

        $media = Media::create([
            'user_id'   => $request->user()->id,
            'type'      => $type,
            'file_path' => $path,
            'category'  => $request->input('category'),
            'taken_at'  => $request->input('taken_at'),
            'memo'      => $request->input('memo'),
        ]);

        $media->load('user');

        return (new MediaResource($media))->response()->setStatusCode(201);
    }

    public function destroy(Request $request, Media $media): Response
    {
        if ($media->user_id !== $request->user()->id) {
            abort(403, '権限がありません。');
        }

        $media->delete();

        return response()->noContent();
    }
}
