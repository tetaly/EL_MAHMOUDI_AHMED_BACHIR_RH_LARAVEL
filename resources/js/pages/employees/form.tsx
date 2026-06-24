import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { RhPage } from '@/components/rh-page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Department = { id: number; nom: string };
type Employee = {
    id: number;
    department_id: number;
    nom: string;
    prenom: string;
    email: string;
    fonction: string;
    salaire: string;
    date_embauche: string;
    photo?: string;
};
export default function EmployeeForm({
    employee,
    departments,
}: {
    employee?: Employee;
    departments: Department[];
}) {
    const editing = Boolean(employee);

    return (
        <>
            <Head title={editing ? 'Modifier l’employé' : 'Nouvel employé'} />
            <RhPage title={editing ? 'Modifier l’employé' : 'Nouvel employé'}>
                {!departments.length ? (
                    <div className="rh-form-panel p-8 text-center">
                        <p className="mb-4">Créez d’abord un département.</p>
                        <Button asChild>
                            <Link href="/departments/create">
                                Créer un département
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <Form
                        action={
                            editing
                                ? `/employees/${employee!.id}`
                                : '/employees'
                        }
                        method="post"
                        encType="multipart/form-data"
                        options={{ preserveScroll: true }}
                        disableWhileProcessing
                        className="rh-form-panel max-w-3xl space-y-6 p-6 md:p-8"
                    >
                        {({ errors, processing }) => (
                            <>
                                {Object.keys(errors).length > 0 && (
                                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                        Vérifiez les champs signalés avant de
                                        continuer.
                                    </div>
                                )}
                                {editing && (
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="put"
                                    />
                                )}
                                <div className="mb-1 border-b border-border/70 pb-4">
                                    <p className="rh-kicker">
                                        Fiche collaborateur
                                    </p>
                                    <h2 className="text-lg font-bold text-foreground">
                                        Informations professionnelles
                                    </h2>
                                </div>
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="nom">Nom *</Label>
                                        <Input
                                            id="nom"
                                            name="nom"
                                            required
                                            maxLength={255}
                                            defaultValue={employee?.nom}
                                        />
                                        <InputError message={errors.nom} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="prenom">Prénom *</Label>
                                        <Input
                                            id="prenom"
                                            name="prenom"
                                            required
                                            maxLength={255}
                                            defaultValue={employee?.prenom}
                                        />
                                        <InputError message={errors.prenom} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">E-mail *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            maxLength={255}
                                            defaultValue={employee?.email}
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="fonction">
                                            Fonction *
                                        </Label>
                                        <Input
                                            id="fonction"
                                            name="fonction"
                                            required
                                            maxLength={255}
                                            defaultValue={employee?.fonction}
                                        />
                                        <InputError message={errors.fonction} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="department_id">
                                            Département *
                                        </Label>
                                        <select
                                            id="department_id"
                                            name="department_id"
                                            required
                                            defaultValue={
                                                employee?.department_id ?? ''
                                            }
                                            className="h-10 rounded-lg border bg-card px-3 text-sm text-foreground"
                                        >
                                            <option value="" disabled>
                                                Choisir un département
                                            </option>
                                            {departments.map((d) => (
                                                <option value={d.id} key={d.id}>
                                                    {d.nom}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.department_id}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="salaire">
                                            Salaire mensuel (MAD) *
                                        </Label>
                                        <Input
                                            id="salaire"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            name="salaire"
                                            required
                                            defaultValue={employee?.salaire}
                                        />
                                        <InputError message={errors.salaire} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="date_embauche">
                                            Date d’embauche *
                                        </Label>
                                        <Input
                                            id="date_embauche"
                                            type="date"
                                            name="date_embauche"
                                            required
                                            max={new Date()
                                                .toISOString()
                                                .slice(0, 10)}
                                            defaultValue={
                                                employee?.date_embauche
                                            }
                                        />
                                        <InputError
                                            message={errors.date_embauche}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="photo">
                                            Photo{' '}
                                            {editing
                                                ? '(laisser vide pour conserver)'
                                                : '*'}
                                        </Label>
                                        <Input
                                            id="photo"
                                            type="file"
                                            name="photo"
                                            required={!editing}
                                            accept="image/jpeg,image/png,image/webp"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            JPG, PNG ou WEBP — 2 Mo maximum.
                                        </p>
                                        <InputError message={errors.photo} />
                                    </div>
                                </div>
                                {editing && employee?.photo && (
                                    <img
                                        src={`/storage/${employee.photo}`}
                                        alt="Photo actuelle"
                                        className="size-24 rounded-lg object-cover"
                                    />
                                )}
                                <div className="flex gap-2">
                                    <Button type="submit" disabled={processing}>
                                        {editing ? 'Enregistrer' : 'Créer'}
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href="/employees">Annuler</Link>
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                )}
            </RhPage>
        </>
    );
}
