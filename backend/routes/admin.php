<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\HomeController;
use Illuminate\Routing\Route as RoutingRoute;
use App\Http\Controllers\Admin\SeasonController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProjectController ;
use App\Http\Controllers\Admin\ArchivoController ;
use App\Http\Controllers\Admin\AddressController ;
use App\Http\Controllers\Admin\ProducController ;
use App\Http\Controllers\Admin\PublicationController ;
use App\Http\Controllers\Admin\PrintController ;
use App\Http\Controllers\Admin\AlertController ;
use App\Http\Controllers\Admin\ZoneController ;

// todo lo que tenga el prefijo admin entrará aqui cambiado en App->RouteServiceProvider


    route::group(['prefix' => ''], function () { // esta ruta es /admin/xxx
        Route::get('', [HomeController::class, 'index'])->name('dashboardAdmin'); // esta ruta es /admin/index
        Route::post('getdataCalendary', [HomeController::class, 'getdataCalendary']);
        Route::post('setSession', [HomeController::class, 'setSession']);

    });

  

    route::group(['prefix' => 'publication'], function () { // esta ruta es /admin/publication/xxx

        Route::get('', [PublicationController::class, 'index']) ;
        Route::post('getdataProjects', [PublicationController::class, 'getdataProjects']) ;
        Route::post('getdataPublished', [PublicationController::class, 'getdataPublished']) ;
        Route::post('getdatanoPublished', [PublicationController::class, 'getdatanoPublished']) ;
        Route::post('publicate', [PublicationController::class, 'publicate']) ;
        Route::post('desPublicate', [PublicationController::class, 'desPublicate']) ;



    });


    route::group(['prefix' => 'print'], function () { // esta ruta es /admin/print/xxx

        Route::get('', [PrintController::class, 'indexPrint']) ;
        Route::post('printProject', [PrintController::class, 'printProject'])->name('printProject'); // no está en uso
        Route::post('printprojectMultiple', [PrintController::class, 'printprojectMultiple'])->name('printprojectMultiple');


    });



