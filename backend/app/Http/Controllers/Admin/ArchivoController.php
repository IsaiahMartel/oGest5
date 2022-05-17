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
use App\Models\Address;
use Illuminate\Database\Eloquent\Collection;
use Spatie\Permission\Models\Permission;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use SebastianBergmann\Environment\Console;

class ArchivoController extends Controller
{
    public function index()
    {
        $composers = Composer::all();
        $catalogs  = Library::all();
        return view('admin.archivo.index',compact(['composers','catalogs']));
    }

    public function getdataWork(Request $request)
    {
        if($request->ajax())
        {
            $user     = auth()->user();
            $selectIdComposer = $request->input('selectIdComposer');
            $works = Work::with('composers')->with('voices')->with('keyboards')->with('percussions')->with('libraries')->with('libraries.addresses')->Where('composer_id', $selectIdComposer)->get();
            $permission = $user->hasPermissionTo('edit:admin/archivo');

            $works->map(function($work) use ($permission){

                return $work->permission = $permission;
            });
            //var_dump($works);
            //var_dump($user->hasPermissionTo('edit:admin/archivo'));
            return response()->json([
                    'data' => $works

            ]);
        }
    }
    public function workAdd()
    {
        $composers = Composer::all();
        $addresses = Address::all();
        //$works = Work::
        //$catalogs  = Library::all();
        $instrumentos = ['Flauta','Trompa','Timpani','Arpa','Oboe','Trompeta','Percusión','Teclado','Clarinete','Trombón','Extra','Voces','Fagot','Tuba',];
        $instruments = ['flute','horn','timpani','harp','oboe','trumpet','percussion','keyboard','clarinet','trombone','extra','vocals','bassoon','tuba',];
        return view('admin.archivo.workAdd',compact(['composers','instrumentos','instruments','addresses']));
    }

    // se usa para dirigir a composer crear Director
    public function composer() {
        $composers = Composer::all();
        return view('admin.archivo.composer',compact(['composers']));
    }

    // Utilizado para buscar nombre de departamento para la comprobación de NO repetición
    public function getexisteWork(Request $request)
    {
        if($request->ajax()){

            $workName = $request->input('workName');
            $composer_id = $request->input('composer_id');

            // entra aqui si esta editando un registro
            if (!empty($request->input('editar'))) $work_id = $request->input('editar');
            else $work_id = 0;

            if ($workName == '') {
                return response()->json(['message'=>  'existe',
                                        'tittle'=>  'El campo de "Nombre de Obra" no puede quedar vacio ',
                                        'text' => 'Ponga el titulo de la obra']);
            }

            $work = Work::whereHas('composers', function ($query) use ($composer_id) {
                $query->where('id', $composer_id);
            })->where('workName',$workName)->where('id','<>',$work_id)->first();

            if ($work)
            {
                return response()->json(['message'=>  'existe',
                                        'tittle'=> 'La obra '. $workName . ' ya se encontraba en el sistema ',
                                        'text' => 'no se han guardado los datos']);
            }
            else return response()->json(['message'=>  'noExiste' ]);

        }

    }

    // Guarda el ORDEN de las obras (SOLO ORDEN)
    public function storeOrder(Request $request)
    {
        if ($request->ajax())
        {

            $ids = json_decode($request->input('ids_order'));
            $orden = 0;
            foreach ($ids as $id => $value) {
                $orden++;
                $playlist  = Playlist::find($value);
                $playlist->playlistOrder  = $orden;
                $playlist->save();
            }

            return response()->json(['message'=>  true]);

        }
        else return "esto no es ajax";

    }
    // ELIMINAR obra de playlist
    public function deletePlaylist(Request $request)
    {
        if ($request->ajax())
        {
            $id = $request->input('playlist_id');
            $playlist = Playlist::find($id);
            $playlist->delete();

            return response()->json(['message'=>  true]);

        }
        else return "esto no es ajax";

    }
    // ELIMINAR obra de WORKS
    public function deleteWork(Request $request)
    {
        if ($request->ajax())
        {
            try {
                //Eliminar registro
                $id = $request->input('work_id');
                $work = Work::find($id);
                $resultado = $work->delete();
                $resultado = true ;
                $status    = 'Obra eliminada';
            } catch (\Exception $e) {
                $resultado = false ;
                $status    = 'Obra utilizada en algun proyecto, imposible de eliminar';
            }
            //Retornar vista
            return response()->json([
                'text'   =>  $status,
                'message'=>  $resultado]);

            // $id = $request->input('work_id');
            // $work = Work::find($id);
            // $resultado = $work->delete();

            // return response()->json([
            //     'message'=>  $resultado]);

        }else return "esto no es ajax";
    }

// Guardar una Obra


