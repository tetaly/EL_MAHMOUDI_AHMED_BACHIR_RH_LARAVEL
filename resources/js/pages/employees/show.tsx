import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { RhPage } from '@/components/rh-page';
import { Button } from '@/components/ui/button';

type Employee = {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    fonction: string;
    salaire: string;
    date_embauche: string;
    photo?: string;
    department: { id: number; nom: string };
};
export default function Show({ employee }: { employee: Employee }) {
    const fields = [
        ['Fonction', employee.fonction],
        ['Département', employee.department.nom],
        ['E-mail', employee.email],
        ['Salaire', `${Number(employee.salaire).toLocaleString('fr-MA')} MAD`],
        [
            'Date d’embauche',
            new Date(`${employee.date_embauche}T00:00:00`).toLocaleDateString(
                'fr-FR',
            ),
        ],
    ];

    return (
        <>
            <Head title={`${employee.prenom} ${employee.nom}`} />
            <RhPage
                title={`${employee.prenom} ${employee.nom}`}
                description={employee.fonction}
                action={
                    <Button
                        asChild
                        className="rounded-lg bg-primary px-5 text-primary-foreground hover:bg-primary/90"
                    >
                        <Link href={`/employees/${employee.id}/edit`}>
                            <Pencil />
                            Modifier
                        </Link>
                    </Button>
                }
            >
                <div className="rh-panel relative grid gap-8 p-6 md:grid-cols-[200px_1fr] md:p-8">
                    {employee.photo ? (
                        <img
                            src={`/storage/${employee.photo}`}
                            alt={`${employee.prenom} ${employee.nom}`}
                            className="size-48 rounded-xl object-cover"
                        />
                    ) : (
                        <div className="grid size-48 place-items-center rounded-xl bg-primary/12 text-4xl font-bold text-primary">
                            {employee.prenom[0]}
                            {employee.nom[0]}
                        </div>
                    )}
                    <dl className="grid gap-4 sm:grid-cols-2">
                        {fields.map(([label, value]) => (
                            <div
                                key={label}
                                className="rounded-lg bg-muted p-4"
                            >
                                <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                    {label}
                                </dt>
                                <dd className="mt-1 font-bold text-foreground">
                                    {value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </RhPage>
        </>
    );
}
