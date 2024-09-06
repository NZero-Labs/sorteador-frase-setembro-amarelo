import { DataProps } from "@/App";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ActionsProps {
  names: DataProps;
  setNames: React.Dispatch<React.SetStateAction<DataProps>>;
  randomizeName: () => void;
  isNewChance?: boolean;
  isMobileDevice: boolean;
}
export default function Actions({
  names,
  randomizeName,
  isNewChance = false,
  isMobileDevice,
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
        className={`${
          isMobileDevice
            ? "text-[40px] w-[250px] h-[123px] text-wrap text-center"
            : "text-[70px] w-[983px] h-[165px]"
        }   hover:bg-[#EECA5C] font-medium`}
        onClick={() =>
          names.length > 0
            ? randomizeName()
            : toast.error("Por favor forneça uma lista de nomes")
        }
      >
        {isNewChance ? "SORTEAR NOVAMENTE!" : "SORTEAR FRASE!"}&nbsp;
      </Button>
      <p
        className={`${
          isMobileDevice ? "text-[15px] text-wrap text-center" : "text-[25px]"
        }`}
      >
        Clique aqui e retire uma frase para te inspirar e motivar!
      </p>
    </div>
  );
}
