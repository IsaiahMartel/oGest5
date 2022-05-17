<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tipeshedule extends Model
{
    use HasFactory;
    protected $fillable = [
        'tipesheduleName', 'tipesheduleNote', 'tipeshedulehourRange'
    ];

    //establecimiento de la relacion de uno a muchos con Shdule
    public function shedules()
    {
        return $this->hasMany(Shedule::class);
    }

}
