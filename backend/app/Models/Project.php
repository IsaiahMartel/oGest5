<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Project extends Model
{
    use \Bkwld\Cloner\Cloneable; // https://github.com/BKWLD/cloner
    use HasFactory;

    protected $fillable = [
        'projectNote', 'projectLevel' ,'projectPublished','projectDateIni','projectDateIni'
    ];
    protected $cloneable_relations = ['playlists','addresses','extras','shedules'];
    //protected $clone_exempt_attributes = ['projectLevel'];

    // relacion con season uno a muchos (project)
    public function seasons()
    {
        return $this
            ->belongsTo(Season::class , 'season_id'); // una season pertenece a un proyecto
    }
    // relacion con season uno a muchos (project)
    public function events()
    {
        return $this
            ->belongsTo(Event::class , 'event_id');
    }

    //establecimiento de la relacion de uno a muchos con Shedule : 1 project tiene muchos shedule
    public function shedules()
    {
        return $this->hasMany(Shedule::class);
    }

    //establecimiento de la relacion de uno a muchos con project : 1 project tiene muchos playlist
    public function playlists()
    {
        return $this->hasMany(Playlist::class);
    }
    //relacion Mucho a muchos con Address

    public function addresses()
    {
        //return $this->belongsToMany(Address::class)->withPivot(['id','order','addressgroup_id']);
        return $this->belongsToMany(Address::class)->withPivot(['order','addressgroup_id']);
    }
    // no estoy seguro de esta relacion
    public function addressgroups()
    {
        return $this->belongsToMany(Addressgroup::class,'address_project','project_id','addressgroup_id');
    }

// Relacion con tabla addrsses mediante la relacion de extras (para guardar los datos en la tabla Muchos a muchos de extra_project)
    public function extras()
    {
        //return $this->belongsToMany(Extra::class,'extra_project','project_id','address_id')->withPivot(['id','order','addressgroup_id']);
        return $this->belongsToMany(Extra::class,'extra_project','project_id','address_id')->withPivot(['order','addressgroup_id']);
    }
    public function onCloning($src, $child = null) {
        $this->projectLevel = 0;
    }
    public function publications()
    {
        return $this->belongsToMany(Publication::class);
    }

}
