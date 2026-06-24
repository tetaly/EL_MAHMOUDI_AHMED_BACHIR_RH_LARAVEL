export default function AppLogo() {
    return (
        <>
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                RH
            </div>
            <div className="ml-2 grid text-left">
                <span className="truncate text-base leading-tight font-bold tracking-tight text-foreground">
                    RH Manager
                </span>
                <span className="truncate text-[10px] text-muted-foreground">
                    Gestion du personnel
                </span>
            </div>
        </>
    );
}
