<?php

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Alert;
use App\Models\Season;
use App\Events\Hello ;

// alertLEVEL
//1 Crear Project
//2 borrado
//3 publicacion
//4 Despublicado
//5 Terminado
//6 Proceso
//7 Modificado

function addAlert ($user_id,$eventName,$alertLevel,$alertNote='',$alertModule='') {

    $alerts  = new Alert();
    $season_id    = session('SESSION_season_id');
    $seasonName   = Season::find($season_id)->seasonName;
    $alerts->user_id 	     = $user_id;
    $alerts->alertSeasonName = $seasonName;
    $alerts->alertEventName  = $eventName ;
    $alerts->alertNote       = $alertNote ;
    $alerts->alertLevel      = $alertLevel;
    $alerts->alertModule     = $alertModule ;

    $alerts->save();

    return response()->json([
            'message'=>  'true'
    ]);
}

function sendMessage(Request $request){

   // projects son todos los projectos que se han publicado tras pulsar el botón
    $projects= $request->input('projects');

    broadcast(new Hello( $projects));

}

