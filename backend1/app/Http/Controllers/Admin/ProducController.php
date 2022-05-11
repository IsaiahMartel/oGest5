<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Work;
use App\Models\Composer;
use App\Models\Library;
use App\Models\Season;
use App\Models\Event;
use App\Models\Instrument;
use App\Models\Percussion;
use App\Models\Keyboard;
use App\Models\Voice;
use App\Models\Playlist;
use App\Models\Project;
use App\Models\Addressgroup;
use App\Models\Room;
use App\Models\Tipeshedule;
use Illuminate\Support\Facades\Auth;

class ProducController extends Controller
{

// pagina principal de Produc (para añadir integrantes al projecto)
    public function index(Request $request)
    {
        if ($request->session()->has('SESSION_season_id')) {
            $composers = Composer::all();
            $catalogs  = Library::all();
            $events    = Event::all();

            $projectLevel = 1;
            $season_id = session('SESSION_season_id');
            $season = Season::find($season_id);
            $seasonSelected  = $season->seasonName;
            $projects = Project::with('events')->with('seasons')->where('season_id',$season_id)->where('projectLevel',$projectLevel)->get();

            $events = collect($projects)->map(function ($project) {
                return [
                    'id' => $project->events->id ,
                    'eventName' => $project->events->eventName
                ];
            })->sortBy('eventName');

            return view('admin.produc.index',compact(['composers','catalogs','events','seasonSelected']));
        }else {
            return redirect('admin/');
        }
    }
// da acceso a la pagina para añadir Tipos de ensayos

    public function tipes()
    {
        $tipes = Tipeshedule::all();

        return view('admin.produc.tipes',compact(['tipes']));

    }

// da acceso a la pagina para añadir rooms

    public function rooms()
    {
        $rooms = Room::all();

        return view('admin.produc.rooms',compact(['rooms']));

    }


// accede a la pagina para añadir shedule al proyecto

    public function shedule(Request $request)
    {
        if ($request->session()->has('SESSION_season_id')) {
            $projects = Project::all();
            //$seasons  = Season::all();
            $rooms    = Room::all();
            $tipes    = Tipeshedule::all();

            $projectLevel = 1;
            $season_id = session('SESSION_season_id');
            $season = Season::find($season_id);
            $seasonSelected  = $season->seasonName;
            $projects = Project::with('events')->with('seasons')->where('season_id',$season_id)->where('projectLevel',$projectLevel)->get();

            $events = collect($projects)->map(function ($project) {
                return [
                    'id' => $project->events->id ,
                    'eventName' => $project->events->eventName
                ];
            })->sortBy('eventName');

            return view('admin.produc.shedule',compact('projects','events','seasonSelected','tipes','rooms'));
        }else {
            return redirect('admin/');
        }
    }

//guarda cuando se arrastra a la card de Integrantes o Extras

    public function storeIntegrante(Request $request)
    {
        if ($request->ajax())
        {

            //$season_id    = $request->input('season_id');
            $season_id    = session('SESSION_season_id');
            $event_id     = $request->input('event_id');
            $address_id   = $request->input('address_id');
            $projectLevel = $request->input('projectLevel');
            $grupo_name   = str_replace('<br>','', $request->input('grupo_name'));
            $address_name = $request->input('address_name');
            $apellido     = $request->input('apellido');
            $listado      = $request->input('listado');

            $grupo        = Addressgroup::where('addressgroupName',$grupo_name)->first(); // obtengo el id del Grupo al que pertenece

            if ($grupo) $grupo_id  = $grupo->id;
            else $grupo_id  = NULL;

            $project    = Project::where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->first();
            $project_id = $project->id ;

            $direcciones = $project->addresses;
            $ultimo= $direcciones->max('pivot.order')+1;

            //$user->roles()->syncWithPivotValues([1, 2, 3], ['active' => true]);

            if ($listado == 'project') $project->addresses()->attach($address_id,['addressgroup_id' => $grupo_id, 'order'=> $ultimo ]);
            else $project->extras()->attach($address_id,['addressgroup_id' => $grupo_id, 'order'=> $ultimo ]);
            $project    = Project::where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->first();
            if ($listado == 'project') $id_address_project    = $project->addresses->last()->pivot->id ;



            return response()->json(['message'=>  true ,
            'address_id'         => $address_id,
            'id_address_project' => (!isset($id_address_project))? '' : $id_address_project ,
            'group_id'           => ($grupo_id == null) ? '' : $grupo->id,
            'order'              => $ultimo ]);

        }else return "esto no es ajax";

    }

    //guarda cuando se arrastra a la card de Extras

