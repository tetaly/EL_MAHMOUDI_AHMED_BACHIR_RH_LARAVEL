<?php

use App\Models\Department;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

function fakePng(string $name): UploadedFile
{
    $png = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', true);

    return UploadedFile::fake()->createWithContent($name, $png);
}

it('protège toutes les pages de gestion', function (string $uri) {
    $this->get($uri)->assertRedirect('/login');
})->with(['/dashboard', '/departments', '/departments/create', '/employees', '/employees/create']);

it('permet le CRUD complet des départements', function () {
    $this->actingAs(User::factory()->create());

    $this->post('/departments', [
        'nom' => 'Informatique',
        'localisation' => 'Casablanca',
        'description' => 'Systèmes d’information',
    ])->assertRedirect('/departments');

    $department = Department::firstOrFail();
    $this->get("/departments/{$department->id}")->assertOk();
    $this->put("/departments/{$department->id}", [
        'nom' => 'Technologies',
        'localisation' => 'Rabat',
        'description' => null,
    ])->assertRedirect('/departments');
    expect($department->fresh()->nom)->toBe('Technologies');

    $this->delete("/departments/{$department->id}")->assertRedirect('/departments');
    $this->assertDatabaseMissing('departments', ['id' => $department->id]);
});

it('valide les départements avec des messages français', function () {
    $this->actingAs(User::factory()->create())
        ->post('/departments', [])
        ->assertSessionHasErrors(['nom', 'localisation'])
        ->assertSessionHasErrors(['nom' => 'Le nom du département est obligatoire.']);
});

it('redirige vers la création du département avant le premier employé', function () {
    $this->actingAs(User::factory()->create())
        ->get('/employees/create')
        ->assertRedirect('/departments/create')
        ->assertSessionHas('error', 'Créez d’abord un département avant d’ajouter un employé.');
});

it('permet le CRUD des employés avec relation et photo', function () {
    Storage::fake('public');
    $this->actingAs(User::factory()->create());
    $department = Department::create(['nom' => 'RH', 'localisation' => 'Casablanca']);

    $this->post('/employees', [
        'department_id' => $department->id,
        'nom' => 'Alaoui',
        'prenom' => 'Sara',
        'email' => 'sara@example.com',
        'fonction' => 'Responsable RH',
        'salaire' => 12000,
        'date_embauche' => now()->subMonth()->toDateString(),
        'photo' => fakePng('sara.png'),
    ])->assertRedirect('/employees');

    $employee = Employee::with('department')->firstOrFail();
    expect($employee->department->nom)->toBe('RH');
    Storage::disk('public')->assertExists($employee->photo);
    $oldPhoto = $employee->photo;

    $this->get("/employees/{$employee->id}")->assertOk();
    $this->post("/employees/{$employee->id}", [
        '_method' => 'put',
        'department_id' => $department->id,
        'nom' => 'Alaoui',
        'prenom' => 'Sara',
        'email' => 'sara.alaoui@example.com',
        'fonction' => 'Directrice RH',
        'salaire' => 15000,
        'date_embauche' => now()->subMonth()->toDateString(),
        'photo' => fakePng('nouvelle.png'),
    ])->assertRedirect('/employees');

    $employee->refresh();
    expect($employee->fonction)->toBe('Directrice RH');
    Storage::disk('public')->assertMissing($oldPhoto);
    Storage::disk('public')->assertExists($employee->photo);

    $photo = $employee->photo;
    $this->delete("/employees/{$employee->id}")->assertRedirect('/employees');
    $this->assertDatabaseMissing('employees', ['id' => $employee->id]);
    Storage::disk('public')->assertMissing($photo);
});

it('refuse une photo invalide avec un message français', function () {
    Storage::fake('public');
    $department = Department::create(['nom' => 'Finance', 'localisation' => 'Rabat']);

    $this->actingAs(User::factory()->create())->post('/employees', [
        'department_id' => $department->id,
        'nom' => 'Benali',
        'prenom' => 'Yassine',
        'email' => 'yassine@example.com',
        'fonction' => 'Comptable',
        'salaire' => 8000,
        'date_embauche' => now()->toDateString(),
        'photo' => UploadedFile::fake()->create('document.pdf', 100, 'application/pdf'),
    ])->assertSessionHasErrors(['photo' => 'Le fichier doit être une image.']);
});

it('empêche de supprimer un département qui contient des employés', function () {
    $this->actingAs(User::factory()->create());
    $department = Department::create(['nom' => 'Ventes', 'localisation' => 'Marrakech']);
    Employee::create([
        'department_id' => $department->id, 'nom' => 'Amrani', 'prenom' => 'Ali',
        'email' => 'ali@example.com', 'fonction' => 'Commercial', 'salaire' => 7000,
        'date_embauche' => now(),
    ]);

    $this->delete("/departments/{$department->id}")
        ->assertSessionHas('error', 'Impossible de supprimer un département qui contient des employés.');
    $this->assertDatabaseHas('departments', ['id' => $department->id]);
});
