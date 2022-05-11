<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Season;
use Carbon\Carbon;
use DateTime;
use IlluminateSupportFacadesSession;

class HomeController extends Controller
{
    public function index(Request $request){

        $hoy = Carbon::now();
        $actualSeason   = Season::where('seasonDateIni','<',$hoy)->where('seasonDateEnd','>',$hoy)->first();
        $seasons        = Season::orderBy('id','DESC')->get();
        $actualSeason   = ($actualSeason == null )? $actualSeason = Season::latest()->first() : $actualSeason ;
        // if ($actualSeason == null ){
        //     $season_id  = 0;
        //     $seasonName = 'SIN TEMPORADA';
        //}else
        if (session('SESSION_season_id') != null) {

            $season_session  = Season::find(session('SESSION_season_id'));
            $season_id       = session('SESSION_season_id');
            $seasonName      = $season_session->seasonName;
        }else {
                $season_id   = $actualSeason->id;
                $seasonName  = $actualSeason->seasonName;
                session(['SESSION_season_id' => $season_id]);
        }

        return view ('admin.index',compact(['season_id','seasons','seasonName']));

    }

    // pongo nuevo dato en la sesion (nueva temporada)
    public function setSession(Request $request)
    {
        $season_id = $request->input('season_id');
        //$request->session()->forget('SESSION_season_id');
        session(['SESSION_season_id' => $season_id]);
        //return  $request->session()->all();
        return response()->json([
            'message'       => true,
        ]);
    }

    //obtiene los datos projects para mostrarlos calendario
    public function getdataCalendary(Request $request)
    {
        if($request->ajax())
        {
            $season_id     = session('SESSION_season_id');
            $projectLevel  = $request->input('projectLevel');
            if ( $projectLevel == 10) {
                // para mostrar los NO publicados LEVEL 10
                $level_1 = Project::with('events')->where('season_id',$season_id)->where('projectLevel',1)->get();
                $event_id_level_0 = Project::where('season_id',$season_id)->where('projectLevel',0)->pluck('event_id');
                $level10 = $level_1->whereNotIn('event_id', $event_id_level_0)->flatten(1);
                $projects = $level10->all();

            }else {
                $projects      = Project::with('events')->with('shedules')->Where('season_id',$season_id)->Where('projectLevel',$projectLevel)->get();
            }

            $calendarEvents ='';
            foreach ($projects as $key => $project) {

                $calendarEvents =  collect($project->shedules)->map(function ($shedule) {

                // invalido las horas para evitar problemas cuando añaden rangos
                    // $horaIni = substr($shedule->shedulehourRange,0,5);
                    // $horaFin = substr($shedule->shedulehourRange,8,5);
                    // $horaIni = ($horaIni == null ) ? '00:00' : $horaIni;
                    // $horaFin = ($horaFin == null ) ? '00:00' : $horaFin;
                    $horaIni = '00:00' ;
                    $horaFin = '00:00' ;

                    if ($horaIni == '00:00' && $horaFin =='00:00') $allDay = true;
                    else $allDay = false;
                    //$fechaHoraInicio = $shedule->sheduleDate .' '. '00:00';
                    //$fechaHoraFin    = $shedule->sheduleDate .' '. '00:00';
                    return
                    [
                        'title'           => $shedule->project_id,
                        'start'           => Carbon::createFromFormat('Y-m-d H:i', $shedule->sheduleDate. ' '. $horaIni ),
                        'end'             => Carbon::createFromFormat('Y-m-d H:i', $shedule->sheduleDate. ' '. $horaFin ),
                        'backgroundColor' => '#f39c12',
                        'borderColor'     => '#f39c12',
                        'allDay'          => $allDay,
                        'groupId'         => $shedule->project_id
                    ];
                });
            }

            $calendarProjects =  collect($projects)->map(function ($project) use ($projectLevel){
                if ($projectLevel == 0 ) $backgroundColor = '#DA8DFE';
                else {
                    $proceso = 0;
                    if ($project->projectArtistico  == 'Proceso') $proceso ++ ;
                    if ($project->projectProduccion == 'Proceso') $proceso ++ ;
                    if ($project->projectArchivo    == 'Proceso') $proceso ++ ;
                    if ($project->projectPublished  == 'SI') $proceso = 4 ;
                    switch ($proceso) {
                        case 0:
                            $backgroundColor = 'green';
                            break;
                        case 1:
                            $backgroundColor = '#D3C903';
                            break;
                        case 2:
                            $backgroundColor = 'orange';
                            break;
                        case 3:
                            $backgroundColor = 'red';
                            break;
                        default:
                            $backgroundColor = 'blue';
                    }
                }
                return
                [
                    'title'           => $project->events->eventName,
                    'start'           => Carbon::createFromFormat('Y-m-d', $project->projectDateIni ),
                    'end'             => Carbon::createFromFormat('Y-m-d H:i', $project->projectDateEnd. ' 24:00' ),
                    'allDay'          => true,
                    'backgroundColor' => $backgroundColor,
                    'borderColor'     => $backgroundColor,
                    'id'              => $project->id,
                    'extendedProps'   => ['event_id' => $project->events->id , 'projectNote' => $project->projectNote , 'projectArtistico' => $project->projectArtistico, 'projectProduccion' => $project->projectProduccion, 'projectArchivo' => $project->projectArchivo]
                ];
            });
            $level0   = Project::Where('season_id',$season_id)->Where('projectLevel',0)->count();
            $level1   = Project::Where('season_id',$season_id)->Where('projectLevel',1)->count();
            $noPublicados =  $level1 - $level0;


            //return response()->json([$calendarProjects]);
            return response()->json([
                'message'       => true,
                'season_id'     => $season_id,
                'events'        => $calendarEvents,
                'projects'      => $calendarProjects,
                'level0_count'  => $level0,
                'level1_count'  => $level1,
                'noPublicados'  => $noPublicados // numero de no publicados (entero)

            ]);
        }

    }
}
