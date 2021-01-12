<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'services';
    protected $fillable=[
        'id',
        'image',
        'descripcion',
        'host', 
        'ip' 
    ];
    public $timestamps = true;

}
