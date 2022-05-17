<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;
use App\Models\Contact;
use App\Models\Addressgroup;
use Illuminate\Support\Facades\Auth;


class AddressController extends Controller
{
    public function index()
    {
        $addresses      = Address::all();
        $addressgroups  = Addressgroup::orderBy('addressgroupName')->get();
        return view('admin.adresses.index',compact(['addresses','addressgroups']));
    }

    public function groupsAddress()
    {
        //$addressgroups = Addressgroup::all();
        $addresses      = Address::all();
        $addressgroups  = Addressgroup::orderBy('addressgroupName')->get();
        return view('admin.adresses.groupsAddress',compact(['addresses','addressgroups']));
    }

    // Obtiene datos para rellenar tabla dataTables
    public function getdataAddress(Request $request)
    {
        if($request->ajax())
        {
            $addresses = Address::with('addressgroups')->with('contacts')->get();
            return response()->json([
                    'data' => $addresses

            ]);
        }
    }

    // Utilizado para buscar nombre de departamento para la comprobación de NO repetición
    public function getexisteAddress(Request $request)
    {
        if($request->ajax()){
            $jsonaddressGroup = json_decode($request->input('jsonaddressGroup'));
            if (empty($jsonaddressGroup)) {
                return response()->json(['message'=>  'existe',
                                        'tittle'=>  'El campo de grupos no puede quedar vacio ',
                                        'text' => 'Ponga almenos un grupo']);
            }
        // entra aqui si esta editando un registro
            if ( !empty($request->input('editar')) ) $address_id = $request->input('editar');
            else $address_id = 0;

            $datos = Address::where ('addressfirstName',$request->input('addressfirstName'))
                                ->where('addresslastName',$request->input('addresslastName'))
                                ->where('id','<>',$address_id)
                                ->first();

            if ($datos)
            {
                return response()->json(['message'=>  'existe',
                                        'tittle'=> 'El contacto '. $request->input('addressfirstName') .' , '. $request->input('addresslastName'). ' ya se encuentra registrado en el sistema',
                                        'text' => 'no se han guardado los datos']);

            }
            else return response()->json(['message'=>  'noExiste' ]);

        }
    }

    //utilizado para almacenar los datos del contacto

    public function storeAddress (request $request)
    {

        if($request->ajax())
        {
            if ( empty($request->input('editar')) ) //entra aqui si es un nuevo contacto
            {
                $address = new Address();

                $address->addresslastName  = $request->input('addresslastName');
                $address->addressfirstName = $request->input('addressfirstName');
                $address->addressStreet    = $request->input('addressStreet');
                $address->addressNumber    = $request->input('addressNumber');
                $address->addressPlace     = $request->input('addressPlace');
                $address->addresszipCode   = $request->input('addresszipCode');
                $address->addressNotes     = $request->input('addressNotes');
                $address->save();

                $addressId = $address->id;
                if ( !empty($request->input('selectaddressGroup')) )
                {
                    $groups = json_decode($request->input('selectaddressGroup')); // para recibir el array-json
                    //$address->addressgroups()->detach();
                    foreach($groups as $group){
                        $address->addressgroups()->attach($group);
                    }
                }
                // guardo datos en Contacs si existen
                //if ( !empty(json_decode($request->input('contactJson'))) && !empty($request->input('editar'))) { // si hay datos de contats y no estas editando
                if ( !empty($request->input('contactJson')) )
                {
                    $contacts = json_decode($request->input('contactJson')); // para recibir el array-json
                    $orden = 1;

                    //if ( empty($request->input('editar')) ) $contactsDb = $address->contacts->get() ;
                    foreach($contacts as $key=>$contacto)
                    {
                        //if ( empty($request->input('editar')) ) $contact = new Contact();
                        //else $contact = $contactsDb;
                        $contact = new Contact();
                        switch ($key) {
                            case 'Móvil':
                                $contactoTipo = '5';
                            break;
                            case 'Teléfono':
                                $contactoTipo = '1';
                            break;
                            case 'Email':
                                $contactoTipo = '3';
                            break;
                            case 'Web':
                                $contactoTipo = '4';
                            break;
                            case 'Otros':
                                $contactoTipo = '2';
                            break;
                            default:
                                $contactoTipo = '2' ;
                            break;
                        }
                        $contact->address_id      = $addressId ;
                        $contact->contactOrder    = $orden ;
                        $contact->contactTipe     = $contactoTipo ;
                        $contact->contactNumber   = $contacto ;
                        $contact->save();
                        $orden++;
                    }
                    //if ( empty($request->input('editar')) ) $contactsDb->delete();
                }
                return response()->json(['message'=>  'El Contacto se ha modificado satisfactoriamente']);
            }else  //entra aqui si es una edicion de contacto
            {
                $address = Address::find($request->input('editar'));

                $address->addresslastName  = $request->input('addresslastName');
                $address->addressfirstName = $request->input('addressfirstName');
                $address->addressStreet    = $request->input('addressStreet');
                $address->addressNumber    = $request->input('addressNumber');
                $address->addressPlace     = $request->input('addressPlace');
                $address->addresszipCode   = $request->input('addresszipCode');
                $address->addressNotes     = $request->input('addressNotes');
                $address->save();
                // rellena el grupo
                if ( !empty($request->input('selectaddressGroup')) )
                {
                    $groups = json_decode($request->input('selectaddressGroup')); // para recibir el array-json
                    $address->addressgroups()->detach();
                    foreach($groups as $group){
                        $address->addressgroups()->attach($group);
                    }
                }
                // rellena los contacts
                if ( !empty($request->input('contactJson')) )
                {
                    $contacts = json_decode($request->input('contactJson')); // para recibir el array-json
                    $contactDbs = $address->contacts->pluck('id')->toArray();

                    $orden = 1;
                    foreach($contacts as $key=>$contacto)
                    {
                        $contact = new Contact();
                        switch ($key) {
                            case 'Móvil':
                                $contactoTipo = '5';
                            break;
                            case 'Teléfono':
                                $contactoTipo = '1';
                            break;
                            case 'Email':
                                $contactoTipo = '3';
                            break;
                            case 'Web':
                                $contactoTipo = '4';
                            break;
                            case 'Otros':
                                $contactoTipo = '2';
                            break;
                            default:
                                $contactoTipo = '2' ;
                            break;
                        }
                        $contact->address_id      = $request->input('editar') ;
                        $contact->contactOrder    = $orden ;
                        $contact->contactTipe     = $contactoTipo ;
                        $contact->contactNumber   = $contacto ;
                        $contact->save();
                        $orden++;
                    }
                    $borrado = '';
                    foreach($contactDbs as $key=>$contactDb)
                    {
                        //var_dump($contactDb);
                        $borrado= Contact::where('id',$contactDb)->delete();

                    }
                }
                return response()->json(['message'=>  'El Contacto se ha modificado satisfactoriamente', 'borrados' => $borrado]);
            }
        } else return "esto no es ajax";

    }