    public function storeWork(Request $request)
    {
        if ($request->ajax())
        {

            parse_str( $_POST[ 'datosSerialize' ],$datos );
            //var_dump ($datos['selectComposer']);
            $recep=$datos['editar'];
            if ( empty($datos['editar']) ) {
                $work  = new Work();
                $text  = 'Los datos se han almacenado correctamente';
            }else {
                $work = Work::find($recep);
                $text  = 'Recuerde que para ver los cambios en la pagina principal, tendras que refrescar';
            }

            $percussions    = json_decode($request->input('JsonPercussions'));
            $keyboards      = json_decode($request->input('JsonKeyboards'));
            $voices         = json_decode($request->input('JsonVoices'));

            $percussion_id  =[];
            $keyboard_id    =[];
            $voice_id       =[];

            //guardo campos de Work
            foreach ($datos as $campo => $valor) {
                if ($valor =='') $valor = null ;
                if ($campo != 'editar' && substr($campo,0,7) != 'library' && $campo != 'playlistString') $work->$campo  = $valor;
            }

            $resultadoWork = $work->save();
            $editar        = $work->id;

            //detecto si hay datos en la seccion de archivo para crear un registro en Libraries (DB)
            if ( !$work->libraries()->first() ) // entra si no hay registro de Archivo (library) creado/asociado
            {
                if ( isset($datos['libraryParts'])  || !empty($datos['libraryStrings'])      || !empty($datos['libraryInstrumentation']) || !empty($datos['libraryCatalog'])
                || isset($datos['libraryWwdouble']) || isset($datos['librarystringMasters']) || isset($datos['libraryPermanent'])        || !empty($datos['libraryMaterial']) || !empty($datos['libraryNote'])
                || isset($datos['libraryCompra'])   || isset($datos['libraryAlquiler']) )
                {

                    $library = new Library();

                    // gusrdo los datos en Libraries si es que existen
                    $library->libraryParts         = 0 ;
                    $library->libraryWwdouble      = 0 ;
                    $library->librarystringMasters = 0 ;
                    $library->libraryPermanent     = 0 ;
                    $library->libraryCompra        = 0 ;
                    $library->libraryAlquiler      = 0 ;

                    foreach ($datos as $campo => $valor) {
                        if (substr($campo,0,7) == 'library') {
                            if ($campo == 'libraryaddress_id') $campo = 'address_id' ;
                            if ($campo == 'libraryCompra' || $campo == 'libraryAlquiler' || $campo == 'libraryParts' || $campo == 'libraryWwdouble' || $campo == 'librarystringMasters' || 	$campo =='libraryPermanent' && $valor=='on') $valor = 1;
                            $library->$campo = $valor;
                        }
                    }
                    $library->work_id = $work->id ;
                    $library->save();

                }

            } else {
                $library = $work->libraries()->first();

                    // gusrdo los datos en Libraries si es que esxisten
                    $library->libraryParts         = 0 ;
                    $library->libraryWwdouble      = 0 ;
                    $library->librarystringMasters = 0 ;
                    $library->libraryPermanent     = 0 ;
                    $library->libraryCompra        = 0 ;
                    $library->libraryAlquiler      = 0 ;
                    foreach ($datos as $campo => $valor) {
                        if (substr($campo,0,7) == 'library') {
                            if ($campo == 'libraryaddress_id') $campo = 'address_id' ;
                            if ($campo == 'libraryCompra' || $campo == 'libraryAlquiler' || $campo == 'libraryParts' || $campo == 'libraryWwdouble' || $campo == 'librarystringMasters' || 	$campo =='libraryPermanent' && $valor=='on') $valor = 1;
                            $library->$campo = $valor;
                        }
                    }

                    $library->work_id = $work->id ;
                    $library->save();
                }

            foreach ($percussions as $percussion => $valor) {
                $percussion_id[] = $valor->id;
            };
            foreach ($keyboards as $keyboard => $valor) {
                $keyboard_id[] = $valor->id;
            };

            foreach ($voices as $voice => $valor) {
                $voice_id[] = $valor->id;
            };

            $work->percussions()->sync($percussion_id);
            $work->keyboards()->sync($keyboard_id);
            $work->voices()->sync($voice_id);

            // $work->percussions()->attach($percussion_id);
            // $work->keyboards()->attach($keyboard_id);
            // $work->voices()->attach($voice_id);

            return response()->json(['message'=>  true ,
                                     'editar' => $editar,
                                     'text'   => $text,
                                     'recep' => $recep]);

        } else return "esto no es ajax";


    }
// Editar Obra

