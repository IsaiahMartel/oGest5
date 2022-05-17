<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Work;
use App\Models\Address;

class Library extends Model
{
    use HasFactory;

    protected $fillable = [
            'id',
            'work_id',
            'address_id',
            'libraryStrings',
            'libraryInstrumentation',
            'libraryCatalog' ,
            'libraryMaterial',
            'libraryNotes'
    ];

        // relacion con season uno a uno (works)
        public function works()
        {
            return $this->belongsTo(Work::class,'work_id');
            //return $this->hasOne(Work::class);
        }

        // relacion con season uno a uno (address)
        public function addresses()
        {
            return $this->belongsTo(Address::class,'address_id');
            //return $this->hasOne(Work::class);
        }

}
