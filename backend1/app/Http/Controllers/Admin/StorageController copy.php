<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class StorageController extends Controller
{
    public function index()
    {
// directorio  `/storage/app/public`
$id_figura = 11;
// Obtienes los subdirectorios que están dentro del directorio
$directorios_del_cliente = Storage::directories("/public/documentos/{$id_figura}");
var_dump($directorios_del_cliente);
// creas un array vacío para ir llenándolo con los elementos año/mes/archivos
$tree_array = [];

// iteras sobre los directorios obtenidos
foreach ($directorios_del_cliente as $directorio_del_ano) {
    // haciendo un explode, separas el string en un array con cada directorio.
    $temp_array = explode('/', $directorio_del_ano);

    // obtienes el último elemento (el año).
    $year = end( $temp_array );
    var_dump($year);
    // Obtienes los subdirectorios que están dentro del directorio del año
    $subdirectorios_del_ano = Storage::directories("/public/documentos/$id_figura/$year");
    foreach ($subdirectorios_del_ano as $directorio_del_mes) {
        $temp_array = explode('/', $directorio_del_mes);
        // obtienes el último elemento (el mes).
        $month = end( $temp_array );
        // Obtienes los archivos que están dentro del directorio del mes
        $archivos_del_mes = Storage::files($directorio_del_mes);
        foreach ($archivos_del_mes as $archivo_del_mes) {
            $temp_array = explode('/', $archivo_del_mes);
            // obtienes el último elemento (el nombre del archivo).
            $filename = end( $temp_array );
            // obtienes la url que corresponde a ese archivo.
            $url = Storage::url($archivo_del_mes);
            // guardas en tu array el nombre y la url del archivo,
            // haciendo que el array sea multidimensional por año y mes.
            $tree_array[$year][$month][] = [
                'filename' => $filename,
                'url' => $url
            ];
        }
    }
}

// devuelves la vista pasándole el array creado.
return view('admin.store.index', ['tree_array' => $tree_array]);

    }
}
