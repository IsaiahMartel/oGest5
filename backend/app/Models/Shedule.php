<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shedule extends Model
{
    use HasFactory;
    protected $fillable = [
        'sheduleDate', 'shedulehourRange', 'sheduleNote','project_id'
    ];

    // relacion con rooms : una ROOM puede tener muchas SHEDULE
    public function rooms()
    {
        return $this
            ->belongsTo(Room::class , 'room_id');
    }

    // relacion con tipeshedule : una tipeShedule tiene muchas SHEDULE
    public function tipeshedules()
    {
        return $this
            ->belongsTo(Tipeshedule::class , 'tipeshedule_id');
    }

    // relacion con projects: un Project tiene muchas  shedule ó shedule, pertenece a un projects
    public function projects()
    {
        return $this
            ->belongsTo(Project::class , 'project_id');
    }
}
