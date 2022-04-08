<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Composer extends Model
{
    use HasFactory;

    protected $fillable = [
        'composerLastname', 'composerFirstname','composerBirthYear', 'composerDeathyear',
    ];

    //establecimiento de la relacion de uno a muchos con PlayList
    public function works()
    {
        return $this->hasMany(Work::class);
    }
}