    public function storeExtra(Request $request)
    {
        if ($request->ajax())
        {

            //$season_id    = $request->input('season_id');
            $season_id    = session('SESSION_season_id');
            $event_id     = $request->input('event_id');
            $extra_id     = $request->input('address_id');
            $projectLevel = $request->input('projectLevel');
            $grupo_name   = str_replace('<br>','', $request->input('grupo_name'));
            $extra_name   = $request->input('address_name');
            $apellido     = $request->input('apellido');

            $grupo     = Addressgroup::where('addressgroupName',$grupo_name)->first();
            if ($grupo) $grupo_id  = $grupo->id;
            else $grupo_id  = NULL;

            $project    = Project::where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->first();
            $project_id = $project->id ;

            $direcciones = $project->extras;
            $ultimo= $direcciones->max('pivot.order')+1;

            //$user->roles()->syncWithPivotValues([1, 2, 3], ['active' => true]);

            $project->extras()->attach($extra_id,['addressgroup_id' => $grupo_id, 'order'=> $ultimo ]);

            return response()->json(['message'=>  true ,
            'address_id' => $extra_id,
            'grupo_id' => $grupo_id,
            'orden' => $ultimo ]);

        }else return "esto no es ajax";

    }

// Funcion para cargar los integrantes en los card (integrantes y extras)
    public function cargaIntegrantes(Request $request)
    {
        if ($request->ajax())
        {
            //$season_id     = $request->input('season_id');
            $season_id    = session('SESSION_season_id');
            $event_id      = $request->input('event_id');
            $projectLevel  = $request->input('projectLevel');

            $integrantes = Project::where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->with(['addresses' => function ($q) {
                $q->with('addressgroups')->orderBy('pivot_order', 'asc');
              }])->first();

            $extras = Project::where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->with(['extras' => function ($q) {
                $q->with('addressgroups')->orderBy('pivot_order', 'asc');
              }])->first();

            return response()->json([
                'message'       => true,
                'integrantes'   => $integrantes,
                'extras'        => $extras
            ]);

        }
    }

// ELIMINAR obra de playList
    public function deleteInterprete(Request $request)
    {
        if ($request->ajax())
        {
            //$season_id      = $request->input('season_id');
            $season_id      = session('SESSION_season_id');
            $event_id       = $request->input('event_id');
            $projectLevel   = $request->input('projectLevel');
            $listado        = $request->input('listado');
            $id             = $request->input('address_id');

            $project = Project::where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->first();

            if ($listado == 'droppable-project') $project->addresses()->detach($id);
            else $project->extras()->detach($id);

            return response()->json(['message'=>  true]);

        }
        else return "esto no es ajax";

    }


// Se activa cuando ordena la lista manualmente (cuando mueve un <LI> de interpretes) para ajustar el campo orden de la tabla PIVOTE
    public function storeOrder(Request $request)
    {
        if ($request->ajax())
        {
            //$season_id           = $request->input('season_id');
            $season_id           = session('SESSION_season_id');
            $event_id            = $request->input('event_id');
            $projectLevel        = $request->input('projectLevel');
            $listado             = $request->input('listado');
            $address_id          = json_decode($request->input('address_id'));
            $id_address_projects = json_decode($request->input('id_address_project'));
            $groups_name         = json_decode($request->input('groups_name'));
            $groups_id           = json_decode($request->input('groups_id'));
            //$grupos_name         = array_diff($grupos_name, array(""));

            $project = Project::with('addresses')->with('extras')->where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->first();
            $project_id = $project->id;
            $posicion = 0;
            $project->addresses()->detach();
            //$project->addresses()->syncWithPivotValues($address_id, ['addressgroup_id' => $groups_id , 'order' => $orden]);

             foreach ($address_id as $key => $id) {
                $posicion++;
                $grupo_id = ($groups_id[$key] == '') ? null : $groups_id[$key];
                if ($listado == 'droppable-project') {
                    $project->addresses()->attach($id,['addressgroup_id' => $grupo_id, 'order'=> $posicion ]);
                }//else {
                   // $project->extras()->attach($id,['addressgroup_id' => $grupo_id, 'order'=> $posicion ]);
                //}
            }
            return response()->json(['message'=>  true,
                                      'address_id'=> $address_id  ]);

        }
        else return "esto no es ajax";
    }
// para rellenar los tipos de ensayo AM, PM

    public function getdataTipes(Request $request){

        if ($request->ajax())
        {
            $tipes = Tipeshedule::all() ;
            return response()->json([
                'data' => $tipes
            ]);
        }

    }

// para rellenar las salas

