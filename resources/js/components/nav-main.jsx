import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
export function NavMain({ items = [] }) {
    const { isCurrentUrl } = useCurrentUrl();
    return (
        <SidebarGroup className="px-3 py-0">
            <SidebarGroupLabel className="mb-2 px-3 text-[10px] tracking-[.2em] text-sidebar-foreground/40 uppercase">
                Espace de gestion
            </SidebarGroupLabel>
            <SidebarMenu className="gap-2">
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isCurrentUrl(item.href)}
                            tooltip={{ children: item.title }}
                            className="h-11 rounded-[.9rem_.35rem_.9rem_.35rem] px-3 text-sidebar-foreground/70 transition-all hover:translate-x-1 hover:bg-white/8 hover:text-white data-[active=true]:bg-[#e69a68] data-[active=true]:font-bold data-[active=true]:text-[#173a34] data-[active=true]:shadow-lg"
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
