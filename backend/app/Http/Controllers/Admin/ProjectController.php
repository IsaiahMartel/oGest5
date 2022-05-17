<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Event;
use App\Models\Room;
use App\Models\Season;
use App\Models\Shedule;
use App\Models\Tipeshedule;
use Carbon\Carbon;
use App\helpers;


use GuzzleHttp\Promise\Each;

class ProjectController extends Controller
{

    // public function index()
    // {
    //     $projects = Project::all();
    //     $seasons  = Season::all();
    //     $events   = Event::all();
    //     $rooms    = Room::all();
    //     $tipes    = Tipeshedule::all();
    //     $season_selected =  session(['SESSION']);

    //     return view('admin.projects.index',compact('projects','seasons','events','tipes','rooms'));

    // }

    public function projectGes(Request $request)
    {
        if ($request->session()->has('SESSION_season_id')) {
            $projects = Project::all();
            //$seasons  = Season::all();
            $season  = Season::find(session('SESSION_season_id'));
            $events   = Event::all();
            $rooms    = Room::all();
            $tipes    = Tipeshedule::all();
            $season_selected =  $season->seasonName ;

            return view('admin.projects.projectGes',compact('projects','events','tipes','rooms','season_selected'));
        }else {
            return redirect('admin/');
        }
    }

    //funcion que detecta si un evento existe en esa temporada (si existe ese proyecto) evento + temporada = proyecto
    public function getexisteProject(Request $request)
    {
        if($request->ajax())
        {
            //$season_id = $request->input('season_id');
            $season_id     = session('SESSION_season_id');
            $event_id      = $request->input('event_id');
            $projectLevel  = $request->input('projectLevel');

            if ($event_id > 0) {
                $project  = Project::Where('season_id',$season_id)->Where('event_id',$event_id)->Where('projectLevel',$projectLevel)->first();
                if ($project) return response()->json(['message' => true,
                                                        'project' => $project ]);
                else return response()->json(['message' => false]);
            }
        }

    }
    // Compruebo que no se solape la fecha con alguna otra ya en projectos Project
    public function getsolapeProject(Request $request)
    {
        if($request->ajax()){
            //$season_id    = $request->input('season_id');
            $season_id     = session('SESSION_season_id');
            $projectLevel = $request->input('projectLevel');

            // entra aqui si esta editando un registro
            if (!empty($request->input('editar')))
                $project_id= $request->input('editar');
            else
                $project_id = 0;

            $datepickerIni = substr($request->input('daterange'), 0, 10);
            $datepickerEnd = substr($request->input('daterange'), 13);
            $dateIni= Carbon::createFromFormat( 'd/m/Y', $datepickerIni)->format('Y-m-d');
            $dateEnd= Carbon::createFromFormat( 'd/m/Y', $datepickerEnd)->format('Y-m-d');
            $datos = Project::Where('season_id',$season_id)->Where('projectLevel',$projectLevel)->with('events')->where('id','<>',$project_id)->where(function($query) use ($dateIni,$dateEnd)
            {
                $query->whereBetween('projectDateIni',[$dateIni, $dateEnd])
                        ->orWhereBetween('projectDateEnd',[$dateIni, $dateEnd]);
            })->first();

            //return response()->json(['message' => $datos]);
            if ($datos)
            {
                return response()->json(['message' => 'solapa',
                                         'project' =>  $datos]);
            }
            else
                return response()->json(['message' => 'noSolapa']);
        }
    }



