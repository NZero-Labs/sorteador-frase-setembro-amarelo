import { cn } from "@/lib/utils";
import React, { useState } from "react";
import "./index.css";
import { Card } from "@/components/ui/card";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import Actions from "@/components/actions";
import { useEventListener } from "@/hooks/use-event-listener";
import phrases from "./data/phrases.json";
import {
  BrowserView,
  MobileView,
  isMobile,
  isTablet,
} from "react-device-detect";

export type DataProps = Array<{
  frase: string;
}>;
export default function App() {
  const [name, setName] = useState<DataProps[number] | undefined>();
  const [names, setNames] = useState<DataProps>(phrases);
  const [showEditor, setShowEditor] = useState(true);
  const [isFinal, setIsFinal] = useState(false);
  const [cancelAnimation, setCancelAnimation] = useState(false);
  console.log("🚀 ~ App ~ cancelAnimation:", cancelAnimation);
  const [isLoading, setIsLoading] = useState(false);
  const [autoCounter, setAutoCounter] = useState(3);
  const isMobileDevice = isMobile || isTablet;
  const randomizeName = () => {
    const index = Math.floor(Math.random() * names.length);
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
    <React.Fragment>
      {isFinal && !cancelAnimation && !isMobileDevice && (
        <Fireworks autorun={{ speed: 3 }} />
      )}
      <header
        className={`${
          isMobileDevice ? "h-[70px]" : "h-[130px]"
        } bg-white w-full flex items-center justify-center z-50 relative`}
      >
        <BrowserView>
          <img
            className="absolute left-0 top-0"
            src="flowerTop.png"
            alt="girasol"
          />
          {name && (
            <img
              className="absolute right-0 top-0 -scale-x-100"
              src="flowerTop.png"
              alt="girasol"
            />
          )}
        </BrowserView>

        <MobileView>
          {!name && (
            <React.Fragment>
              <img
                className="absolute left-0 top-0"
                src="flowerTopMobile.png"
                alt="girasol"
              />

              <img
                className="absolute right-0 top-0 -scale-x-100"
                src="flowerTopMobile.png"
                alt="girasol"
              />
            </React.Fragment>
          )}
          {name && (
            <img
              className="absolute top-[70px] right-0 -scale-y-100"
              src="flowerBottomMobile.png"
              alt="girasol"
            />
          )}
        </MobileView>

        <img
          src="logo.png"
          alt="Logo Amara"
          className={`${
            isMobileDevice
              ? "h-[50px] object-contain"
              : "h-[100px] object-contain"
          }`}
        />
        {isLoading && !isMobileDevice && (
          <div className="flex flex-col text-[60px] font-normal text-center text-white tracking-wide">
            <img
              className="h-[100px] object-contain"
              src="septemberYellowLogo.png"
              alt="Logo Setembro Amarelo"
            />
          </div>
        )}
        {isFinal && (
          <div className="flex flex-col text-[30px] text-center text-[#00953b]"></div>
        )}
      </header>
      <main
        className={cn(
          "flex flex-col items-center justify-center w-full h-full relative bg-app-background"
        )}
      >
        {name && !isLoading && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-10 p-10 relative">
            <div className="flex flex-col text-[60px] font-normal text-center text-white tracking-wide">
              <img
                src="septemberYellowLogo.png"
                alt="Logo Setembro Amarelo"
                className={`${isMobileDevice ? "w-[145px]" : "w-[80%]"}`}
              />
            </div>
            <BrowserView>
              <Card className="h-[200px] w-[1175px] overflow-hidden word flex flex-col items-center justify-center border-[#00953B] border-2 px-[134px] py-[89px]">
                <p className="gradient-phrase text-[45px] font-extrabold text-wrap text-center">
                  {name?.frase}
                </p>
              </Card>
              <div className="mt-14 text-center">
                <h3 className="text-[hsl(var(--primary-yellow))] text-[37px] font-bold">
                  Setembro Amarelo - Mês de Prevenção ao Suicídio
                </h3>
                <p className="text-[27px] m-0 ">
                  Se precisar, peça ajuda! (Disque 188 - Centro de Valorização
                  da Vida)
                </p>
              </div>
            </BrowserView>
            <MobileView className="flex flex-col justify-center items-center">
              <Card
                className="p-2
               overflow-hidden word flex flex-col items-center justify-center border-[#00953B] border-2 "
              >
                <p className="gradient-phrase text-[20px] font-extrabold text-wrap text-center ">
                  {name?.frase}
                </p>
              </Card>
              <div className="absolute text-center w-[230px]">
                <h3 className="text-[hsl(var(--primary-yellow))] text-[10px] font-bold">
                  Setembro Amarelo - Mês de Prevenção ao Suicídio
                </h3>
                <p className="text-[10px] m-0 ">
                  Se precisar, peça ajuda! (Disque 188 - Centro de Valorização
                  da Vida)
                </p>
              </div>
            </MobileView>
          </div>
        )}
        {isLoading && (
          <>
            <div className="gradient-bg"></div>
            <div
              className={`${
                isMobileDevice ? "justify-around" : "justify-center"
              } flex flex-col absolute top-0 left-0 items-center w-full h-full`}
            >
              <MobileView>
                <div className="flex flex-col text-[60px] font-normal text-center text-white tracking-wide">
                  <img
                    src="septemberYellowLogoWhite.png"
                    alt="Logo Setembro Amarelo"
                    className="w-[238px]"
                  />
                </div>
              </MobileView>
              <div
                className={`${
                  isMobileDevice
                    ? "text-[109px] min-w-[220px] p-[2rem]"
                    : "text-[250px] min-w-[450px] p-10"
                } bg-white/50 rounded-full border-2 border-[#E6B20A] font-bold  z-10  text-[#E6B20A] text-center`}
              >
                {autoCounter}
              </div>
              <BrowserView>
                <div className="text-center">
                  <h3 className="text-black text-opacity-45 text-[37px] font-bold ">
                    Setembro Amarelo - Mês de Prevenção ao Suicídio
                  </h3>
                  <p className="text-black text-opacity-45 text-[27px] m-0 ">
                    Se precisar, peça ajuda! (Disque 188 - Centro de Valorização
                    da Vida)
                  </p>
                </div>
              </BrowserView>
              <MobileView>
                <div
                  className={`text-center items-start justify-between mb-20 bg-inherit w-full h-[100px] flex z-50 relative`}
                >
                  <div>
                    <h3
                      className={`text-[hsl(var(--primary-yellow))] text-[10px] font-bold`}
                    >
                      Setembro Amarelo - Mês de Prevenção ao Suicídio
                    </h3>
                    <p className={`text-[10px] m-0`}>
                      Se precisar, peça ajuda! (Disque 188 - Centro de
                      Valorização da Vida)
                    </p>
                  </div>
                </div>
              </MobileView>
            </div>
          </>
        )}
        {!isLoading && !name && (
          <React.Fragment>
            <div className="w-full h-full flex flex-col items-center justify-center p-5 gap-10">
              <div className="flex flex-col text-[60px] font-normal text-center text-white tracking-wide">
                <img
                  src="septemberYellowLogo.png"
                  alt="Logo Setembro Amarelo"
                  className={`${isMobileDevice ?? "w-[238px]"}`}
                />
              </div>
              {showEditor && (
                <Actions
                  names={names}
                  setNames={setNames}
                  randomizeName={randomizeName}
                  isMobileDevice={isMobileDevice}
                />
              )}
              <MobileView>
                <div
                  className={`text-center items-start justify-between mb-20 bg-inherit w-full h-[100px] flex z-50 relative`}
                >
                  <div>
                    <h3
                      className={`text-[hsl(var(--primary-yellow))] text-[10px] font-bold`}
                    >
                      Setembro Amarelo - Mês de Prevenção ao Suicídio
                    </h3>
                    <p className={`text-[10px] m-0`}>
                      Se precisar, peça ajuda! (Disque 188 - Centro de
                      Valorização da Vida)
                    </p>
                  </div>
                </div>
              </MobileView>
            </div>
            {showEditor && (
              <BrowserView>
                <div
                  className={`items-start justify-between pl-28 mb-20 bg-inherit w-full h-[100px] flex z-50 relative`}
                >
                  <div>
                    <h3
                      className={`text-[hsl(var(--primary-yellow))] text-[37px] font-bold`}
                    >
                      Setembro Amarelo - Mês de Prevenção ao Suicídio
                    </h3>
                    <p className={`text-[27px] m-0`}>
                      Se precisar, peça ajuda! (Disque 188 - Centro de
                      Valorização da Vida)
                    </p>
                  </div>
                </div>
              </BrowserView>
            )}
          </React.Fragment>
        )}
        <BrowserView>
          <img
            className={`absolute right-0 bottom-0`}
            src="flowerBottom.png"
            alt="girasol"
          />
        </BrowserView>
        <MobileView>
          <img
            className={`absolute right-0 bottom-0`}
            src="flowerBottomMobile.png"
            alt="girasol"
          />
        </MobileView>

        {isLoading ||
          (name && (
            <React.Fragment>
              <BrowserView>
                <img
                  className={`absolute left-0 bottom-0 -scale-x-100`}
                  src="flowerBottom.png"
                  alt="girasol"
                />
              </BrowserView>
              <MobileView>
                <img
                  className={`absolute right-0 bottom-0`}
                  src="flowerBottomMobile.png"
                  alt="girasol"
                />
              </MobileView>
            </React.Fragment>
          ))}
      </main>
    </React.Fragment>
  );
}
