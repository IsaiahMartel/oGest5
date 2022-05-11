<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
//use phpDocumentor\Reflection\DocBlock\Tags\Var_;

class StorageController extends Controller
{
    public function index(Request $request)
    {
        $obra= $request->input('url');
        // directorio  `/storage/app/public`
        // $obra = 'Kuhlau/CONCERTINO_IN_F MINOR_FOR_TWO_HORNS';
        //$obra = $url ;
        $nombreCarpetas = [] ;
        $nombreCarpetas2 = [] ;
        $fichero = [];

        // Obtienes los subdirectorios que están dentro del directorio
        $directorioRaiz = Storage::directories("/public/archivoPartituras/{$obra}");
        $archivosraiz = Storage::files( "/public/archivoPartituras/{$obra}" );
        foreach ($archivosraiz as $archivo) {
             $temp_array = explode('/', $archivo);
             $filename = end( $temp_array );
             $urlFile =str_replace('public', 'storage', $archivo);
             $fichero[] = [
                'urlFile'     => $urlFile,
                'nombreFile'  => $filename
             ];

        }
        foreach ($directorioRaiz as $directorio) {
            $temp_array = explode('/', $directorio);
            $temp_nombreCarpeta = end( $temp_array );
            $nombreCarpetas[] = $temp_nombreCarpeta;
            $nombreCarpetas2[] = [
                'url'     => $directorio,
                'carpeta' => $temp_nombreCarpeta
           ];
        }

        return view('admin.store.index'  , compact('nombreCarpetas','nombreCarpetas2','fichero' ) );

    }

    // devuelve carpeta y ficheros de una url en particular
    public function getdirectorios(Request $request)
    {
        if($request->ajax())
        {

        $url= $request->input('url');

        $directorioRaiz = Storage::directories($url);
        $archivosraiz = Storage::files( $url );
        $plantilla = '' ;
        $plantilla.= ' <ul class="products-list product-list-in-card pl-2 pr-2">';

        // muestro los ficheros
        foreach ($archivosraiz as $archivo) {
             $file     = explode('/', $archivo);
             $urlFile = str_replace('public', 'storage', $archivo);
             $filename = end( $file );

             $plantilla.= '  <li class="item">';
             $plantilla.= '    <i class="fas fa-file-pdf fa-2x text-danger float-left mr-3"></i>';
             $plantilla.= '      <div class="">';
             $plantilla.= '          <a target="_blank" href="../../'.$urlFile.'" class="product-title">'. $filename ;
             $plantilla.= '              <span class="badge badge-warning float-right">PDF</span></a>';
             $plantilla.= '          <span class="product-description">';
             $plantilla.=                     $urlFile;
             $plantilla.= '          </span>';
             $plantilla.= '      </div>';
             $plantilla.= '  </li>';
        }
        $plantilla.= '</ul>' ;

        // genero las carpetas
        $code= explode('/', $url);
        $code = end( $code );
        $plantilla.='    <div class="container"';
        $plantilla.='    <div class="accordion" id="partituras'.$code.'">';

        foreach ($directorioRaiz as $key => $directorio) {
            $temp_array = explode('/', $directorio);
            $nombreCarpeta = end( $temp_array );

            $plantilla.='        <div class="card">';
            $plantilla.='            <div class="card-header" id="cabecera'.$nombreCarpeta.'">';
            $plantilla.='                <h2 class="mb-0">';
            $plantilla.='                    <a  data-url="'.$directorio.'" class="btn btn-link btn-block text-left collapsed partitura" type="button" data-toggle="collapse"';
            $plantilla.='                        data-target="#'.$nombreCarpeta.'" aria-expanded="false" aria-controls="'.$nombreCarpeta.'">';
            $plantilla.='                            <i class="fas fa-folder-open fa-2x mr-2 text-warning"></i><span>'.$nombreCarpeta;
            $plantilla.='                    </span></a>';
            $plantilla.='                </h2>';
            $plantilla.='            </div>';
            $plantilla.='            <div id="'.$nombreCarpeta.'" class="collapse" aria-labelledby="cabecera'.$nombreCarpeta.'" data-parent="#partituras'.$code.'">';
            $plantilla.='                <div id = "contenido-"'.$nombreCarpeta.'>';
            $plantilla.='                    <div class="text-center" >';
            $plantilla.='                        <strong>Cargando, espere...</strong>';
            $plantilla.='                        <div class="spinner-border m-5" role="status">';
            $plantilla.='                            <span class="sr-only">Cargando...</span>';
            $plantilla.='                        </div>';
            $plantilla.='                    </div>';
            $plantilla.='                </div>';
            $plantilla.='            </div>';
            $plantilla.='        </div>';

        }
        $plantilla.='    </div>';
        $plantilla.='</div>';


        return response()->json([
                'plantilla' =>$plantilla
        ]);
        }
    }


}
