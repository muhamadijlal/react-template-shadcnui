import { cn } from "@src/lib/utils";

export function NavUser({ Icon, username, role, className, ...props }) {
  return (
    <div
      className={cn(
        "bg-background flex items-center rounded-xl px-2 py-4",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <img src={Icon} alt="Users Icon" className="h-auto w-10" />

        <div className="grid text-sm leading-tight">
          <span className="truncate font-bold uppercase">{username}</span>
          <span className="text-muted-foreground text-xs">{role}</span>
        </div>
      </div>
    </div>
  );
}
