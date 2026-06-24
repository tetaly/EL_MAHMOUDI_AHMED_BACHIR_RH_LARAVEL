import { Link, usePage } from '@inertiajs/react';
import {
    Building2,
    LayoutDashboard,
    LogOut,
    Moon,
    Settings,
    Sun,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { useAppearance } from '@/hooks/use-appearance';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import { dashboard, logout } from '@/routes';
import { edit } from '@/routes/profile';
const navigation = [
    { label: 'Accueil', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Départements', href: '/departments', icon: Building2 },
    { label: 'Employés', href: '/employees', icon: Users },
];
export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const { isCurrentUrl } = useCurrentUrl();
    const { resolvedAppearance, updateAppearance } = useAppearance();
    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
                <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center gap-x-8 px-4 md:px-6">
                    <Link
                        href={dashboard()}
                        className="mr-auto flex items-center py-3"
                    >
                        <AppLogo />
                    </Link>

                    <nav className="order-3 flex w-full gap-1 overflow-x-auto border-t border-border py-2 md:order-none md:w-auto md:border-0 md:py-0">
                        {navigation.map(({ label, href, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    'flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground',
                                    isCurrentUrl(href) &&
                                        'bg-primary/12 text-primary dark:bg-primary/15',
                                )}
                            >
                                <Icon className="size-4" />
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <div className="ml-3 flex items-center gap-1">
                        <div className="mr-2 hidden text-right sm:block">
                            <p className="text-sm font-semibold text-foreground">
                                {auth.user.name}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                                Administrateur
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                updateAppearance(
                                    resolvedAppearance === 'dark'
                                        ? 'light'
                                        : 'dark',
                                )
                            }
                            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                            title={
                                resolvedAppearance === 'dark'
                                    ? 'Mode clair'
                                    : 'Mode sombre'
                            }
                        >
                            {resolvedAppearance === 'dark' ? (
                                <Sun className="size-4" />
                            ) : (
                                <Moon className="size-4" />
                            )}
                        </button>
                        <Link
                            href={edit()}
                            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                            title="Paramètres"
                        >
                            <Settings className="size-4" />
                        </Link>
                        <Link
                            href={logout()}
                            method="post"
                            as="button"
                            className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            title="Déconnexion"
                        >
                            <LogOut className="size-4" />
                        </Link>
                    </div>
                </div>
            </header>
            <main className="mx-auto w-full max-w-7xl">{children}</main>
        </div>
    );
}
