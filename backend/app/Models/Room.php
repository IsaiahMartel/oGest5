<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;
    protected $fillable = [
        'roomName', 'roomNote', 'roomAcronym'
    ];

    //establecimiento de la relacion de uno a muchos con Shedule
    public function shedules()
	{
	    return $this->hasMany(Shedule::class);
	}

}
