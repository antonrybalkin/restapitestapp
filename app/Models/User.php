<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'photo',
        'phone',
        'position_id',
    ];

    public function position(): BelongsTo
    {
        return $this->BelongsTo(Positions::class, 'position_id');
    }
    protected function photo(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => asset('storage/images/' . $value),
        );
    }
}
