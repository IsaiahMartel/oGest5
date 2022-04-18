<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    use HasFactory;
    // use \Bkwld\Cloner\Cloneable;
    protected $fillable = [

        'composer_id'
        ,'work_id'
        ,'workName'
        ,'workCompyear'
        ,'workDuration'
        ,'flute'
        ,'fluteExp'
        ,'oboe'
        ,'oboeExp'
        ,'clarinet'
        ,'clarinetExp'
        ,'bassoon'
        ,'bassoonExp'
        ,'horn'
        ,'hornExp'
        ,'trumpet'
        ,'trumpetExp'
        ,'trombone'
        ,'tromboneExp'
        ,'tuba'
        ,'tubaExp'
        ,'timpani'
        ,'timpaniExp'
        ,'harp'
        ,'harpExp'
        ,'playlistString'
        ,'percussion'
        ,'percussionExp'
        ,'keyboard'
        ,'keyboardExp'
        ,'extra'
        ,'extraExp'
        ,'vocals'
        ,'vocalsExp'
        ,'playlistOrder'
    ];
        protected $cloneable_relations = ['perplaylists','keyplaylists','voiplaylists']; // para la clonacion de registros

        //establecimiento de la relacion de muchos a uno con Projects
        public function projects()
        {
            return $this->belongsTo(Project::class,'project_id');
        }
        // relacion con works uno a uno (works)
        public function works()
        {
            return $this->belongsTo(Work::class,'work_id');
        }
        //Relacion mucho a muchos entre Playlist (percusion) e instrument
        public function perplaylists()
        {
            return $this->belongsToMany(Perplaylist::class, 'perplaylist_playlist', 'playlist_id', 'instrument_id');
        }
        //Relacion mucho a muchos entre Playlist (keyboard) e instrument
        public function keyplaylists()
        {
            return $this->belongsToMany(Keyplaylist::class, 'keyplaylist_playlist', 'playlist_id', 'instrument_id');
        }
        //Relacion mucho a muchos entre Playlist (voices) e instrument
        public function voiplaylists()
        {
            return $this->belongsToMany(Voiplaylist::class, 'voiplaylist_playlist', 'playlist_id', 'instrument_id');
        }




}
