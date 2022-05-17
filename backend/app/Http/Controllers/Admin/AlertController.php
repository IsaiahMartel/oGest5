<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Alert;
use App\Models\Season;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;

class AlertController extends Controller
{
    // // guarda cambios en tabla Alerts
    // public function addAlert (Request $request)
    // {

    //     if($request->ajax()){


    //         $alerts  = new Alert();

    //         $alerts->project_id    = $request->input('eventName');
    //         $alerts->event_id      = $request->input('event_id');
    //         $alerts->season_id     = $request->input('season_id');
    //         $alerts->user_id 	   = $request->input('user_id');
    //         $alerts->playlist_id   = $request->input('playlist_id');
    //         $alerts->alertNote     = $request->input('alertNote');
    //         $alerts->alertlevel    = $request->input('alertlevel');
    //         $alerts->alerModule    = $request->input('alerModule');

    //         $alerts->save();

    //         return response()->json([
    //                 'message'=>  'true'
    //         ]);

    //     }else return "esto no es ajax";

    // }
    // obtiene datos para mostrar en el TIMELINE
        // guarda cambios en tabla Event
    public function getdataAlerts (Request $request)
    {

        if($request->ajax()){
            $season_id        = session('SESSION_season_id');
            $season           = Season::find($season_id);
            $seasonName       = $season->seasonName;
            $seasonCreated_at = $season->created_at;

            $alerts = Alert::where('alertSeasonName',$seasonName)->orWhere('created_at','>=','$seasonCreated_at')->with('users')->orderBy('created_at', 'desc')->get()->groupBy(function($item) {
                return $item->created_at->format('d-m-Y');
            });
            return response()->json([
                'message'=>  'true',
                'alerts' => $alerts
                ]);

        }else return "esto no es ajax";

    }


    // Usado para cargar enviar una alerta manual desde boton (ARCHIVO)
    public function sendAlert(Request $request)
    {

        $user_id      = Auth::id();
        $alertModule  = 'Archivo (Aviso)';
        $season_id    = session('SESSION_season_id');
        $event_id     = $request->input('event_id');
        $alertNote    = $request->input('notes');
        $alertLevel   = 7 ; // Modificación
        $projectLevel = 1;

        $project  = Project::where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->first();
        $eventName   = $project->events->eventName ;
        $project->save();

        addAlert ($user_id,$eventName,$alertLevel,$alertNote,$alertModule);

    }

}
