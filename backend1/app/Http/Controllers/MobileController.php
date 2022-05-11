<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Project;
use App\Models\Addressgroup;
use App\Models\Address;
use App\Models\Playlist;
use App\Models\Shedule;
use App\Models\Composer;
use Illuminate\Support\Facades\Auth;


class MobileController extends Controller
{
public function getProjects()
    {
     
            $projects = Project::with('events')->where('projectLevel',0)->get();
    
            return $projects;
    }


    public function getPlaylists()
    {
     
            $playlist = Playlist::with('works', 'perplaylists', 'keyplaylists', 'voiplaylists')->get();
    
            return $playlist;
    }

    public function getShedules()
    {
     
            $shedule = Shedule::with('rooms', 'tipeshedules')->get();
    
            return $shedule;
    }

    public function getAddresses()
    {
     
            $address = Addressgroup::first()->project()->with('addressgroups')->get();
    
            return $address;
    }


}
