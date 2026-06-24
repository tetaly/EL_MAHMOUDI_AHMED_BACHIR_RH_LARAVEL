import { Link } from '@inertiajs/react';
import { Building2, LayoutGrid, Users } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
const mainNavItems = [
    {
        title: 'Tableau de bord',
        href: dashboard(),
        icon: LayoutGrid,
    },
    { title: 'Départements', href: '/departments', icon: Building2 },
    { title: 'Employés', href: '/employees', icon: Users },
];
const footerNavItems = [];
export function AppSidebar() {
    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className="[&_[data-sidebar=sidebar]]:border-0 [&_[data-sidebar=sidebar]]:shadow-2xl"
        >
            <SidebarHeader className="px-3 pt-4 pb-7">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <div className="mx-4 mt-auto mb-4 overflow-hidden rounded-[1.2rem_.4rem_1.2rem_.4rem] bg-white/8 p-4 text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
                    <div className="mb-3 flex gap-1.5">
                        <span className="size-2 rounded-full bg-[#e69a68]" />
                        <span className="size-2 rounded-full bg-[#f1c75b]" />
                        <span className="size-2 rounded-full bg-[#67a797]" />
                    </div>
                    <p className="font-semibold text-sidebar-foreground">
                        L’humain d’abord.
                    </p>
                    <p className="mt-1 leading-relaxed">
                        Une équipe bien accompagnée fait grandir toute
                        l’entreprise.
                    </p>
                </div>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
