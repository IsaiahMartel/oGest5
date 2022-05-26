<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Season;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use App\Events\Hello ;
use App\Events\MyEvent ;
class PublicationController extends Controller
{
    public function index()
    {
        $season  = Season::find(session('SESSION_season_id'));
        $seasonSelected  = $season->seasonName;

        return view('admin.publication.index',compact(['seasonSelected']));

    }

    // Obtiene datos para rellenar tabla Proyectos Level 1
    public function getdataProjects(Request $request)
    {
        if($request->ajax())
        {
            //$season_id = $request->input('selectSeasonName');
            $season_id = session('SESSION_season_id');
            $projectLevel = $request->input('projectLevel');
            $projects    = Project::with('events')->where('season_id',$season_id)->where('projectLevel',$projectLevel)->get();
            return response()->json([
                    'data'    => $projects,
            ]);
        }
    }

    // Obtiene datos para rellenar tabla Publicados level 0
    public function getdataPublished(Request $request)
    {
        if($request->ajax())
        {
            //$season_id = $request->input('selectSeasonName');
            $season_id = session('SESSION_season_id');
            $published   = Project::with('events')->where('season_id',$season_id)->where('projectLevel',0)->get();

            return response()->json([
                    'data'   => $published
            ]);
        }
    }
    // Obtiene datos para rellenar tabla no publicados LEVEL 10
    public function getdatanoPublished(Request $request)
    {
        if($request->ajax())
        {
            //$season_id = $request->input('selectSeasonName');
            $season_id = session('SESSION_season_id');
            $level_1 = Project::with('events')->where('season_id',$season_id)->where('projectLevel',1)->get();
            $event_id_level_0 = Project::where('season_id',$season_id)->where('projectLevel',0)->pluck('event_id');
            $filtered = $level_1->whereNotIn('event_id', $event_id_level_0)->flatten(1);
            $filtered->all();

            return response()->json([
                'data' => $filtered ,
            ]);
        }
    }



    // funcion para pasar de LEVEL 1 a LEVEL 0-> para publicar
    public function publicate(Request $request)
    {

        if($request->ajax())
        {

            $timeline = '';
            $project_ids        = json_decode( $request->input('project_ids'));
            foreach ($project_ids as $key => $project_id) {
                $project        = Project::find($project_id);
                $project_season = $project->season_id ;
                $project_event  = $project->event_id ;
                $revision       = $project->projectRevision;

                $project->projectRevision        = $revision + 1;
                $project->save();
                Project::where('season_id',$project_season)->where('event_id',$project_event)->where('projectLevel',0)->delete();
                // pongo el numero de revisión en campo projectRevision
                $clone          = Project::find($project_id)->duplicate();
                $timeline .= $clone->events->eventName.', ';
            }
            $registros = $key+1 ;

            $project->projectArchivo = 'Terminado';
            $alertLevel  = 3 ;
            $alertNote   = 'Los proyectos : '. $timeline .' han sido publiacados';
            $user_id     = Auth::id();
            $alertModule = 'Artistico';

            addAlert($user_id,$timeline,$alertLevel,$alertNote,$alertModule);

            return response()->json([
                    'message' => true,
                    'texto' => 'Se han publicado '.$registros.' proyectos',
                    'texto2' => 'El proceso ha finalzado correctamente',
                    'proyectos' => $timeline
            ]);

        }

    }


    // para hacer la llamada al eventMobile
    public function eventMovile(Request $request)
    {
        $proyects = $request->input('projects');
        // aqui va la funcion que llama al evento (OJO, NO SE COMO LLAMARLA)
        // broadcast(new MyEvent('hello world'));
        broadcast(new Hello("Se han hecho cambios en " . $proyects));
    }

    // funcion para Despublicar (Borra registro de LEVEL 0)

    public function desPublicate(Request $request)
    {
        if($request->ajax())
        {
            $project_ids = json_decode( $request->input('project_ids'));
            $timelines = Project::whereIn('id',$project_ids)->get();
            $resultado = '';
            foreach ($timelines as $key => $value) {
                $resultado .= $value->events->eventName.', ';
            }
            $registros   = Project::whereIn('id',$project_ids)->delete();

            if ($registros >0) {


                $alertLevel  = 4 ;
                $alertNote   = 'Los proyectos : '. $resultado .' han sido despubliacados';
                $user_id     = Auth::id();
                $alertModule = 'Artistico';

                addAlert($user_id,$resultado,$alertLevel,$alertNote,$alertModule);
                return response()->json([
                        'message' => true,
                        'texto' => 'Se han despublicado '.$registros.' proyectos',
                        'texto2' => 'El proceso ha finalzado correctamente'
                ]);
            }else{
                return response()->json([
                    'message' => false,
                    'texto' => 'No se ha despublicado ningun proyecto',
                    'texto2' => 'Contacte con el creador del software'
            ]);

            }
        }

    }


}
