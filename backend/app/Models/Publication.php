<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;

    public function projects()
    {
        //return $this->belongsToMany(Project::class,'address_project', 'address_id', 'project_id')->withPivot(['id','order','addressgroup_id']);
        return $this->belongsToMany(Project::class);

    }
}