    public function workEdit($id)
    {
        $addresses = Address::all();
        $composers = Composer::all();
        $work = Work::with('libraries')->find($id);
        $selectedComposer = $work->composers->id;

        if (isset($work->libraries)) $selectedAddress = $work->libraries->address_id;
        else $selectedAddress=null;
        $instrumentos = ['Flauta','Trompa','Timpani','Arpa','Oboe','Trompeta','Percusión','Teclado','Clarinete','Trombón','Extra','Voces','Fagot','Tupa',];
        $instruments = ['flute','horn','timpani','harp','oboe','trumpet','percussion','keyboard','clarinet','trombone','extra','vocals','bassoon','tuba',];

        //var_dump ($work);
        return view('admin.archivo.workEdit',compact(['work','composers','selectedComposer','selectedAddress','instrumentos','instruments','addresses']));
    }

// abre ventana de gestion del arvivo LA PRINCIPAL

    public function gestArchivo(Request $request)
    {
        //$season  = Season::find(session('SESSION_season_id'));
        // prueba para controlar la session
        if ($request->session()->has('SESSION_season_id')) {
            $projectLevel   = 1;
            $season_id      = session('SESSION_season_id');
            $season         = Season::find($season_id);
            $seasonSelected = $season->seasonName;
            $composers      = Composer::all();
            $projects       = Project::with('events')->with('seasons')->where('season_id',$season_id)->where('projectLevel',$projectLevel)->get();
            $configString   = Season::find($season_id)->configs()->first() ;

            $events  = collect($projects)->map(function ($project) {
                return [
                    'id' => $project->events->id ,
                    'eventName' => $project->events->eventName
                ];
            })->sortBy('eventName');
            $instrumentos = ['Flauta','Trompa','Timpani','Arpa','Oboe','Trompeta','Percusión','Teclado','Clarinete','Trombón','Extra','Voces','Fagot','Tuba',];
            $instruments = ['flute','horn','timpani','harp','oboe','trumpet','percussion','keyboard','clarinet','trombone','extra','vocals','bassoon','tuba',];
            return view('admin.archivo.gest',compact(['composers','seasonSelected','projects','events','instrumentos','instruments','configString']));
        }else {
            return redirect('admin/');
        }
    }

