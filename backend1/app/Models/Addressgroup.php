<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Address;

class Addressgroup extends Model
{
    use HasFactory;
    protected $fillable = [
        'addressgroupCode', 'addressgroupName'
    ];
    public function addresses()
    {
        return $this->belongsToMany(Address::class, 'address_addressgroup', 'addressgroup_id', 'address_id');
    }
    public function extras()
    {
        return $this->belongsToMany(Address::class, 'address_addressgroup', 'addressgroup_id', 'address_id');
    }
    //No estoy seguro de esta relacion
    public function project()
    {
        return $this->belongsToMany(Address::class, 'address_project', 'addressgroup_id', 'project_id');
    }
}
