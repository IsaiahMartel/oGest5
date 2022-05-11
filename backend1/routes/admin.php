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
use App\Http\Controllers\Admin\StorageController;
use App\Http\Controllers\Admin\MobileuserController;
//Route::get('admin', function(){
//    return 'hola' ;
//});

// todo lo que tenga el prefijo admin entrará aqui porque lo cambien en App->RouteServiceProvider


    //Route::get('', [HomeController::class, 'index']); // esta ruta es /admin/index

    route::group(['prefix' => ''], function () { // esta ruta es /admin/xxx
        Route::get('', [HomeController::class, 'index'])->name('dashboardAdmin'); // esta ruta es /admin/index
        Route::post('getdataCalendary', [HomeController::class, 'getdataCalendary']);
        Route::post('setSession', [HomeController::class, 'setSession']);

    });

    route::group(['prefix' => 'address'], function () { // esta ruta es /admin/address/xxx

        Route::get('', [AddressController::class, 'index']) ;
        Route::get('groupsAddress', [AddressController::class, 'groupsAddress']) ;
        Route::post('getexistegroupsAddress', [AddressController::class, 'getexistegroupsAddress']) ;
        Route::post('getdatagroupsAddress', [AddressController::class, 'getdatagroupsAddress']) ;
        Route::post('storegroupsAddress', [AddressController::class, 'storegroupsAddress']) ;
        Route::post('getdataAddress', [AddressController::class, 'getdataAddress']) ;
        Route::post('storeAddress', [AddressController::class, 'storeAddress']) ;
        Route::post('getexisteAddress', [AddressController::class, 'getexisteAddress']) ;
        Route::post('getdataContact', [AddressController::class, 'getdataContact']) ;
        Route::post('deleteAddress', [AddressController::class, 'deleteAddress']) ;

    });

    route::group(['prefix' => 'projects'], function () {

        //Route::get('', [ProjectController::class, 'index']) ;
        Route::get('projectGes', [ProjectController::class, 'projectGes']) ;
        Route::post('getdataProject', [ProjectController::class, 'getdataProject']) ;
        Route::post('getexisteProject', [ProjectController::class, 'getexisteProject']) ;
        Route::post('getsolapeProject', [ProjectController::class, 'getsolapeProject']) ;
        Route::post('storeProject', [ProjectController::class, 'storeProject']) ;
        Route::post('deleteProject', [ProjectController::class, 'deleteProject']);
        Route::post('getdataShedule', [ProjectController::class, 'getdataShedule']) ;
        Route::post('getdataTipeshedule', [ProjectController::class, 'getdataTipeshedule']) ;
        Route::post('addShedule', [ProjectController::class, 'addShedule']);
        Route::post('deleteUnShedule', [ProjectController::class, 'deleteUnShedule']);
        Route::post('getdataEventNoCreado', [ProjectController::class, 'getdataEventNoCreado']);
        Route::post('changeState', [ProjectController::class, 'changeState']) ;


    });

    route::group(['prefix' => 'users'], function () {

        Route::get('', [UserController::class, 'index']) ;
        Route::get('permission', [UserController::class, 'permission'])->name('permission'); // menu de permisos (ZONAS)
        Route::post('getdataPermission', [UserController::class, 'getdataPermission']);
        Route::post('storePermission', [UserController::class, 'storePermission']);
        Route::post('getexistePermission', [UserController::class, 'getexistePermission']);
        Route::post('getdataUser', [UserController::class, 'getdataUser']) ;
        Route::post('storeUser', [UserController::class, 'storeUser']) ;
        Route::post('getexisteEmail', [UserController::class, 'getexisteEmail']) ;

    });

    Route::group(['prefix' => 'seasons'], function () {

        //Route::get('seasons/create', [SeasonController::class, 'create']) ;
        //Route::get('seasons/{season}', [SeasonController::class, 'show']) ;
        Route::get('', [SeasonController::class, 'index']) ;
        Route::post('getdaSeason', [SeasonController::class, 'getdaSeason']) ;
        Route::post('storeSeason', [SeasonController::class, 'storeSeason']) ;
        Route::post('getexisteSeason', [SeasonController::class, 'getexisteSeason']) ;
        Route::post('getsolapeSeason', [SeasonController::class, 'getsolapeSeason']) ;

    });

    Route::group(['prefix' => 'events'], function () {

        Route::get('', [EventController::class, 'index']) ;
        Route::post('getdaEvent', [EventController::class, 'getdaEvent']) ;
        Route::post('storeEvent', [EventController::class, 'storeEvent']) ;
        Route::post('getexisteEvent', [EventController::class, 'getexisteEvent']) ;
        Route::post('deleteEvent', [EventController::class, 'deleteEvent']) ;

    });

    route::group(['prefix' => 'archivo'], function () {

        Route::get('', [ArchivoController::class, 'index']) ;
        Route::get('workAdd', [ArchivoController::class, 'workAdd']) ;
        Route::get('workEdit/{id}', [ArchivoController::class, 'workEdit']);
        Route::get('gestArchivo', [ArchivoController::class, 'gestArchivo']) ;
        Route::get('composer', [ArchivoController::class, 'composer']) ;
        Route::post('getdataComposer', [ArchivoController::class, 'getdataComposer']) ;
        Route::post('getexisteComposer', [ArchivoController::class, 'getexisteComposer']) ;
        Route::post('storeComposer', [ArchivoController::class, 'storeComposer']) ;
        Route::post('getdataEvent', [ArchivoController::class, 'getdataEvent']) ;
        Route::post('getdataWork', [ArchivoController::class, 'getdataWork']) ;
        Route::post('getexisteWork', [ArchivoController::class, 'getexisteWork']) ;
        Route::post('storeWork', [ArchivoController::class, 'storeWork']) ;
        Route::post('storeOrder', [ArchivoController::class, 'storeOrder']) ;
        Route::post('deletePlaylist', [ArchivoController::class, 'deletePlaylist']) ;
        Route::post('storePlaylist', [ArchivoController::class, 'storePlaylist']) ;
        Route::post('getdataInstrument', [ArchivoController::class, 'getdataInstrument']) ; // de la tabla instruments para per-voces-key
        Route::post('cargaPlaylist', [ArchivoController::class, 'cargaPlaylist']) ;
        Route::post('loaddataPlaylist', [ArchivoController::class, 'loaddataPlaylist']) ;
        Route::post('existeDatosEnWork', [ArchivoController::class, 'existeDatosEnWork']) ; // dice si hay o no datos en Work para ponerlos desde playlist
        Route::post('editPlaylist', [ArchivoController::class, 'editPlaylist']) ; // usado para modificar los datos de playlist
        Route::post('cargaEstado', [ArchivoController::class, 'cargaEstado']) ;
        Route::post('loaddataPlaylistTerminado', [ArchivoController::class, 'loaddataPlaylistTerminado']) ; // para mostraar la per, teclados y voces en un projecto terminado
        Route::post('changeState', [ArchivoController::class, 'changeState']) ; // cambia el estado del proyecto Proceso / Terminado
        Route::post('guardaCuerda', [ArchivoController::class, 'guardaCuerda']) ; // guarda solo la cuerda
        Route::post('deleteWork', [ArchivoController::class, 'deleteWork']) ; // borra obra

    });


    Route::group(['prefix' => 'produc'], function () {

        Route::get('', [ProducController::class, 'index']) ;
        Route::get('tipes', [ProducController::class, 'tipes']) ;
        Route::get('rooms', [ProducController::class, 'rooms']) ;
        Route::get('shedule', [ProducController::class, 'shedule']) ;
        Route::post('storeIntegrante', [ProducController::class, 'storeIntegrante']) ;
        Route::post('storeExtra', [ProducController::class, 'storeExtra']) ;
        Route::post('cargaIntegrantes', [ProducController::class, 'cargaIntegrantes']) ;
        Route::post('deleteInterprete', [ProducController::class, 'deleteInterprete']) ;
        Route::post('storeOrder', [ProducController::class, 'storeOrder']) ;
        Route::post('getdataTipes', [ProducController::class, 'getdataTipes']) ;
        Route::post('getexisteTipes', [ProducController::class, 'getexisteTipes']) ;
        Route::post('storeTipes', [ProducController::class, 'storeTipes']) ;
        Route::post('getdataRooms', [ProducController::class, 'getdataRooms']) ;
        Route::post('deleteTipe', [ProducController::class, 'deleteTipe']) ;
        Route::post('getexisteRooms', [ProducController::class, 'getexisteRooms']) ;
        Route::post('storeRoom', [ProducController::class, 'storeRoom']) ;
        Route::post('changeState', [ProducController::class, 'changeState']) ;

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


    Route::group(['prefix' => 'alerts'], function () {

        Route::post('addAlert', [AlertController::class, 'addAlert']) ;
        Route::post('getdataAlerts', [AlertController::class, 'getdataAlerts']);
        Route::post('sendAlert', [AlertController::class, 'sendAlert']); // para enviar alertas manualmente


    });


    Route::group(['prefix' => 'store'], function () {

        //Route::get('index/{url}', [StorageController::class, 'index']) ;
        Route::get('', [StorageController::class, 'index']) ;
        Route::post('getdirectorios', [StorageController::class, 'getdirectorios']) ;

    });


    Route::group(['prefix' => 'mobile'], function () {

        Route::get('', [MobileuserController::class, 'index']) ;
        Route::post('getdataMobile', [MobileuserController::class, 'getdataMobile']) ;
        Route::post('storeMobile', [MobileuserController::class, 'storeMobile']) ;
        Route::post('getexisteEmail', [MobileuserController::class, 'getexisteEmail']) ;

    });



