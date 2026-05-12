<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\Post;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();
        if ($user->role !== 'guru') {
            return response()->json([
                'message' => 'kamu bukan guru'
            ], 422);
        }

        $validated = Validator::make($request->all(), [
            'caption' => 'required',
            'session_id' => 'required|int|exists:sessions,id',
            'attachments' => 'max:10420'
        ], [
            'session_id.exists' => 'session ID not available'
        ]);
        if ($validated->fails()) {
            return response()->json([
                'message' => 'invalid field',
                'errors' => $validated->errors()
            ], 422);
        }

        $post = Post::create([
            'caption' => $request['caption'],
            'session_id' => $request['session_id']
        ]);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('attachment', 'public');

                Attachment::create([
                    'storage_url' => $path,
                    'post_id' => $post->id
                ]);
            }
        }

        return response()->json([
            'message' => 'post created'
        ], 201);
    }


    public function destroy(Request $request, int $postId)
    {
        $user = $request->user();
        if ($user->role !== 'guru') {
            return response()->json([
                'message' => 'kamu bukan guru'
            ], 422);
        }

        $post = Post::find($postId);
        if (!$post) {
            return response()->json([
                'message' => 'post not found'
            ], 422);
        }

        Post::destroy($postId);
        return response()->json('', 204);
    }


    public function show(Request $request, int $sessionId)
    {
        $user = $request->user();
        $session = Session::find($sessionId);
        if (!$session) {
            return response()->json([
                'message' => 'session not found'
            ], 422);
        }

        $post = Post::with('Attachment')->where('session_id', $sessionId)->get();
        return response()->json([
            'post' => $post->map(function ($q) {
                foreach ($q->attachment as $file) {
                    $file->url = 'http://localhost:8000' . Storage::url($file->storage_url);
                }
                return $q;
            })
        ]);
    }
}
