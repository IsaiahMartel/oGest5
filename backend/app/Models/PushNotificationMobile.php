<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PushNotificationMobile extends Model
{
    use HasFactory;

    protected $fillable = [
        // 'token',
      'endpoint',
      'expirationTime',
    
      'p256dh',
      'token',
   

    ];

  //   protected $casts = [
  //     'token' => 'array'
  // ];
}
