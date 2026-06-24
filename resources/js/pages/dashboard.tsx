import { Head, Link } from '@inertiajs/react';
import { Banknote, Building2, Users } from 'lucide-react';
import { dashboard } from '@/routes';

type Employee = {
    id: number;
    nom: string;
    prenom: string;
    fonction: string;
    department: { nom: string };
};

export default function Dashboard({
    stats,
    recentEmployees,
}: {
    stats: { departments: number; employees: number; masseSalariale: number };
    recentEmployees: Employee[];
}) {
    const cards = [
        {
            label: 'Employés',
            value: stats.employees,
            icon: Users,
            tone: 'border-t-primary text-primary',
        },
        {
            label: 'Départements',
            value: stats.departments,
            icon: Building2,
            tone: 'border-t-[#c16b45] text-[#c16b45] dark:border-t-[#e59068] dark:text-[#e59068]',
        },
        {
            label: 'Masse salariale',
            value: `${Number(stats.masseSalariale).toLocaleString('fr-MA')} MAD`,
            icon: Banknote,
            tone: 'border-t-[#927323] text-[#927323] dark:border-t-[#d9ba62] dark:text-[#d9ba62]',
        },
    ];

    return (
        <>
            <Head title="Tableau de bord" />
            <div className="space-y-8 px-4 py-8 md:px-6 md:py-10">
                <section>
                    <div>
                        <p className="mb-1 text-sm font-medium text-primary">
                            Vue d’ensemble
                        </p>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Tableau de bord
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Les informations importantes de votre équipe.
                        </p>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-3">
                    {cards.map(({ label, value, icon: Icon, tone }) => (
                        <div
                            key={label}
                            className={`rounded-xl border border-t-[3px] border-border bg-card p-5 shadow-sm ${tone}`}
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    {label}
                                </p>
                                <Icon className="size-5" />
                            </div>
                            <p className="mt-4 text-2xl font-bold text-foreground">
                                {value}
                            </p>
                        </div>
                    ))}
                </section>

                <section className="grid gap-5 lg:grid-cols-[1fr_300px]">
                    <div className="rh-panel">
                        <div className="flex items-center justify-between border-b border-border px-5 py-4">
                            <h2 className="font-semibold text-foreground">
                                Employés récents
                            </h2>
                            <Link
                                href="/employees"
                                className="text-sm font-medium text-primary hover:underline"
                            >
                                Voir tous
                            </Link>
                        </div>
                        <div className="divide-y divide-border">
                            {recentEmployees.length ? (
                                recentEmployees.map((employee) => (
                                    <Link
                                        href={`/employees/${employee.id}`}
                                        key={employee.id}
                                        className="flex items-center justify-between px-5 py-4 hover:bg-muted/60"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="grid size-9 place-items-center rounded-lg bg-primary/12 text-xs font-bold text-primary">
                                                {employee.prenom[0]}
                                                {employee.nom[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">
                                                    {employee.prenom}{' '}
                                                    {employee.nom}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {employee.fonction}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {employee.department.nom}
                                        </span>
                                    </Link>
                                ))
                            ) : (
                                <p className="p-8 text-center text-sm text-muted-foreground">
                                    Aucun employé enregistré.
                                </p>
                            )}
                        </div>
                    </div>

                    <aside className="rounded-xl bg-primary p-6 text-primary-foreground">
                        <p className="text-xs font-semibold tracking-wide text-primary-foreground/60 uppercase">
                            Accès rapide
                        </p>
                        <h2 className="mt-2 text-xl font-semibold">
                            Organisez votre équipe simplement.
                        </h2>
                        <div className="mt-6 space-y-2">
                            <Link
                                href="/employees/create"
                                className="block rounded-lg bg-primary-foreground px-4 py-3 text-sm font-semibold text-primary"
                            >
                                + Ajouter un employé
                            </Link>
                            <Link
                                href="/departments/create"
                                className="block rounded-lg bg-primary-foreground/10 px-4 py-3 text-sm hover:bg-primary-foreground/15"
                            >
                                + Ajouter un département
                            </Link>
                        </div>
                    </aside>
                </section>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Tableau de bord', href: dashboard() }],
};
