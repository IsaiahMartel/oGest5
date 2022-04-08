<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Extra extends Model
{
    use HasFactory;
    protected $table = 'addresses'; // aquí digo donde se encuentran los datos de este modelo

    public function addressgroups()
    {
        return $this->belongsToMany(Addressgroup::class,'address_addressgroup', 'address_id', 'addressgroup_id');
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class,'extra_project', 'address_id', 'project_id')->withPivot(['id','order','addressgroup_id']);;

    }
}