    public function getdataInstrument(Request $request)
    {
        //filtro = $request->input('filtro');
        $instruments= Instrument::all();
        return response()->json(['instruments'=>  $instruments ]);
    }

// se usa para almacenar los datos en PLaylist desde WORK (cuando se inserta obra en el proyecto)
    public function storePlaylist(Request $request)
    {
        if ($request->ajax())
        {
            $work = json_decode($request->input('datosSerialize'));

            //$season_id    = $request->input('season_id');
            $season_id    = session('SESSION_season_id');
            $event_id     = $request->input('event_id');
            $projectLevel = $request->input('projectLevel');

            $project    = Project::where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->first();
            $project_id = $project->id ;

            $playlists  = Playlist::Where('project_id',$project_id)->get();
            if (empty($playlists)) $playlistOrde = 1;
                else $playlistOrder = $playlists->max('playlistOrder');
            $playlist = new Playlist();

            if ($work->workName== 'PAUSA') { // estra si es PAUSA
                $playlist->playlistOrder  = $playlistOrder + 1;
                $playlist->project_id  = $project_id ;
                $playlist->workName = 'PAUSA';
                $playlist->save();
                return response()->json(['message'=>  true ,
                                     'playlist_id' => $playlist->id,
                                     'orden' => $playlist->playlistOrder]);

            }else {

            $campos=["composer_id","workName","workDuration","flute","fluteExp","oboe","oboeExp",
            "clarinet","clarinetExp","bassoon","bassoonExp","horn","hornExp","trumpet","trumpetExp","trombone","tromboneExp","tuba","tubaExp","timpani"
            ,"timpaniExp","harp","harpExp",'percussion','percussionExp','keyboard','keyboardExp','extra','extraExp','vocals','vocalsExp'] ;

            //Almaceno en la base de datos
            foreach ($campos as $campo) {
                $playlist->$campo = $work->$campo ;
            }
            $playlist->work_id     = $work->id ;
            $playlist->project_id  = $project_id ;
            //$playlist->playlistString = $work->violin1.','.$work->violin2.','.$work->viola.','.$work->cello.','.$work->bass;
            $playlist->playlistString = $work->violin1.'/'.$work->violin2.'/'.$work->viola.'/'.$work->cello.'/'.$work->bass;
            $playlist->playlistOrder  = $playlistOrder + 1;
            $playlist->save();

            //guardo datos en las tablas relacionadas [perplaylist, keyplaylist,voiplaylist]

            foreach ($work->percussions as $key => $value) {
                $percussions_id[] = $value->id;
            }
            foreach ($work->keyboards as $key => $value) {
                $keyboards_id[] = $value->id;
            }
            foreach ($work->voices as $key => $value) {
                $voices_id[] = $value->id;
            }

            if (isset($percussions_id)) $playlist->perplaylists()->sync($percussions_id);
            if (isset($keyboards_id)) $playlist->keyplaylists()->sync($keyboards_id);
            if (isset($voices_id)) $playlist->voiplaylists()->sync($voices_id);


        }
            return response()->json(['message'=>  true ,
                                     'playlist_id' => $playlist->id,
                                     'orden' => $playlist->playlistOrder]);
        }
        else return "esto no es ajax";

    }

