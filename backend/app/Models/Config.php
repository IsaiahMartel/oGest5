<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    use HasFactory;
    // relacion con projects
    public function seasons()
    {
    return $this->belongsTo(Season::class);
    }

}
