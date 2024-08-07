import { DataProps } from "@/App";
import { CsvImporter } from "@/components/csv-importer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ActionsProps {
  names: DataProps;
  setNames: React.Dispatch<React.SetStateAction<DataProps>>;
  randomizeName: () => void;
  isNewChance?: boolean;
}
export default function Actions({
  names,
  setNames,
  randomizeName,
  isNewChance = false,
}: ActionsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <CsvImporter
        fields={[
          { label: "Name", value: "name", required: true },
          { label: "Empresa", value: "corporation", required: true },
        ]}
        onImport={(parsedData) => {
          const formattedData: DataProps = parsedData
            .map((item) => ({
              name: String(item.name ?? ""),
              corporation: String(item.corporation ?? ""),
            }))
            .filter(function (item, pos, self) {
              return (
                self.findIndex(
                  (itemSelf) =>
                    itemSelf.name === item.name &&
                    item.corporation === itemSelf.corporation
                ) == pos
              );
            });

          setNames((prev) => [...prev, ...formattedData]);
        }}
      />
      <Button
        variant="outline"
        className="text-[#76BC21] hover:text-[#76BC21] text-[35px] w-[880px] font-medium h-fit"
        onClick={() =>
          names.length > 0
            ? randomizeName()
            : toast.error("Por favor forneça uma lista de nomes")
        }
      >
        {isNewChance ? "SORTEAR NOVAMENTE!" : "SORTEAR VENCEDOR!"}&nbsp;
        {names.length > 0 && `(${names.length})`}
      </Button>
    </div>
  );
}