    //utilizado para rellenar los datos (de contacto) del ojito de los integrantes [telefono, dni, email]

    public function getdataContact (request $request)
    {
        $address_id = $request->input('address_id');
        $address = Address::where('id',$address_id)->with('contacts')->first();
        return response()->json([
                'address' => $address

        ]);
    }
    // ------------------- codigo para GROUPSADDRESS ---------------------------


    // Obtiene datos para rellenar tabla dataTables
    public function getdatagroupsAddress(Request $request)
    {
        if($request->ajax())
        {
            $groups = Addressgroup::all();
            return response()->json([
                    'data' => $groups

            ]);
        }
    }
    // Utilizado para buscar nombre de departamento para la comprobación de NO repetición
    public function getexistegroupsAddress(Request $request)
    {
        if($request->ajax()){
        // entra aqui si esta editando un registro
            if ( !empty($request->input('editar')) ) $groupsaddress_id = $request->input('editar');
            else $groupsaddress_id = 0;
            $datos = Addressgroup::where ('addressgroupName',$request->input('addressgroupName'))
                                ->orWhere('addressgroupCode',$request->input('addressgroupCode'))
                                ->where('id','<>',$groupsaddress_id)
                                ->first();
            if ($datos)
            {
                return response()->json(['message'=>  'existe',
                                        'tittle'=> 'El grupo '. $request->input('addressgroupName') .' , '. $request->input('addressgroupCode'). ' ya se encuentra registrado en el sistema',
                                        'text' => 'no se han guardado los datos']);
            }
            else return response()->json(['message'=>  'noExiste' ]);
        }
    }
    //utilizado para almacenar los datos del contacto

    public function storegroupsAddress (request $request)
    {
        if ( empty($request->input('editar')) ) //entra aqui si es un nuevo grupo de contacto
        {
            $groupaddress = new Addressgroup();
            $groupaddress->addressgroupName  = $request->input('addressgroupName');
            $groupaddress->addressgroupCode = $request->input('addressgroupCode');
            $groupaddress->save();

        }else{

            $groupaddress = Addressgroup::find($request->input('editar'));
            $groupaddress->addressgroupName  = $request->input('addressgroupName');
            $groupaddress->addressgroupCode  = $request->input('addressgroupCode');
            $groupaddress->save();
        }
        return response()->json(['message'=>  true,
                                'tittle'=> 'El grupo '. $request->input('addressgroupName') .' , '. $request->input('addressgroupCode'). ' se ha almacenado correctamente',
                                'text' => 'no se han guardado los datos']);

    }

    //utilizado para borrar el contacto

    public function deleteAddress (request $request)
    {
        if($request->ajax())
        {
            //$user_id     = Auth::id();
            //$alertModule = 'Libreta Direcciones';
            //$alertLevel  = 2 ;
            //$alertNote   = 'El contacto y todos los datos relacionados con el se han eliminado';
            $address_id   = $request->input('address_id');
            $address      = Address::find($address_id);
            $address_name = $address->addresslastName . ', ' . $address->addressfirstName;

            if ($address->projects->count() == 0 && $address->libraries->count() == 0) {
                $address->delete();
                if ($address == true){
                    //addAlert($user_id,$address_name,$alertLevel,$alertNote,$alertModule);
                    return response()->json([
                        'message'  => true,
                        'address_name' => $address_name
                    ]);
                }else {
                    return response()->json([
                        'message' => false,
                        'address_name' => 'No se ha podido eliminar el contacto, hable con el creador del software'
                    ]);
                }
            }else {
                return response()->json([
                    'message' => false ,
                    'address_name' => 'No se puede eliminar este contacto porque está siendo utilizado en algun proyecto'
                ]);

            }

        }
    }

}
