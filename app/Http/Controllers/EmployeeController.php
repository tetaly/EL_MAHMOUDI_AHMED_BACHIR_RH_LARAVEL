<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest;
use App\Models\Department;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('employees/index', [
            'employees' => Employee::query()->with('department:id,nom')->orderBy('nom')->orderBy('prenom')->get(),
        ]);
    }

    public function create(): Response|RedirectResponse
    {
        if (! Department::query()->exists()) {
            return to_route('departments.create')->with(
                'error',
                'Créez d’abord un département avant d’ajouter un employé.',
            );
        }

        return Inertia::render('employees/form', ['departments' => $this->departments()]);
    }

    public function store(EmployeeRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['photo'] = $request->file('photo')->store('employees', 'public');
        Employee::create($data);

        return to_route('employees.index')->with('success', 'Employé ajouté avec succès.');
    }

    public function show(Employee $employee): Response
    {
        return Inertia::render('employees/show', ['employee' => $employee->load('department:id,nom')]);
    }

    public function edit(Employee $employee): Response
    {
        return Inertia::render('employees/form', [
            'employee' => $employee,
            'departments' => $this->departments(),
        ]);
    }

    public function update(EmployeeRequest $request, Employee $employee): RedirectResponse
    {
        $data = $request->validated();
        if ($request->hasFile('photo')) {
            Storage::disk('public')->delete($employee->photo);
            $data['photo'] = $request->file('photo')->store('employees', 'public');
        } else {
            unset($data['photo']);
        }
        $employee->update($data);

        return to_route('employees.index')->with('success', 'Employé modifié avec succès.');
    }

    public function destroy(Employee $employee): RedirectResponse
    {
        Storage::disk('public')->delete($employee->photo);
        $employee->delete();

        return to_route('employees.index')->with('success', 'Employé supprimé avec succès.');
    }

    /** @return Collection<int, Department> */
    private function departments(): Collection
    {
        return Department::query()->orderBy('nom')->get(['id', 'nom']);
    }
}
