<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Employee extends Model
{
    protected $fillable = [
        'department_id', 'nom', 'prenom', 'email', 'fonction',
        'salaire', 'date_embauche', 'photo',
    ];

    protected function casts(): array
    {
        return [
            'date_embauche' => 'date:Y-m-d',
            'salaire' => 'decimal:2',
        ];
    }

    /** @return BelongsTo<Department, $this> */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}
