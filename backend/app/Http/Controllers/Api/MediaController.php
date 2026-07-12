<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MediaResource;
use App\Models\Media;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MediaController extends Controller
{
    public function index(): ResourceCollection
    {
        $media = Media::with('user')
            ->orderBy('taken_at', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return MediaResource::collection($media);
    }
}
