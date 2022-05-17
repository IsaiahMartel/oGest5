<?php

    /* Este modelo hace referencia a la relacion muchos a muchos entre los teclados que puede contener una obra
    * Instruments -> tabla con los instrumentos (tanto percusiones, como voces como teclados)
    * keyboard_work -> tabla PIVOT muchos a muchos
    * work -> tabla de obras
    */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keyboard extends Model
{
    use HasFactory;

    protected $table = 'instruments'; // aquí digo donde se encuentran los datos de este modelo
    public function works()
    {
        return $this->belongsToMany(Work::class, 'keyboard_work', 'instrument_id', 'work_id');
    }
}
