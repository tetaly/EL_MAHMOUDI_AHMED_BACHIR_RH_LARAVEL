<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Models\Department;
use App\Models\Employee;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard', [
        'stats' => [
            'departments' => Department::count(),
            'employees' => Employee::count(),
            'masseSalariale' => Employee::sum('salaire'),
        ],
        'recentEmployees' => Employee::with('department:id,nom')->latest()->limit(5)->get(),
    ]))->name('dashboard');
    Route::resource('departments', DepartmentController::class);
    Route::resource('employees', EmployeeController::class);
});

require __DIR__.'/settings.php';
