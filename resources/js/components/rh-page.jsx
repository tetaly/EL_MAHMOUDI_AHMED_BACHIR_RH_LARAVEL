import { usePage } from '@inertiajs/react';
export function RhPage({ title, description, action, children }) {
    const flash = usePage().props.flash;
    return (
        <div className="space-y-6 p-4 py-8 md:px-6 md:py-10">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-muted-foreground">{description}</p>
                    )}
                </div>
                {action}
            </div>
            {flash?.success && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-green-800">
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-800">
                    {flash.error}
                </div>
            )}
            {children}
        </div>
    );
}