    // guarda cambios en tabla Project y Event
    public function storeProject (Request $request)
    {
        if($request->ajax()){
            $alertNote = '';
            $alertModule = 'Artistico';
            // id del proyecto => $request->input('editar')
            $datepickerIni = substr($request->input('daterange'), 0, 10);
            $datepickerEnd = substr($request->input('daterange'), 13);
            $dateIni= Carbon::createFromFormat( 'd/m/Y', $datepickerIni)->format('Y-m-d');
            $dateEnd= Carbon::createFromFormat( 'd/m/Y', $datepickerEnd)->format('Y-m-d');

            // Compruebo que está dentro del rango de la temporada
            $season    = Season::find(session('SESSION_season_id'));
            $seasonIni = $season->seasonDateIni;
            $seasonEnd = $season->seasonDateEnd;
            $checkIni  = Carbon::createFromDate($dateIni)->between($seasonIni,$seasonEnd);
            $checkEnd  = Carbon::createFromDate($dateEnd)->between($seasonIni,$seasonEnd);

            if ($checkIni && $checkEnd )
            {
                if ( empty($request->input('editar')) ){
                    $alertLevel = 1;
                    $project = new Project();
                }
                else {
                    $alertLevel = 7;
                    $alertModule = 'Artistico';
                    $project           = Project::find($request->input('editar'));
                    $dateInicioAntigua = Carbon::createFromDate($project->projectDateIni);
                    $dateFinAntigua    = Carbon::createFromDate($project->projectDateEnd);
                    $diasAntiguo       = $dateFinAntigua->diffInDays($dateInicioAntigua); // numero de dias entre DateIni y DateEnd
                }
                //$project->season_id         = $request->input('selectSeasonId');
                $project->season_id         = session('SESSION_season_id');
                $project->event_id 	        = $request->input('selectEventId');
                $project->projectNote 	    = $request->input('projectNote');
                $project->projectDateIni 	= $dateIni;
                $project->projectDateEnd 	= $dateEnd;
                $project->projectLevel  	= $request->input('projectLevel');
                $project->projectArtistico 	= $request->input('projectArtistico');

                //if (empty($request->input('editar'))) {
                    $project->projectArtistico	= 'Proceso';
                    $project->projectProduccion = 'Proceso';
                    $project->projectArchivo	= 'Proceso';
                //}
                //$project->projectPublished	= $request->input('projectPublished');

                $project->save();
                $carbondateIni = Carbon::createFromDate($dateIni);
                $carbondateEnd = Carbon::createFromDate($dateEnd);
                $dias = $carbondateIni->diffInDays($carbondateEnd); // numero de dias entre DateIni y DateEnd
                $fecha=$carbondateIni;

                // añade dias en SHEDULE de lunes a Domingo
                $projectId = $project->id;
                if ( empty($request->input('editar')) ) {

                    for($i=1; $i<=$dias+1; $i++)
                    {
                        $shedule = new Shedule();
                        $shedule->project_id=$projectId;
                        $shedule->sheduleTipe='AM';
                        $shedule->room_id=1;
                        $shedule->sheduleDate=$fecha->format('Y-m-d');
                        $shedule->shedulehourRange='10:00 - 13:30';
                        $shedule->sheduleNote='';
                        $shedule->sheduleOrder=$i;
                        $shedule->save();
                        $fecha=$fecha->addDay(1);
                    }
                }else {
                    // añadir si está editando
                    $alertNote = 'Las fechas del proyecto han sido modificadas, Los proyectos se han puesto automaticamente en nivel de Proceso ';
                    $shedules     = $project->shedules ;
                    $diasdeMas    = $dias - $diasAntiguo; // compruebo si redimenciona el projecto (0 no redimensiona, un numero, redimensiona esos dias)
                    $desplazaDias = intval($carbondateIni->diffInDays($dateInicioAntigua)); // compruebo cuantos dias desplaza el inicio de fecha
                    // en este bucle recoloco los dias
                    foreach ($shedules as $key => $shedule){
                        if ($dateInicioAntigua->gt($carbondateIni)) $shedule->sheduleDate = Carbon::createFromDate($shedule->sheduleDate)->subDays($desplazaDias); // A es mayor que B ? -> true / false
                        else $shedule->sheduleDate = Carbon::createFromDate($shedule->sheduleDate)->addDays($desplazaDias)  ;
                        $shedule->save();
                    }
                    $fecha = $shedule->sheduleDate;
                    $orden = $shedule->sheduleOrder;
                    //dd($fecha) ;
                    if ($diasdeMas >= 0) // en este bucle añado dias de mas
                    {
                        for($i=1; $i<=$diasdeMas; $i++) {
                            $shedule = new Shedule();
                            $fecha=$fecha->addDay(1);
                            $orden++;
                            $shedule->project_id=$projectId;
                            $shedule->sheduleTipe='AM';
                            $shedule->room_id=1;
                            $shedule->sheduleDate=$fecha->format('Y-m-d');
                            $shedule->shedulehourRange='10:00 - 13:30';
                            $shedule->sheduleNote='';
                            $shedule->sheduleOrder=$orden;
                            $shedule->save();
                        }
                    }else { // entra aqui si dias deMas es negativo, significa que recorta dias

                        $shedules=Shedule::where('project_id',$shedule->project_id)->where('sheduleDate','>',$carbondateEnd)->delete();

                    }
                }
                $user_id = Auth::id();
                addAlert($user_id,$project->events->eventName,$alertLevel,$alertNote,$alertModule);
                return response()->json([
                        'message'=>  'true',
                        'id'=>  $project->id,
                        'dias' => $dias
                ]);
            }else{
                return response()->json([
                    'message'=>  'false'
                ]);
            }

        }else return "esto no es ajax";
    }
    //obtiene los datos de shedule para mostrarlos en projects
    public function getdataShedule(Request $request)
    {
        if($request->ajax())
        {
            //$season_id      = $request->input('season_id');
            $season_id          = session('SESSION_season_id');
            $event_id           = $request->input('event_id');
            $projectLevel       = $request->input('projectLevel');

            $projects  = Project::with('shedules')->with('shedules.rooms')->Where('season_id',$season_id)->Where('event_id',$event_id)->Where('projectLevel',$projectLevel)->first();
            return response()->json([
                'data' => $projects->shedules
            ]);
        }
    }
    //obtiene los datos de Tipeshedule para mostrarlos el PAGINATE
    public function getdataTipeshedule(Request $request)
    {
        if($request->ajax())
        {
            $tipe = TipeShedule::all();
            return $tipe ;
        }
    }
// guardamos datos en Shedule
    public function addShedule(Request $request) {

        if($request->ajax())
        {
            //$selectSeasonId = $request->input('season_id');
            $selectSeasonId = session('SESSION_season_id');
            $selectEventId = $request->input('event_id');
            $projectLevel = $request->input('projectLevel');
            $project = Project::Where('season_id',$selectSeasonId)->Where('event_id',$selectEventId)->Where('projectLevel',$projectLevel)->first();

            // Recupero los datos de la tabla serializados
            $shedulesTable = json_decode($request->input('table')) ;

            foreach ($shedulesTable as $key => $tableRow) {
                if (!isset($tableRow->id)) $data=new Shedule();
                else $data = Shedule::find($tableRow->id);

                if (!isset($tableRow->rooms->id) || $tableRow->rooms->id == '' ) $salaId = null;
                else $salaId = $tableRow->rooms->id;
                //var_dump($salaId);
                $data->project_id        = $project->id;
                $data->sheduleTipe       = $tableRow->sheduleTipe;
                $data->room_id           = $salaId;
                $data->sheduleDate       = Carbon::createFromDate($tableRow->sheduleDate)->format('Y-m-d');
                $data->shedulehourRange  = $tableRow->shedulehourRange;
                $data->sheduleNote       = $tableRow->sheduleNote;
                $data->sheduleOrder      = $tableRow->sheduleOrder;
                $data->save();
            }
            return response()->json([
                'message' => 'completado'
            ]);
        }
   }

// Borra un registro de Shedule

