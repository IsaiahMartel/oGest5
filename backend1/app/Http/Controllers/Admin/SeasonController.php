<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Season;
use App\Models\Config;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class SeasonController extends Controller
{
    public function index()
    {
        $seasons = Season::all();
        //return $seasons;
        return view('admin.seasons.index');
    }

    public function create()
    {
        return view('admin.seasons.create');
    }

    public function show($season)
    {
        // compact('season'); -> // ['curso' -> $curso]
        return view('admin.seasons.show' , compact('season'));

    }

    // Obtiene datos para rellenar tabla dataTables
    public function getdaSeason(Request $request)
    {
        if($request->ajax())
        {
            $seasons = Season::with('configs')->get();
            return response()->json([
                    'data' => $seasons
            ]);
        }
    }

    // compruebo que no se solape la fecha de inicio con alfuna fecha de inicio de ora temporada

    public function getsolapeSeason(Request $request)
    {
        if($request->ajax()){
            // entra aqui si esta editando un registro
            if (!empty($request->input('editar')))
                $season_id= $request->input('editar');
            else
                $season_id = 0;

            $datepickerIni = substr($request->input('daterange'), 0, 10);
            $datepickerEnd = substr($request->input('daterange'), 13);

            $dateIni= Carbon::createFromFormat( 'd/m/Y', $datepickerIni)->format('Y-m-d');
            $dateEnd= Carbon::createFromFormat( 'd/m/Y', $datepickerEnd)->format('Y-m-d');

            $datos = Season::where('id','<>',$season_id)->where(function($query) use ($dateIni,$dateEnd)
            {
                $query->whereBetween('seasonDateIni',[$dateIni, $dateEnd])
                      ->orWhereBetween('seasonDateEnd',[$dateIni, $dateEnd]);
            })->exists();

            //return response()->json(['message' => $datos]);
            if ($datos)
            {
                return response()->json(['message' => 'solapa']);
            }
            else
                return response()->json(['message' => 'noSolapa']);
        }
    }

    // Utilizado para buscar nombre de temporada para la comprobación de NO repetición
    public function getexisteSeason(Request $request)
    {
        if($request->ajax()){
            // entra aqui si esta editando un registro
            if (!empty($request->input('editar')))
                $season_id= $request->input('editar');
            else
                $season_id = 0;
            $datos = Season::where ('seasonName', $request->input('seasonName'))->where('id','<>',$season_id)->exists();

            if ($datos)
            {
                return response()->json(['message' => 'existe']);
            }
            else
                return response()->json(['message' => 'noExiste']);
        }
    }
    // guarda cambios en tabla Season
    public function storeSeason (Request $request)
    {
        if($request->ajax()){

            $datepickerIni = substr($request->input('daterange'), 0, 10);
            $datepickerEnd = substr($request->input('daterange'), 13);

            if ( empty($request->input('editar')) ) {
                $season = new Season();
                $config = new Config ;
            }
            else {
                $season = Season::find($request->input('editar'));
                $config = Config::where('season_id',$season->id)->first();
            }
            $dateIni= Carbon::createFromFormat( 'd/m/Y', $datepickerIni)->format('Y-m-d');
            $dateEnd= Carbon::createFromFormat( 'd/m/Y', $datepickerEnd)->format('Y-m-d');

            $season->seasonName     = $request->input('seasonName');
            $season->seasonNote 	= $request->input('seasonNote');
            $season->seasonDateIni 	= $dateIni;
            $season->seasonDateEnd 	= $dateEnd;

            $season->save();

            // guardo en la tabla relacionada 1 a 1
            $config->configCompleta  = $request->input('configCompleta');
            $config->configReducida  = $request->input('configReducida');
            $config->configSin       = $request->input('configSin');
            $config->configPd        = $request->input('configPd');
            $config->configTitular   = $request->input('configTitular');

            $season->configs()->save($config);

            $alertLevel  = 1 ;
            $alertNote   = 'Se ha creado la TEMPORADA '.$request->input('seasonName');
            $user_id     = Auth::id();
            $alertModule = 'Artistico';

            addAlert($user_id,'',$alertLevel,$alertNote,$alertModule);
            return response()->json([
                    'message'=>  'true'

            ]);
        }else return "esto no es ajax";

    }


}