    // se usa para guardar los datos en playlist cuando se está EDITANDO desde la lista de obras
    public function editPlaylist(Request $request)
    {
        if ($request->ajax())
        {
            //$playlist_in    = $request->input('datosSerialize');
            parse_str( $_POST[ 'datosSerialize' ],$playlist_in );

            $playlist_id   = $request->input('playlist_id');
            $percussions   = json_decode($request->input('JsonPercussions'));
            $keyboards     = json_decode($request->input('JsonKeyboards'));
            $voices        = json_decode($request->input('JsonVoices'));
            $playlist = Playlist::find($playlist_id);
            //var_dump ($percussions);

            $campos=["flute","fluteExp","oboe","oboeExp",
            "clarinet","clarinetExp","bassoon","bassoonExp","horn","hornExp","trumpet","trumpetExp","trombone","tromboneExp","tuba","tubaExp","timpani"
            ,"timpaniExp","harp","harpExp",'percussion','percussionExp','keyboard','keyboardExp','extra','extraExp','vocals','vocalsExp','playlistString','workDuration'] ;

            //Almaceno en la base de datos
                foreach ($campos as $campo) {

                    $playlist->$campo = ($playlist_in[$campo] == '' ) ? null : $playlist_in[$campo];
                    if ($campo == 'playlistString') $playlist->$campo = str_replace(',', '/', $playlist->playlistString);

                }
                $playlist->save();

                //guardo datos en las tablas relacionadas [perplaylist, keyplaylist,voiplaylist]

                foreach ($percussions as $key => $value) {
                    $percussions_id[] = $value->id;
                }
                foreach ($keyboards as $key => $value) {
                    $keyboards_id[] = $value->id;
                }
                foreach ($voices as $key => $value) {
                    $voices_id[] = $value->id;
                }

                if (isset($percussions_id)) $playlist->perplaylists()->sync($percussions_id);
                else $playlist->perplaylists()->detach();
                if (isset($keyboards_id))   $playlist->keyplaylists()->sync($keyboards_id);
                else $playlist->keyplaylists()->detach();
                if (isset($voices_id)) $playlist->voiplaylists()->sync($voices_id) ;
                else $playlist->voiplaylists()->detach() ;



            return response()->json(['message'=>  true ,
                                     'playlist_id' => $playlist->id,
                                     'orden' => $playlist->playlistOrder]);

        }
        else return "esto no es ajax";

    }

        // se usa para guardar los datos en playlist cuando se está EDITANDO desde la lista de obras
        public function guardaCuerda(Request $request)
        {
            if ($request->ajax())
            {

                $playlist_id    = $request->input('playlist_id');
                $cuerda         = $request->input('cuerda');
                $event_id       = $request->input('event_id');
                $playlist       = Playlist::find($playlist_id);
                $workName       = $playlist->works->workName;
                $user_id        = Auth::id();
                $eventName      = Event::find($event_id)->eventName ;
                $alertLevel     = 7;
                $alertNote      = 'Se ha modificado la cuerda de '.$workName.' a: '.$cuerda;
                $alertModule    = 'Artistico (cambio de cuerda)';

                //Almaceno en la base de datos
                $cuerda = str_replace(',', '/', $cuerda);
                $playlist->playlistString =  $cuerda ;
                $playlist->save();
                addAlert ($user_id,$eventName,$alertLevel,$alertNote,$alertModule);
                return response()->json(['message'=>  true ,
                                         'playlist_id' => $playlist->id,
                                         'cuerda' => $request->input('cuerda')]);

            }
            else return "esto no es ajax";

        }

    public function getdataEvent(Request $request)
    {
        if ($request->ajax())
        {
            //$selectSeasonId = $request->input('selectSeasonId');
            $selectSeasonId    = session('SESSION_season_id');
            $projectLevel = $request->input('projectLevel');
            //$projects = Project::with('events')->Where('season_id',$selectSeasonId)->get();
            $projects = Project::with('events')->with('seasons')->where('season_id',$selectSeasonId)->where('projectLevel',$projectLevel)->get();
            return response()->json([
                'projects'    => $projects,
            ]);
        }
    }

    public function cargaPlaylist(Request $request)
    {
        if ($request->ajax())
        {
            //$season_id    = $request->input('season_id');
            $season_id    = session('SESSION_season_id');
            $event_id     = $request->input('event_id');
            $playlist_id  = $request->input('playlist_id');
            $projectLevel = ($request->input('projectLevel') == 10)? 1 : $request->input('projectLevel');
            $project      = Project::with('playlists')->where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->first();
            if (isset($playlist_id) ) $playlists  = Playlist::find($playlist_id);
            else $playlists  = Playlist::where('project_id',$project->id)->with('works')->with('works.composers')->orderBy('playlistOrder')->get();

            return response()->json([
                'message'    => true,
                'playlists'  => $playlists,
                'project_id' => $project->id
            ]);

        }
    }

