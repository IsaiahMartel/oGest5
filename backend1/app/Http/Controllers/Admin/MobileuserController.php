<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mobile;

class MobileuserController extends Controller
{
    public function index()
    {
        return view('admin.movil.index');

    }

    public function getdataMobile(request $request){

		if($request->ajax()){

		 	$user = Mobile::all();

		    return response()->json([
                    'data' => $user

        ]);
		}
	}

    // Utilizado para buscar nombre de usuario (correo-e) para la comprobación de NO repetición
    public function getexisteEmail(Request $request)
    {
        if($request->ajax()){
            // entra aqui si esta editando un registro
            if (!empty($request->input('editar')))
                $season_id= $request->input('editar');
            else
                $season_id = 0;

            $datos = Mobile::where('mobileEmail', $request->input('mobileEmail'))->where('id','<>',$season_id)->exists();

            if ($datos)
            {
                return response()->json(['message' => 'existe']);
            }
            else
                return response()->json(['message' => 'noExiste']);
        }
    }

     // guarda cambios en tabla Mobile
     public function storeMobile (Request $request)
     {

        if ($request->ajax()) {

            if (empty($request->input('editar'))) {
                $user = new Mobile();
            } else $user = Mobile::find($request->input('editar'));

            $user->mobileName     = $request->input('mobileName');
            $user->mobileEmail    = $request->input('mobileEmail');
            if ($request->input('password') != '') $user->password = bcrypt($request->input('password'));
            $user->save();

            return response()->json([
                'message' =>  'true'

            ]);
        } else return "esto no es ajax";

     }

    // Utilizado para eliminar un Usuario Movil
    public function deleteuserMobile(Request $request)
    {
        if($request->ajax()){
            // entra aqui si esta editando un registro
            $mobile_id = $request->input('mobile_id');

            $datos = Mobile::find($mobile_id)->delete();

            if ($datos)
            {
                return response()->json([
                'message' => true ,
                'texto' => 'Evento eliminado correctamente',
                'texto2' => '']);
            }
            else
                return response()->json([
                'message' => false ,
                'texto' => 'Ha ocurrido un error y no he podido borrar el evento',
                'texto2' => 'Contacte con el creador del Software']);
        }
    }
}
