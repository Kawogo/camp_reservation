<?php

use App\Http\Controllers\BlockController;
use App\Http\Controllers\CampController;
use App\Http\Controllers\CheckinController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    // Company
    Route::resource('/companies', CompanyController::class);


    // Departments
    Route::resource('/departments', DepartmentController::class);

    // Camps
    Route::resource('/camps', CampController::class);

    // Blocks
    Route::resource('/blocks', BlockController::class);

    // Blocks
    Route::resource('/rooms', RoomController::class);

    // Members
    Route::resource('/members', MemberController::class);


    // Checkins
    Route::resource('/checkins', CheckinController::class);

        // Checkins
        Route::resource('/checkouts', CheckoutController::class);
});

require __DIR__ . '/auth.php';