    // Usado para cargar la instrumentacion de PlayList en Archivo cuando van a editar una obra
    public function loaddataPlaylist(Request $request)
    {
        if($request->ajax())
        {
            $playlist_id = $request->input('playlist_id');

            $playlist = Playlist::with('perplaylists')->with('keyplaylists')->with('voiplaylists')->Where('id', $playlist_id)->first();
            $work_id  = $playlist->works->id ;
            return response()->json([
                    'message' => true,
                    'playlist' => $playlist ,
                    'work_id' => $work_id

            ]);
        }
    }

    // Usado para comprobar si WORK tiene datos o está todo en NULL
    public function existeDatosEnWork(Request $request)
    {
        if($request->ajax())
        {
            $work_id = $request->input('work_id');

            $work = Work::find($work_id);
            $campos=["flute","fluteExp","oboe","oboeExp",
            "clarinet","clarinetExp","bassoon","bassoonExp","horn","hornExp","trumpet","trumpetExp","trombone","tromboneExp","tuba","tubaExp","timpani"
            ,"timpaniExp","harp","harpExp",'percussion','percussionExp','keyboard','keyboardExp','extra','extraExp','vocals','vocalsExp','playlistString','workDuration'] ;

        //Almaceno en la base de datos
        $vacio = 0;
        foreach ($campos as $campo) {
            if ($work->$campo == null) $vacio += 0;
            else $vacio += 1;
        }
        if ($vacio > 0) $message = true;
         else $message = false;
        return response()->json([
                'message' => $message,
                'work_id' => $work_id
        ]);

        }

    }


// Obtiene datos para rellenar tabla dataTables
    public function getdataComposer(Request $request)
    {
        if($request->ajax())
        {
            $composers = Composer::all();
            return response()->json([
                    'data' => $composers

            ]);
        }
    }


// Utilizado para buscar compositor
    public function getexisteComposer(Request $request)
    {
        if($request->ajax()){
            $composerLastname  = $request->input('composerLastname');
            $composerFirstname = $request->input('composerFirstname');
            $composerBirthYear = $request->input('composerBirthYear');
            $composerDeathyear = $request->input('composerDeathyear');

            if (empty($composerLastname)) {
                return response()->json(['message'=>  'existe',
                                        'tittle'=>  'El campo de Apellidos no puede quedar vacio ',
                                        'text' => 'No se ha guardado ningun dato']);
            }
        // entra aqui si esta editando un registro
            if ( !empty($request->input('editar')) ) $composer_id = $request->input('editar');
            else $composer_id = 0;

            $datos = Composer::where ('composerLastname',$request->input('composerLastname'))
                                ->where('composerFirstname',$request->input('composerFirstname'))
                                ->where('id','<>',$composer_id)
                                ->first();

            if ($datos)
            {
                return response()->json(['message'=>  'existe',
                                        'tittle'=> 'El compositor '. $request->input('composerFirstname') .' , '. $request->input('composerLastname'). ' ya se encontraba registrado en el sistema',
                                        'text' => 'no se ha guardado ningun dato']);

            }
            else return response()->json(['message'=>  'noExiste' ]);

        }
    }
//utilizado para almacenar los datos del compositor

    public function storeComposer (request $request)
    {
        if($request->ajax()){

            if ( empty($request->input('editar')) ) $composer = new Composer();
            else $composer = Composer::find($request->input('editar'));
            $composer->composerLastname  = $request->input('composerLastname');
            $composer->composerFirstname = $request->input('composerFirstname');
            $composer->composerBirthYear = $request->input('composerBirthYear');
            $composer->composerDeathyear = $request->input('composerDeathyear');
            $composer->save();

            return response()->json([
                'message'=>  true
            ]);

        }else return "esto no es ajax";
    }
    // utilizado para ver es que estado está el projecto Terminado o Proceso

