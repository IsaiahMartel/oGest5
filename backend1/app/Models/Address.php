<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

//establecimiento de la relacion de uno a muchos con library
    public function libraries()
    {
        return $this->hasMany(Library::class);
    }
// relacion Mucho a muchos con addressgroup
    public function addressgroups()
    {
        return $this->belongsToMany(Addressgroup::class,'address_addressgroup', 'address_id', 'addressgroup_id');
    }
// relacion Mucho a muchos con Projects
    public function projects()
    {
        //return $this->belongsToMany(Project::class,'address_project', 'address_id', 'project_id')->withPivot(['id','order','addressgroup_id']);
        return $this->belongsToMany(Project::class)->withPivot(['id','order','addressgroup_id']);

    }
// relacion con contacts uno a muchos (contact)
    public function contacts()
    {
        return $this->hasMany(Contact::class); // un Address tiene mucho contacts
    }


}
