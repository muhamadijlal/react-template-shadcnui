import { GrRefresh } from "react-icons/gr";
import { PiBell } from "react-icons/pi";
import { Button } from "@src/components/ui/button";
import { useTitlePage } from "@src/context/use-title-page";

function Navbar() {
  const { titlePage } = useTitlePage();

  return (
    <div className="bg-card flex items-center justify-between gap-4 rounded-2xl px-6 py-4">
      <h1 className="truncate text-xl font-bold">{titlePage}</h1>

      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        <Button
          variant="outline"
          size="lg"
          className="bg-primary-foreground hover:text-primary-foreground hover:bg-primary border-primary text-primary cursor-pointer"
        >
          <GrRefresh className="-rotate-90" />
          <span className="hidden sm:block">Refresh (30s)</span>
        </Button>
        <Button variant="outline" size="lg" className="bg-card cursor-pointer">
          <PiBell />
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
