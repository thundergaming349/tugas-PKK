<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\Summary\StudentSummary;
use App\Http\Controllers\Summary\TeacherSummary;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/classes', [AdminController::class, 'ShowClassPublic']);

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

Route::group([
    'prefix' => 'admin',
    'middleware' => 'auth:sanctum'
], function () {
    //class
    Route::post('/class', [AdminController::class, 'StoreClass']);
    Route::get('/class', [AdminController::class, 'ShowClass']);
    Route::put('/class/{id}', [AdminController::class, 'UpdateClass']);
    Route::delete('/class/{id}', [AdminController::class, 'DestroyClass']);

    //subject
    Route::post('/subject', [AdminController::class, 'StoreSubj']);
    Route::get('/subject', [AdminController::class, 'ShowSubj']);
    Route::put('/subject/{id}', [AdminController::class, 'UpdateSubj']);
    Route::delete('/subject/{id}', [AdminController::class, 'DestroySubj']);
});

Route::group([
    'prefix' => 'teacher',
    'middleware' => 'auth:sanctum'
], function () {
    //class
    Route::get('/class', [TeacherController::class, 'ShowClass']);

    //subject
    Route::get('/subject', [TeacherController::class, 'ShowSubj']);
});

//session
Route::group([
    'prefix' => 'session',
    'middleware' => 'auth:sanctum'
], function () {
    Route::post('/', [SessionController::class, 'store']);
    Route::get('/teacher', [SessionController::class, 'show']);
    Route::get('/student', [SessionController::class, 'studentShow']);
    Route::put('/{id}', [SessionController::class, 'update']);
    Route::delete('/{id}', [SessionController::class, 'destroy']);
    Route::put('/{sessionId}', [SessionController::class, 'hide']);
});

//attendance
Route::group([
    'prefix' => 'attendance',
    'middleware' => 'auth:sanctum'
], function () {
    Route::put('/{sessionId}/attend', [AttendanceController::class, 'attend']);
    Route::put('/{studentId}/{sessionId}/sakit', [AttendanceController::class, 'sakit']);
    Route::put('/{studentId}/{sessionId}/izin', [AttendanceController::class, 'izin']);
    Route::put('/{studentId}/{sessionId}/alfa', [AttendanceController::class, 'alfa']);
    Route::get('/{sessionId}/student', [AttendanceController::class, 'showStudent']);
});

//post
Route::group([
    'prefix' => 'post',
    'middleware' => 'auth:sanctum'
], function () {
    Route::post('/', [PostController::class, 'store']);
    Route::get('/{id}', [PostController::class, 'show']);
    Route::delete('/{postId}', [PostController::class, 'destroy']);
});

//summary
Route::group([
    'prefix' => 'summary',
    'middleware' => 'auth:sanctum'
], function () {
    Route::get('/get-summary-by-student', [StudentSummary::class, 'summary']);
    Route::get('/get-summary-by-teacher/{sessionId}', [TeacherSummary::class, 'summary']);
});
