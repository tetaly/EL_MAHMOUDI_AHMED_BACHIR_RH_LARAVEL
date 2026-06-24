import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { RhPage } from '@/components/rh-page';
import { Button } from '@/components/ui/button';

type Department = {
    id: number;
    nom: string;
    localisation: string;
    description?: string;
    employees: { id: number; nom: string; prenom: string; fonction: string }[];
};
export default function Show({ department }: { department: Department }) {
    return (
        <>
            <Head title={department.nom} />
            <RhPage
                title={department.nom}
                description={department.localisation}
                action={
                    <Button
                        asChild
                        className="rounded-lg bg-primary px-5 text-primary-foreground hover:bg-primary/90"
                    >
                        <Link href={`/departments/${department.id}/edit`}>
                            <Pencil />
                            Modifier
                        </Link>
                    </Button>
                }
            >
                {department.description && (
                    <div className="rh-panel p-6">
                        <p className="rh-kicker">À propos</p>
                        <h2 className="mb-2 text-lg font-bold text-foreground">
                            Description
                        </h2>
                        <p className="whitespace-pre-line text-muted-foreground">
                            {department.description}
                        </p>
                    </div>
                )}
                <div className="rh-panel">
                    <h2 className="border-b border-border/60 px-5 py-4 text-lg font-bold text-foreground">
                        Employés ({department.employees.length})
                    </h2>
                    <div className="divide-y">
                        {department.employees.map((e) => (
                            <Link
                                className="flex justify-between px-5 py-4 transition hover:bg-muted/60"
                                href={`/employees/${e.id}`}
                                key={e.id}
                            >
                                <span className="font-bold text-foreground">
                                    {e.prenom} {e.nom}
                                </span>
                                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                                    {e.fonction}
                                </span>
                            </Link>
                        ))}
                        {!department.employees.length && (
                            <p className="p-6 text-center text-muted-foreground">
                                Aucun employé dans ce département.
                            </p>
                        )}
                    </div>
                </div>
            </RhPage>
        </>
    );
}
