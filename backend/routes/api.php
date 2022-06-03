<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use Illuminate\Routing\Route as RoutingRoute;
use App\Http\Controllers\PublicationController\SeasonController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController ;
use App\Http\Controllers\ArchivoController ;
use App\Http\Controllers\AddressController ;
use App\Http\Controllers\ProducController ;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\MobileController;
use App\Http\Controllers\AlertController ;
use App\Http\Controllers\ZoneController ;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\PrintController ;
use App\Http\Controllers\PushController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




route::group(['prefix' => 'mobile', 'middleware' => ['auth:api',]], function () { // esta ruta es /mobile/xxx

  Route::get('getProjects', [MobileController::class, 'getProjects']) ;
  // Route::get('getPlaylist/{id}', [MobileController::class, 'getPlaylistByProjectId']) ;
  // Route::get('getShedule/{id}', [MobileController::class, 'getSheduleByProjectId']) ;
  // Route::get('getAddress/{id}', [MobileController::class, 'getAddressProjectByProjectId']) ;

  Route::get('getPlaylist', [MobileController::class, 'getPlaylists']) ;
  Route::get('getShedule', [MobileController::class, 'getShedules']) ;
  Route::get('getAddress', [MobileController::class, 'getAddresses']) ;
  Route::get('checkBackendStatus', [MobileController::class, 'checkBackendIsUp']);
  
  Route::post('/broadcast', function(Request $request){
    broadcast(new Message($request));
  }) ;
  Route::post('printprojectMultiple', [PrintController::class, 'printprojectMultiple'])->name('printprojectMultiple');
});

Route::group([  

  'middleware' => 'api',
  'prefix' => 'auth'

], function ($router) {

  Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
  Route::post('logout', [App\Http\Controllers\AuthController::class, 'logout']);
  Route::post('refresh', [App\Http\Controllers\AuthController::class, 'refresh']);
  Route::post('me', [App\Http\Controllers\AuthController::class, 'me']);
  Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);

});



  //Se en publication.js por lo que no puedo meterlo en la autenticación del móvil
Route::get('push',[MobileController::class, 'push'])->name('push');
Route::post('notification', [MobileController::class, 'saveTokenNotification']);

Route::put('notificationUser/{id}',[MobileController::class, 'notificationUser']);