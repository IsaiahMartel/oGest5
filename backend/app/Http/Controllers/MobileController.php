<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Project;
use App\Models\Addressgroup;

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



    public function getPlaylistByProjectId(Request $request)
    {
    $playlist = Playlist::where('project_id', '=' ,$request->id)->with('works')->get();
  

    return  $playlist;
    }

    public function getSheduleByProjectId(Request $request)
    {
    $shedule = Shedule::where('project_id', '=' ,$request->id)->with('rooms', 'tipeshedules')->get();
    return $shedule;
    }

    public function getAddressProjectByProjectId(Request $request)
    {
    $address = Addressgroup::first()->project()->where('project_id', '=' ,$request->id)->with('addressgroups')->get();
    return $address;
    }
}
