import { cn } from "@/lib/utils";
import React, { useState } from "react";
import "./index.css";
import { Card } from "@/components/ui/card";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import Actions from "@/components/actions";
import { useEventListener } from "@/hooks/use-event-listener";
export type DataProps = Array<{
  frase: string;
}>;
export default function App() {
  const [name, setName] = useState<DataProps[number] | undefined>();
  const [names, setNames] = useState<DataProps>([
    { frase: "Você é o melhor" },
    { frase: "Você é o melhor 2" },
    { frase: "Você é o melhor 3" },
  ]);
  const [showEditor, setShowEditor] = useState(true);
  const [isFinal, setIsFinal] = useState(false);
  const [cancelAnimation, setCancelAnimation] = useState(false);
  console.log("🚀 ~ App ~ cancelAnimation:", cancelAnimation);
  const [isLoading, setIsLoading] = useState(false);
  const [autoCounter, setAutoCounter] = useState(3);

  const randomizeName = () => {
    let index = Math.floor(Math.random() * names.length);
    setIsFinal(false);
    setIsLoading(true);
    setShowEditor(false);
    setCancelAnimation(false);
    setAutoCounter(3);
    const autoCounterInterval = setInterval(() => {
      setAutoCounter((v) => v - 1);
    }, 1000);
    setTimeout(() => {
      setName(names[index]);
      setIsFinal(true);
      setIsLoading(false);
      clearInterval(autoCounterInterval);
      setAutoCounter(3);
      const newNames = [...names];
      newNames.splice(index, 1);
      setNames(newNames);
    }, 3 * 1000);
  };
  useEventListener("visibilitychange" as keyof WindowEventMap, () => {
    if (document.visibilityState === "visible") {
      setCancelAnimation(false);
    } else {
      setCancelAnimation(true);
    }
  });

  return (
    <>
      {isFinal && !cancelAnimation && <Fireworks autorun={{ speed: 3 }} />}
      <header className="bg-white w-full h-[130px] flex items-center justify-center z-50 relative">
        <img
          className="absolute left-0 top-0"
          src="flowerTop.png"
          alt="girasol"
        />

        <img
          src="logo.png"
          alt="Logo Amara"
          className="h-[100px] object-contain"
        />
        {isFinal && (
          <div className="flex flex-col text-[30px] text-center text-[#00953b]"></div>
        )}
      </header>
      <main
        className={cn(
          "flex flex-col items-center justify-center w-full h-full relative bg-app-background"
        )}
      >
        {name && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-10 p-10">
            <p className="text-white font-bold text-[50px]">Parabéns!</p>
            <Card className="w-full min-w-full overflow-hidden word flex flex-col items-center justify-center border-[#00953B] border-2">
              <p className="gradient-phrase text-[80px] text-wrap text-center break-all">
                {name?.frase}
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
              <div className="bg-white/50 rounded-full border-2 border-[#E6B20A] font-bold p-10 z-10 text-[250px] min-w-[450px] text-[#E6B20A] text-center">
                {autoCounter}
              </div>
            </div>
          </>
        )}
        {!isLoading && (
          <React.Fragment>
            <div className="w-full h-full flex flex-col items-center justify-center p-5 gap-10">
              <div className="flex flex-col text-[60px] font-normal text-center text-white tracking-wide">
                <img
                  src="septemberYellowLogo.png"
                  alt="Logo Setembro Amarelo"
                />
              </div>
              {showEditor && (
                <Actions
                  names={names}
                  setNames={setNames}
                  randomizeName={randomizeName}
                />
              )}
            </div>
            {showEditor && (
              <div className="bg-inherit w-full h-[100px] flex items-start justify-between z-50 relative pl-28 mb-20">
                <div>
                  <h3 className="text-[hsl(var(--primary-yellow))] text-[28px] font-bold ">
                    Setembro Amarelo - Mês de Prevenção ao Suicídio
                  </h3>
                  <p className="text-[28px] m-0 ">
                    Se precisar, peça ajuda! (Disque 188 - Centro de Valorização
                    da Vida)
                  </p>
                </div>
              </div>
            )}
          </React.Fragment>
        )}

        <img
          className={`absolute right-0 bottom-0`}
          src="flowerBottom.png"
          alt="girasol"
        />
      </main>
    </>
  );
}
