import { DataProps } from "@/App";
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
  randomizeName,
  isNewChance = false,
}: ActionsProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* <CsvImporter
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
      /> */}
      <Button
        variant="primary"
        className="text-[35px] w-[880px] hover:bg-[#EECA5C] font-medium h-fit"
        onClick={() =>
          names.length > 0
            ? randomizeName()
            : toast.error("Por favor forneça uma lista de nomes")
        }
      >
        {isNewChance ? "SORTEAR NOVAMENTE!" : "SORTEAR FRASE!"}&nbsp;
        {names.length > 0 && `(${names.length})`}
      </Button>
      <p>Clique aqui e retire uma frase para te inspirar e motivar!</p>
    </div>
  );
}
