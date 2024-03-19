<?php

use App\Http\Controllers\BlockController;
use App\Http\Controllers\CampController;
use App\Http\Controllers\CheckinController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\SectionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Http;
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

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

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

    // Sections
    Route::resource('/sections', SectionController::class);


    // SMS TEST
    // Route::get('/sms', function () {

    //     $checkOutMessage = "Ndugu BENSON NGUNGURU, umehamishwa kutoka chumba namba AJ444-BLOCK 8, tafadhali subiri maelekezo ya chumba unachotakiwa kwenda.";


    //     $api_key='db927f0150db6097';
    //     $secret_key = 'MzAxOTBjYWQ0YTQyMGU1N2Q1ZTA1MWJlNGU2YzRjZWY4NGQ4NGE2YmJkZDM3MDVlZThiZGI0MzA5NDczMzAzNw==';

    //     $postData = array(
    //         'source_addr' => 'INFO',
    //         'encoding'=>0,
    //         'schedule_time' => '',
    //         'message' => $checkOutMessage,
    //         'recipients' => [array('recipient_id' => '1','dest_addr'=>'255746529764'),array('recipient_id' => '2','dest_addr'=>'255693307286')]
    //     );

    //     $Url ='https://apisms.beem.africa/v1/send';

    //     $ch = curl_init($Url);
    //     error_reporting(E_ALL);
    //     ini_set('display_errors', 1);
    //     curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    //     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    //     curl_setopt_array($ch, array(
    //         CURLOPT_POST => TRUE,
    //         CURLOPT_RETURNTRANSFER => TRUE,
    //         CURLOPT_HTTPHEADER => array(
    //             'Authorization:Basic ' . base64_encode("$api_key:$secret_key"),
    //             'Content-Type: application/json'
    //         ),
    //         CURLOPT_POSTFIELDS => json_encode($postData)
    //     ));

    //     $response = curl_exec($ch);

    //     if($response === FALSE){
    //             echo $response;

    //         die(curl_error($ch));
    //     }
    //     dd($response);
    // });
});

require __DIR__ . '/auth.php';
