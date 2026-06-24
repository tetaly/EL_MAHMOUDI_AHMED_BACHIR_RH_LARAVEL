import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { RhPage } from '@/components/rh-page';
import { Button } from '@/components/ui/button';
export default function Index({ employees }) {
    const remove = (e) =>
        confirm(`Supprimer ${e.prenom} ${e.nom} ?`) &&
        router.delete(`/employees/${e.id}`);
    return (
        <>
            <Head title="Employés" />
            <RhPage
                title="Employés"
                description="Consultez et gérez le personnel."
                action={
                    <Button
                        asChild
                        className="rounded-lg bg-primary px-5 text-primary-foreground hover:bg-primary/90"
                    >
                        <Link href="/employees/create">
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
                                    <th className="p-4">Employé</th>
                                    <th className="p-4">Fonction</th>
                                    <th className="p-4">Département</th>
                                    <th className="p-4">E-mail</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {employees.map((e) => (
                                    <tr key={e.id}>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                {e.photo ? (
                                                    <img
                                                        src={`/storage/${e.photo}`}
                                                        className="size-10 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="grid size-10 place-items-center rounded-lg bg-primary/12 font-bold text-primary">
                                                        {e.prenom[0]}
                                                        {e.nom[0]}
                                                    </div>
                                                )}
                                                <span className="font-bold text-foreground">
                                                    {e.prenom} {e.nom}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">{e.fonction}</td>
                                        <td className="p-4">
                                            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                                                {e.department.nom}
                                            </span>
                                        </td>
                                        <td className="p-4">{e.email}</td>
                                        <td className="p-4">
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/employees/${e.id}`}
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
                                                        href={`/employees/${e.id}/edit`}
                                                    >
                                                        <Pencil />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => remove(e)}
                                                >
                                                    <Trash2 className="text-destructive" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {!employees.length && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="p-8 text-center text-muted-foreground"
                                        >
                                            Aucun employé.
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
