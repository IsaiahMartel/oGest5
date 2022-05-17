<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alert extends Model
{
    use HasFactory;
    //establecimiento de la relacion de muchos a uno con Users
    public function users()
    {
        return $this->belongsTo(User::class,'user_id');
    }

}
