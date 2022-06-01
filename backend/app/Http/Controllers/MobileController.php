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
use App\User;
use App\Models\Mobile;

use App\Notifications\PushDemo;
use App\Notifications\EmptyNotification;

use Notification;
use App\Models\PushSubscriptions;



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
        $endpoint = $request->endpoint;
        $token = $request->keys['auth'];
        $key = $request->keys['p256dh'];
        
        
      
        $user = \App\Models\Mobile::all();
        $user->updatePushSubscription( $endpoint, $key, $token);
        return response()->json(['success' => true],200);
    }

    public function push(Request $request){
        $proyects = $request->input('projects');
        Notification::send(Mobile::where('notification', true)->get(),new PushDemo($proyects) );
        Notification::send(Mobile::where('notification', false)->get(),new PushDemo($proyects) );
        return "hola";
    }

    public function pushEmpty(Request $request){
        
        Notification::send(Mobile::all(),new EmptyNotification($proyects) );
        return "hola";
    }

    public function notificationUser(Request $request){

        $mobile = Mobile::findOrFail($request->id);
        $mobile -> notification= $request->notificationType;
       $mobile->save();
        return $mobile;
    }

   


}
