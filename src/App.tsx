import { cn } from "@/lib/utils";
import React, { useState } from "react";
import "./index.css";
import { Card } from "@/components/ui/card";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import Actions from "@/components/actions";
import { useEventListener } from "@/hooks/use-event-listener";
export type DataProps = Array<{
  name: string;
  corporation: string;
}>;
export default function App() {
  const [name, setName] = useState<DataProps[number] | undefined>();
  const [names, setNames] = useState<DataProps>([]);
  const [showEditor, setShowEditor] = useState(true);
  const [isFinal, setIsFinal] = useState(false);
  const [cancelAnimation, setCancelAnimation] = useState(false);
  console.log("🚀 ~ App ~ cancelAnimation:", cancelAnimation);
  const [isLoading, setIsLoading] = useState(false);
  const [autoCounter, setAutoCounter] = useState(5);

  const randomizeName = () => {
    let index = Math.floor(Math.random() * names.length);
    setIsFinal(false);
    setIsLoading(true);
    setShowEditor(false);
    setCancelAnimation(false);
    setAutoCounter(5);
    const autoCounterInterval = setInterval(() => {
      setAutoCounter((v) => v - 1);
    }, 1000);
    setTimeout(() => {
      setName(names[index]);
      setIsFinal(true);
      setIsLoading(false);
      clearInterval(autoCounterInterval);
      setAutoCounter(5);
      const newNames = [...names];
      newNames.splice(index, 1);
      setNames(newNames);
    }, 5 * 1000);
  };
  useEventListener("visibilitychange" as keyof WindowEventMap, () => {
    if (document.visibilityState === "visible") {
      setCancelAnimation(false);
    } else {
      setCancelAnimation(true);
    }
  });
  const isBuilding = true;
  if (isBuilding) return <React.Fragment> Em Construção!</React.Fragment>;
  return (
    <>
      {isFinal && !cancelAnimation && <Fireworks autorun={{ speed: 3 }} />}
      <header className="bg-white w-full h-[130px] flex items-center justify-center z-50 relative">
        <img
          src="logo.png"
          alt="Logo Amara"
          className="h-[100px] object-contain"
        />
        {isFinal && (
          <div className="flex flex-col text-[30px] text-center text-[#00953b]">
            PREMIAÇÃO
            <span className="bg-[#C1D116] px-3">INTERSOLAR!</span>
          </div>
        )}
      </header>
      <main
        className={cn(
          "flex flex-col items-center justify-center w-full h-full relative",
          (!isFinal || name) &&
            "bg-gradient-to-r from-[#00953B] via-[#76BC21] to-[#C1D116]"
        )}
      >
        {name && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-10 p-10">
            <p className="text-white font-bold text-[50px]">Parabéns!</p>
            <Card className="w-full min-w-full overflow-hidden word flex flex-col items-center justify-center border-[#00953B] border-2">
              <p className="text-[80px] text-wrap text-center break-all text-[#76BC21]">
                {name?.name}
              </p>
              <p className="text-[35px] break-all text-center font-bold text-[#C1D116]">
                {name?.corporation}
              </p>
            </Card>
            <p className="border-b-2 text-white font-bold text-[50px]">
              Você foi o vencedor do Sorteio!
            </p>
            <Actions
              names={names}
              setNames={setNames}
              randomizeName={randomizeName}
              isNewChance
            />
          </div>
        )}
        {isLoading && (
          <>
            <div className="gradient-bg"></div>
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
              <div className="rounded-full border-2 font-bold p-10 z-10 text-[250px] min-w-[450px] text-white text-center">
                {autoCounter}
              </div>
            </div>
          </>
        )}
        {showEditor && !isLoading && (
          <div className="w-full h-full flex flex-col items-center justify-start p-5 gap-10">
            <div className="flex flex-col text-[60px] font-normal text-center text-white tracking-wide">
              PREMIAÇÃO
              <span className="bg-[#C1D116] px-3">INTERSOLAR!</span>
            </div>
            <img
              src="banner.png"
              alt="banner premiação"
              className="object-cover w-[350px]"
            />
            <Actions
              names={names}
              setNames={setNames}
              randomizeName={randomizeName}
            />
          </div>
        )}
      </main>
      <footer className="bg-white w-full h-[100px] flex items-center justify-around z-50 relative">
        <img
          src="dah-logo.png"
          alt="Logo DAH"
          className="h-[48px] object-contain bg-transparent mix-blend-multiply"
        />
        <img
          src="hoymiles-logo.png"
          alt="Logo HOYMILES"
          className="h-[50px] object-contain bg-transparent mix-blend-multiply"
        />
        <img
          src="sungrow-logo.png"
          alt="Logo SUNGROW"
          className="h-[50px] object-contain bg-transparent mix-blend-multiply"
        />
        <img
          src="solis-logo.png"
          alt="Logo SOLIS"
          className="h-[50px] object-contain bg-transparent mix-blend-multiply"
        />
      </footer>
    </>
  );
}
