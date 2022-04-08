<?php

    /* Este modelo hace referencia a la relacion muchos a muchos entre las percusiones que puede contener una obra
    * Instruments -> tabla con los instrumentos (tanto percusiones, como voces, como teclados)
    * percussion_work -> tabla PIVOT muchos a muchos
    * work -> tabla de obras
    */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Work;


class Percussion extends Model
{
    use HasFactory;
    protected $table = 'instruments';
    public function works()
    {
        return $this->belongsToMany(Work::class, 'percussion_work', 'instrument_id', 'work_id');
    }
}
