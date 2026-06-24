<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepartmentRequest;
use App\Models\Department;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('departments/index', [
            'departments' => Department::query()->withCount('employees')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('departments/form');
    }

    public function store(DepartmentRequest $request): RedirectResponse
    {
        Department::create($request->validated());

        return to_route('departments.index')->with('success', 'Département ajouté avec succès.');
    }

    public function show(Department $department): Response
    {
        return Inertia::render('departments/show', [
            'department' => $department->load(['employees' => fn ($query) => $query->orderBy('nom')]),
        ]);
    }

    public function edit(Department $department): Response
    {
        return Inertia::render('departments/form', ['department' => $department]);
    }

    public function update(DepartmentRequest $request, Department $department): RedirectResponse
    {
        $department->update($request->validated());

        return to_route('departments.index')->with('success', 'Département modifié avec succès.');
    }

    public function destroy(Department $department): RedirectResponse
    {
        if ($department->employees()->exists()) {
            return back()->with('error', 'Impossible de supprimer un département qui contient des employés.');
        }

        $department->delete();

        return to_route('departments.index')->with('success', 'Département supprimé avec succès.');
    }
}
