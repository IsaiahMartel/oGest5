<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
    use HasFactory;
    protected $fillable = [
        'seasonName', 'seasonNote', 'seasonDateIni','seasonDateIni'
    ];

    //establecimiento de la relacion de uno a muchos con Project
    public function projects()
	{
	    return $this->hasMany(Project::class);
	}
    // relacion 1 a 1 con configs
    public function configs() {
        return $this->hasOne(Config::class);
    }


}