    public function cargaEstado (request $request)
    {
        if($request->ajax()){
            //$season_id    = $request->input('season_id');
            $season_id    = session('SESSION_season_id');
            $event_id     = $request->input('event_id');
            $projectLevel = 1;

            $project  = Project::where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->first();
            return response()->json([
                'message'=>  true,
                'projectArchivo'    => $project->projectArchivo,
                'projectArtistico'  => $project->projectArtistico,
                'projectProduccion' => $project->projectProduccion
            ]);

        }else return "esto no es ajax";
    }
    // utilizado para cambiar es que estado está el projecto Terminado o Proceso

    public function changeState (request $request)
    {
        if($request->ajax()){

            //$season_id    = $request->input('season_id');
            $season_id    = session('SESSION_season_id');
            $event_id     = $request->input('event_id');
            $notes     = $request->input('notes');
            $projectLevel = 1;

            $project  = Project::where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->first();
            $eventName   = $project->events->eventName ;
            //var_dump($project->events->eventName);
            if ($project->projectArchivo == 'Proceso') {
                $project->projectArchivo = 'Terminado';
                $alertLevel  = 5 ;
                $alertNote   = 'El proyecto pasa a estado TERMINADO por el dep. ARCHIVO, '.$notes;
            }
            else {
                $project->projectArchivo = 'Proceso';
                $alertLevel  = 6 ;
                $alertNote   = 'El proyecto se vuelve a poner en PROCESO por el dep. ARCHIVO, '.$notes;
            }

            $project->save();

            $user_id     = Auth::id();
            $alertModule = 'Archivo (obras y plantillas)';

            addAlert ($user_id,$eventName,$alertLevel,$alertNote,$alertModule);
            return response()->json([
                'message'=>  true,
                'projectArchivo'    => $project->projectArchivo,
                'projectArtistico'  => $project->projectArtistico,
                'projectProduccion' => $project->projectProduccion
            ]);

        }else return "esto no es ajax";
    }

    // Usado para cargar la instrumentacion de PlayList (per, key, voi en TERMINADOS)
    public function loaddataPlaylistTerminado(Request $request)
    {
        if($request->ajax())
        {
            $projectLevel = $request->input('projectLevel');
            //$season_id = $request->input('season_id');
            $season_id    = session('SESSION_season_id');
            $event_id = $request->input('event_id');

            $project  = Project::where('season_id',$season_id)->where('event_id',$event_id)->where('projectLevel',$projectLevel)->first();
            $playlists    = $project->playlists;

            if ($project->playlists->count() == 0) {
                return response()->json([
                    'message' => true,
                    'percussions' => '' ,
                    'keyboards' => '' ,
                    'voices' => ''

                ]);
            }

            $perplaylists = new Collection();
            $keyplaylists = new Collection();
            $voiplaylists = new Collection();


            foreach ($playlists as $key => $playlist) {
                $perplaylists = $perplaylists->merge($playlist->perplaylists);
                $keyplaylists = $keyplaylists->merge($playlist->keyplaylists);
                $voiplaylists = $voiplaylists->merge($playlist->voiplaylists);
            };

            $percussions =  collect($perplaylists)->map(function ($percussion) {
                return
                [
                    'instrumentName'  => $percussion->instrumentName
                ];
            });
            $keyboards =  collect($keyplaylists)->map(function ($keyboard) {
                return
                [
                    'instrumentName'  => $keyboard->instrumentName
                ];
            });
            $voices =  collect($voiplaylists)->map(function ($voice) {
                return
                [
                    'instrumentName'  => $voice->instrumentName
                ];
            });
            //$playlist_id =  $project->playlists ;
            //$playlist = Playlist::with('perplaylists')->with('keyplaylists')->with('voiplaylists')->Where('id', $playlist_id)->first();
            //$work_id  = $playlist->works->id ;
            return response()->json([
                    'message' => true,
                    'percussions' => $percussions ,
                    'keyboards' => $keyboards ,
                    'voices' => $voices

            ]);

        }

    }

}
