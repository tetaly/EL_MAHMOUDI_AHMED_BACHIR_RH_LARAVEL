import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { RhPage } from '@/components/rh-page';
import { Button } from '@/components/ui/button';

type Department = {
    id: number;
    nom: string;
    localisation: string;
    description?: string;
    employees_count: number;
};

export default function Index({ departments }: { departments: Department[] }) {
    const remove = (department: Department) =>
        confirm(`Supprimer le département « ${department.nom} » ?`) &&
        router.delete(`/departments/${department.id}`);

    return (
        <>
            <Head title="Départements" />
            <RhPage
                title="Départements"
                description="Gérez les structures de l’entreprise."
                action={
                    <Button
                        asChild
                        className="rounded-lg bg-primary px-5 text-primary-foreground hover:bg-primary/90"
                    >
                        <Link href="/departments/create">
                            <Plus />
                            Ajouter
                        </Link>
                    </Button>
                }
            >
                <div className="rh-panel">
                    <div className="overflow-x-auto">
                        <table className="rh-table w-full text-sm">
                            <thead className="text-left">
                                <tr>
                                    <th className="p-4">Nom</th>
                                    <th className="p-4">Localisation</th>
                                    <th className="p-4">Employés</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {departments.map((d) => (
                                    <tr key={d.id}>
                                        <td className="p-4 font-medium">
                                            <span className="font-bold text-foreground">
                                                {d.nom}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {d.localisation}
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex min-w-8 justify-center rounded-full bg-primary/12 px-2.5 py-1 text-xs font-black text-primary">
                                                {d.employees_count}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/departments/${d.id}`}
                                                    >
                                                        <Eye />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/departments/${d.id}/edit`}
                                                    >
                                                        <Pencil />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => remove(d)}
                                                >
                                                    <Trash2 className="text-destructive" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {!departments.length && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="p-8 text-center text-muted-foreground"
                                        >
                                            Aucun département.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </RhPage>
        </>
    );
}
