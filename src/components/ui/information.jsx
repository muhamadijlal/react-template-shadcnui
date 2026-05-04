import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { IoMdInformationCircleOutline } from "react-icons/io";

export function Information({ info }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <IoMdInformationCircleOutline className="text-muted-foreground cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{info}</p>
      </TooltipContent>
    </Tooltip>
  );
}
