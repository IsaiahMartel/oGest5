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
use App\Models\PushNotificationMobile;
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
         
                $playlist = Playlist::with('works', 'perplaylists', 'keyplaylists', 'voiplaylists', 'works.composers')->get();
        
                return $playlist;
        }
    
        public function getShedules()
        {
         
                $shedule = Shedule::with('rooms', 'tipeshedules')->get();
        
                return $shedule;
        }
    
        public function getAddresses()
        {
         
                $address = Project::with('addresses', 'addressgroups')->get();
        
                return $address;
        }
    
    public function checkBackendIsUp()
    {
            return;
    }


    public function saveTokenNotification(Request $request)
    {
        $notification = new PushNotificationMobile();
        $notification-> endpoint = $request->  endpoint;
        $notification-> expirationTime = $request->  expirationTime;
       
        $notification-> auth = $request->  auth;
        $notification-> p256dh = $request-> p256dh;
        $notification->save();

        return $notification;
    }


}
