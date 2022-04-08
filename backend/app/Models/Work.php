<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Library;
use App\Models\Composer;
use App\Models\Percussion;
use App\Models\Keyboard;


class Work extends Model
{

    use HasFactory;
    protected $fillable = [

        'composer_id'
        ,'workName'
        ,'workName2'
        ,'workCatalog'
        ,'workCompyear'
        ,'workDuration'
        ,'workArrangemt'
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
        ,'violin1'
        ,'violin2'
        ,'viola'
        ,'cello'
        ,'bass'
        ,'stringsExp'
        ,'percussion'
        ,'percussionExp'
        ,'keyboard'
        ,'keyboardExp'
        ,'extra'
        ,'extraExp'
        ,'vocals'
        ,'vocalsExp'
        ,'workDetails'
        ,'workNotes'
    ];


        //establecimiento de la relacion de uno a uno con library
        public function libraries()
        {
            return $this->hasOne(Library::class);
        }
          // relacion con playlists uno a uno (con work)
        public function playlists()
        {
            return $this->hasOne(Playlist::class);
        }

        // relacion con season uno a muchos (composers)
        public function composers()
        {
            return $this->belongsTo(Composer::class, 'composer_id');
        }

        //relacion Mucho a muchos con instruments (personalizado a percussion_work)

        public function percussions()
        {
            return $this->belongsToMany(Percussion::class, 'percussion_work', 'work_id', 'instrument_id');
        }

        //relacion Mucho a muchos con instruments (personalizado a keyboard_work)

        public function keyboards()
        {
            return $this->belongsToMany(Keyboard::class, 'keyboard_work', 'work_id', 'instrument_id');
        }

        //relacion Mucho a muchos con instruments (personalizado a voice_work)

        public function voices()
        {
            return $this->belongsToMany(Keyboard::class, 'voice_work', 'work_id', 'instrument_id');
        }

}
