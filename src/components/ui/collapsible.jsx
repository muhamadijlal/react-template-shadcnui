import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { cn } from "@src/lib/utils";

function Collapsible({ children, className, ...props }) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible-primitive"
      className={cn("group/collapsible-trigger w-full", className)}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Root>
  );
}

function CollapsibleTrigger({ children, className, ...props }) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn("flex w-full cursor-pointer items-center", className)}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Trigger>
  );
}

function CollapsibleContent({ children, className, ...props }) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn("space-y-2", className)}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Panel>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