    public function getdataRooms(Request $request){

        if ($request->ajax())
        {
            $rooms = Room::all() ;
            return response()->json([
                'data' => $rooms
            ]);
        }

    }

// Utilizado para comprobar si se repite el tipo
    public function getexisteTipes (Request $request)
    {
        if($request->ajax()){

            $tipeName       = $request->input('tipeName');
            $tipehourRange  = $request->input('tipehourRange');
            $tipeColor      = $request->input('tipeColor');
            $tipeNote       = $request->input('tipeNote');

            if (empty($tipeName)) {
                return response()->json(['message'=>  'existe',
                                        'tittle'=>  'El campo de Tipo no puede quedar vacio ',
                                        'text' => 'No se ha guardado ningun dato']);
            }
            // entra aqui si esta editando un registro
            if ( !empty($request->input('editar')) ) $tipe_id = $request->input('editar');
            else $tipe_id = 0;

            $datos = Tipeshedule::where ('tipeName',$request->input('tipeName'))
                                ->where('tipehourRange',$request->input('tipehourRange'))
                                ->where('id','<>',$tipe_id)
                                ->first();

            if ($datos)
            {
                return response()->json(['message'=>  'existe',
                                        'tittle'=> 'El Tipo de ensayo '. $request->input('tipeName') .' ~ '. $request->input('tipehourRange'). ' ya se encontraba registrado en el sistema',
                                        'text' => 'no se ha guardado ningun dato']);

            }
            else return response()->json(['message'=>  'noExiste' ]);
        }

    }

//utilizado para almacenar los datos del compositor

    public function storeTipes (request $request)
    {

        if($request->ajax()){

            if ( empty($request->input('editar')) ) $tipe = new Tipeshedule();
            else $tipe = Tipeshedule::find($request->input('editar'));

            $tipe->tipeName      = $request->input('tipeName');
            $tipe->tipehourRange = ($request->input('tipehourRange') == null) ? '' : $request->input('tipehourRange');
            $tipe->tipeColor     = $request->input('tipeColor');
            $tipe->tipeNote      = $request->input('tipeNote');
            $tipe->save();

            return response()->json([
                'message'=>  true
            ]);

        }else return "esto no es ajax";

    }

// ELIMINAR obra de playlist

    public function deleteTipe(Request $request)
    {
        if ($request->ajax())
        {

            $id = $request->input('tipe_id');
            $tipe = Tipeshedule::find($id);
            $tipe->delete();

            return response()->json(['message'=>  true]);

        }
        else return "esto no es ajax";

    }

// Utilizado para comprobar si se repite el ROOM
    public function getexisteRooms (Request $request)
    {
        if($request->ajax()){

            $roomName       = $request->input('roomName');
            $roomAcronym    = $request->input('roomAcronym');

            if (empty($roomName) || empty($roomAcronym)) {
                return response()->json(['message'=>  'existe',
                                        'tittle'=>  'El campo de Nombre de sala o Acronimo no pueden quedar vacio ',
                                        'text' => 'No se ha guardado ningun dato']);
            }
            // entra aqui si esta editando un registro
            if ( !empty($request->input('editar')) ) $room_id = $request->input('editar');
            else $room_id = 0;

            $datos = Room::where ('roomName',$request->input('roomName'))
                                ->where('roomAcronym',$request->input('roomAcronym'))
                                ->where('id','<>',$room_id)
                                ->first();

            if ($datos)
            {
                return response()->json(['message'=>  'existe',
                                        'tittle'=> 'La sala de ensayo '. $request->input('roomName') .' ~ '. $request->input('roomAcronym'). ' ya se encontraba registrado en el sistema',
                                        'text' => 'no se ha guardado ningun dato']);

            }
            else return response()->json(['message'=>  'noExiste' ]);
        }

    }


//utilizado para almacenar los datos del ROOM

    public function storeRoom (request $request)
    {

        if($request->ajax()){

            if ( empty($request->input('editar')) ) $tipe = new Room();
            else $tipe = Room::find($request->input('editar'));

            $tipe->roomName      = $request->input('roomName');
            $tipe->roomAcronym = $request->input('roomAcronym');
            $tipe->roomColor     = $request->input('roomColor');
            $tipe->roomNote      = $request->input('roomNote');
            $tipe->save();

            return response()->json([
                'message'=>  true
            ]);

        }else return "esto no es ajax";

    }

    // utilizado para cambiar es que estado está el projecto Terminado o Proceso del SHEDULE

    public function changeState (request $request)
    {
        if($request->ajax()){

            //$season_id    = $request->input('season_id');
            $season_id    = session('SESSION_season_id');
            $event_id     = $request->input('event_id');
            $notes        = $request->input('notes');
            $projectLevel = 1;

            $project  = Project::where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->first();

            if ($project->projectProduccion == 'Proceso') {
                $project->projectProduccion = 'Terminado';
                $alertLevel  = 5 ;
                $alertNote   = 'El proyecto pasa a estado TERMINADO '.$notes;
            }
            else {
                $project->projectProduccion = 'Proceso';
                $alertLevel  = 6 ;
                $alertNote   = 'El proyecto se vuelve a poner en PROCESO '.$notes;
            }

            $user_id     = Auth::id();
            $alertModule = 'Producción (shedule)';
            $eventName   = $project->events->eventName ;

            $project->save();

            addAlert ($user_id,$eventName,$alertLevel,$alertNote,$alertModule);
            return response()->json([
                'message'=>  true,
                'projectArchivo'    => $project->projectArchivo,
                'projectArtistico'  => $project->projectArtistico,
                'projectProduccion' => $project->projectProduccion
            ]);

        }else return "esto no es ajax";
    }

}
