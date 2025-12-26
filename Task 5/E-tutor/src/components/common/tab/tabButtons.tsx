import { useEffect, useRef } from "react";
import { multistepFormConstants } from "../../../utils/constants/multiStepFormConstants";
import clsx from "clsx";
import ActiveFormHeading from "./formheading";

type TabButtonsType = {
  step: number;
  setStep: (step: number) => void;
};

const TabButtons = ({ step, setStep }: TabButtonsType) => {
  const buttonRef = useRef<(HTMLButtonElement | null)[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeTabButton = buttonRef.current[step];
    const slider = sliderRef.current;

    if (!activeTabButton || !slider) {
      return;
    }

    slider.style.width = `${activeTabButton.offsetWidth}px`;
    slider.style.transform = `translateX(${activeTabButton.offsetLeft}px)`;
  }, [step]);

  return (
    <>
      <div className="relative w-full grid grid-cols-4 gap-6 border-b border-gray-100">
        {multistepFormConstants &&
          multistepFormConstants.map((item, i) => {
            const Icon = item.icon;
            const isActive = step === i;
            return (
              <button
                type="button"
                ref={(el) => {
                  buttonRef.current[i] = el;
                }}
                onClick={() => setStep(i)}
                key={i}
                data-stepbtn={i}
                className=" col-span-1 flex justify-between p-5 cursor-pointer text-gray-600 tabButtons"
              >
                <span className="flex flex-row gap-2">
                  <Icon
                    size={24}
                    className={clsx(
                      isActive ? "text-primary-500" : "text-gray-600"
                    )}
                  />
                  <span
                    className={clsx(
                      isActive ? "text-gray-900" : "text-gray-600",
                      "body-lg-500"
                    )}
                  >
                    {item.title}
                  </span>
                </span>
                {<span className="body-sm-500 text-success-500">7/12</span>}
              </button>
            );
          })}
        <div
          ref={sliderRef}
          className={clsx(
            `absolute left-0 bottom-0 bg-warning-500 h-1 w-5 transition-all duration-200 ease-in-out`
          )}
        ></div>
      </div>
      <ActiveFormHeading ActiveFormStep={multistepFormConstants[step].title} />
    </>
  );
};

export default TabButtons;
