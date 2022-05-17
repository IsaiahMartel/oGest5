<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    //establecimiento de la relacion de muchos a uno con Addresses
    public function addresses()
    {
        return $this->belongsTo(Address::class,'address_id'); // (Muchos) Contact pertenecen a un Address
    }
}
