<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keyplaylist extends Model
{
    use HasFactory;
    protected $table = 'instruments';
    public function playlists()
    {
        return $this->belongsToMany(Playlist::class, 'keyplaylist_playlist', 'instrument_id', 'playlist_id');
    }
}
