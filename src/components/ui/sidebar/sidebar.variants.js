import { cva } from "class-variance-authority";

export const sidebarLayoutVariants = cva(
  "group/sidebar relative h-screen md:flex md:overflow-hidden w-full",
  {
    variants: {
      size: {
        default: "[--sidebar-width:18rem]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const sidebarMenuVariants = cva(
  "relative flex w-full items-center gap-2 overflow-hidden rounded-full p-5.5 text-left text-sm font-medium text-sidebar-muted-foreground cursor-pointer ring-sidebar-ring outline-hidden transition-[width,height,padding,color,background] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground [&_svg:not(.icon-toggle)]:size-6 [&_svg]:shrink-0",
  {
    variants: {
      type: {
        link: "group/menu-link",
        button: "group/menu-button",
        collapsible: "group/menu-collapsible justify-between",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm",
      },
      active: {
        true: "bg-sidebar-accent text-sidebar-accent-foreground",
        false: "",
      },
    },
    defaultVariants: {
      type: "link",
      size: "default",
      active: false,
    },
  },
);

export const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button cursor-pointer flex w-full items-center gap-2 overflow-hidden rounded-full p-5.5 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent font-medium data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-5.5 [&_svg]:shrink-0 [&_svg]:text-inherit [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default:
          "text-sidebar-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const sidebarMenuLinkVariants = cva(
  "peer/menu-link group/menu-link flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded-full p-5.5 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent font-medium data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-5.5 [&_svg]:shrink-0 [&_svg]:text-inherit [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default:
          "text-sidebar-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
