<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Project;

class EventController extends Controller
{
    public function index()
    {
        //$events = Event::all();
        //return $seasons;
        return view('admin.events.index');

    }

    public function getdaEvent(Request $request)
    {

        if($request->ajax())
        {

            $events = Event::all();

            return response()->json([
                    'data' => $events

            ]);


        }

    }

    // guarda cambios en tabla Event
    public function storeEvent (Request $request)
    {

        if($request->ajax()){

            if ( empty($request->input('editar')) ) $events = new Event();
            else $events = Event::find($request->input('editar'));

            $events->eventName      = $request->input('eventName');
            $events->eventNote 	    = $request->input('eventNote');
            $events->eventGroup 	= $request->input('eventGroup');

            $events->save();

            return response()->json([
                    'message'=>  'true'

            ]);

        }else return "esto no es ajax";

    }

    // Utilizado para buscar nombre de evento para la comprobación de NO repetición
    public function getexisteEvent(Request $request)
    {
        if($request->ajax()){
            // entra aqui si esta editando un registro
            if (!empty($request->input('editar')))
                $event_id= $request->input('editar');
            else
                $event_id = 0;

            $datos = Event::Where('eventName', $request->input('eventName'))->where('id','<>',$event_id)->exists();

            if ($datos)
            {
                return response()->json(['message' => 'existe']);
            }
            else
                return response()->json(['message' => 'noExiste']);
        }
    }

      // Utilizado para eliminar un Evento
      public function deleteEvent(Request $request)
      {
          if($request->ajax()){
              // entra aqui si esta editando un registro
              $event_id = $request->input('event_id');
              $project = Project::Where('event_id', $event_id)->exists();

              if ($project) {
                return response()->json([
                    'message' => false ,
                    'texto' => 'Este evento tiene asignado algun proyecto',
                    'texto2' => 'el registro no se ha borrado']);

              }
              $datos = Event::find($event_id)->delete();

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