   public function deleteUnShedule (Request $request){
        if($request->ajax())
        {
            $sheduleId = $request->input('shedule_id');
            $shedule = Shedule::find($sheduleId);
            $shedule->delete();
        }
   }

// Borrar un proyecto
   public function deleteProject(Request $request)
   {
        if($request->ajax())
        {

            $project_id  = $request->input('project_id');
            $project     = Project::find($project_id);
            $event_id    = $project->event_id;


            $user_id     = Auth::id();
            $alertModule = 'Artistico';
            $alertLevel  = 2 ;
            $alertNote   = 'El proyecto y todos los datos relacionados con el se han eliminado';

            $project->delete();
            if ($project){

                addAlert($user_id,$project->events->eventName,$alertLevel,$alertNote,$alertModule);
                return response()->json([
                    'message'  => true,
                    'event_id' => $event_id
                ]);
            }else {
                return response()->json([
                    'message' => false
                ]);
            }
        }
   }

// Envia los EVENTOS que NO estan en la tabla de PROYECTOS (es decir, eventos que aun no se han programado en una temporada determinada)
    public function getdataEventNoCreado(Request $request){

        if ($request->ajax())
        {
            $selectSeasonId = session('SESSION_season_id');
            //$selectSeasonId = $request->input('selectSeasonId');
            $projectLevel = $request->input('projectLevel');
            $events = Event::all();
            $projects = Project::with('events')->with('seasons')->where('projectLevel',$projectLevel)->where('season_id',$selectSeasonId)->get();
            $eventsInProjects =  collect($projects)->map(function ($project) {
                return
                [
                    'id'  => $project->events->id,
                    'eventName'   => $project->events->eventName
                ];
            });
            $diff = $events->diffKeys($eventsInProjects);
            return response()->json([
                'eventsInProjects'  => $eventsInProjects,
                'allEvents'         => $events,
                'diff'              => $diff

            ]);
        }

    }

    // utilizado para cambiar es que estado está el projecto Terminado o Proceso en la seccion de INTEGRANTES

    public function changeState (request $request)
    {
        if($request->ajax()){

            //$season_id    = $request->input('season_id');
            $season_id    = session('SESSION_season_id');
            $event_id     = $request->input('event_id');
            $notes     = $request->input('notes');
            $projectLevel = 1;

            $project  = Project::where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->first();

            if ($project->projectArtistico == 'Proceso') {
                $project->projectArtistico = 'Terminado';
                $alertLevel  = 5 ;
                $alertNote   = 'El proyecto pasa a estado TERMINADO, '.$notes;
            }
            else {
                $project->projectArtistico = 'Proceso';
                $alertLevel  = 6 ;
                $alertNote   = 'El proyecto se vuelve a poner en PROCESO, '.$notes;
            }
            $project->save();
            $user_id     = Auth::id();
            $alertModule = 'Artistico (integrantes)';

            addAlert($user_id,$project->events->eventName,$alertLevel,$alertNote,$alertModule);
            return response()->json([
                'message'=>  true,
                'projectArchivo'    => $project->projectArchivo,
                'projectArtistico'  => $project->projectArtistico,
                'projectProduccion' => $project->projectProduccion
            ]);

        }else return "esto no es ajax";
    }

}
