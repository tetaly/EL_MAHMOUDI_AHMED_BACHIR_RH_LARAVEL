import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="grid min-h-screen bg-background lg:grid-cols-[420px_1fr]">
            <aside className="hidden bg-[#164e45] p-12 text-white lg:flex lg:flex-col lg:justify-between">
                <Link href={home()} className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-lg bg-white text-sm font-bold text-[#164e45]">
                        RH
                    </div>
                    <div>
                        <p className="font-bold">RH Manager</p>
                        <p className="text-xs text-white/60">
                            Gestion du personnel
                        </p>
                    </div>
                </Link>
                <div>
                    <div className="mb-5 h-1 w-12 bg-[#d78a61]" />
                    <p className="max-w-xs text-2xl leading-snug font-semibold">
                        Une gestion RH claire, centrée sur l’essentiel.
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-white/60">
                        Départements, employés et informations professionnelles
                        réunis au même endroit.
                    </p>
                </div>
                <p className="text-xs text-white/40">Espace interne sécurisé</p>
            </aside>

            <main className="flex items-center justify-center bg-background p-6">
                <div className="w-full max-w-md rounded-xl border border-border bg-card p-7 shadow-sm md:p-9">
                    <Link
                        href={home()}
                        className="mb-8 flex items-center gap-3 lg:hidden"
                    >
                        <div className="grid size-9 place-items-center rounded-lg bg-[#164e45] text-xs font-bold text-white">
                            RH
                        </div>
                        <span className="font-bold text-foreground">
                            RH Manager
                        </span>
                    </Link>
                    <div className="mb-8">
                        <p className="mb-1 text-sm font-medium text-primary">
                            Espace administrateur
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            {title}
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
}
