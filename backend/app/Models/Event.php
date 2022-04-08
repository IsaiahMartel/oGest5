<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $fillable = [
        'eventName', 'eventNote','eventGroup', 'eventDateIni','eventDateIni'
    ];

    //establecimiento de la relacion de uno a muchos con Project
    public function projects()
	{
	    return $this->hasMany(Project::class);
	}

}
