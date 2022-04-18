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
use App\Http\Controllers\PrintController ;
use App\Http\Controllers\AlertController ;
use App\Http\Controllers\ZoneController ;
use Illuminate\Http\Request;

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




route::group(['prefix' => 'mobile'], function () { // esta ruta es /mobile/xxx

  Route::get('getProjects', [MobileController::class, 'getProjects']) ;
  Route::get('getPlaylist/{id}', [MobileController::class, 'getPlaylistByProjectId']) ;
  Route::get('getShedule/{id}', [MobileController::class, 'getSheduleByProjectId']) ;
  Route::get('getAddress/{id}', [MobileController::class, 'getAddressProjectByProjectId']) ;

});





