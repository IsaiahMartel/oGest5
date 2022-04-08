<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Work;


class Instrument extends Model
{
    use HasFactory;

    public function works()
    {
        return $this->belongsToMany(Work::class, 'percussion_work', 'instrument_id', 'work_id');
    }
}
