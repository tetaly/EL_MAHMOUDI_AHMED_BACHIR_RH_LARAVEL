import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
export function AppSidebarHeader({ breadcrumbs = [] }) {
    return (
        <header className="mx-4 mt-3 flex h-14 shrink-0 items-center justify-between gap-2 rounded-[1rem_.4rem_1rem_.4rem] border border-white/70 bg-card/80 px-4 shadow-sm backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:mx-6">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
                <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                Espace sécurisé
            </div>
        </header>
    );
}
