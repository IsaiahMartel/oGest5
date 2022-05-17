<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function getdataUser(request $request){

		if($request->ajax()){

		 	$user = User::with('roles')->get();

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

            $datos = User::where('email', $request->input('userEmail'))->where('id','<>',$season_id)->exists();

            if ($datos)
            {
                return response()->json(['message' => 'existe']);
            }
            else
                return response()->json(['message' => 'noExiste']);
        }
    }

    public function index()
    {
        $roles = Role::all();
        return view('admin.users.index',compact('roles'));

    }

     // guarda cambios en tabla User
     public function storeUser (Request $request)
     {

         if($request->ajax()){

             if ( empty($request->input('editar')) ) {
                 $user = new User();
             }else $user = User::find($request->input('editar'));

             $user->name     = $request->input('userName');
             $user->email    = $request->input('userEmail');
             if ($request->input('password') != '') $user->password = bcrypt($request->input('password'));
             $user->save();

             $roles = json_decode($request->input('roles')); // para recibir el array-json
             //$user->roles()->detach();
             $user->syncRoles($roles);
             //$user->assignRole($roleAdmin); // asigno el ROL a el Usuario

             return response()->json([
                     'message'=>  'true'

             ]);

         }else return "esto no es ajax";

     }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function permission()
    {
        $roles      = Role::all() ;
        return view('admin.users.permission',compact('roles'));
    }

    public function getdataPermission()
    {
        $permission = Permission::with('roles')->get();


        return response()->json([
            'data' => $permission
        ]);
    }


    // guarda cambios en tabla permission
    public function storePermission (Request $request)
    {
        if($request->ajax()){
            if ( empty($request->input('editar')) ) $permission = new Permission();
            else $permission = Permission::find($request->input('editar'));
            $permission->name       = $request->input('name');
            $permission->guard_name = $request->input('guard_name');
            $permission->save();

            $roles = json_decode($request->input('roles')); // para recibir el array-json
            //$permission->removeRole($roles);
            $permission->roles()->detach();
            $permission->assignRole($roles);


            return response()->json([
                    'message'=>  'true'

            ]);
        }else return "esto no es ajax";

    }

    // Utilizado para buscar RUTA para la comprobación de NO repetición
    public function getexistePermission(Request $request)
    {
        if($request->ajax()){

        // entra aqui si esta editando un registro
            if ( !empty($request->input('editar')) ) $permission_id = $request->input('editar');
            else $permission_id = 0;

            $datos = Permission::where ('name',$request->input('name'))
                                ->where('id','<>',$permission_id)
                                ->first();

            if ($datos)
            {
                return response()->json(['message'=>  'existe',
                                        'tittle'=> 'El permiso de ruta '. $request->input('name') .' ya se encuentra registrado en el sistema',
                                        'text' => 'no se han guardado los datos']);

            }
            else return response()->json(['message'=>  'noExiste' ]);

        }
    }


}
