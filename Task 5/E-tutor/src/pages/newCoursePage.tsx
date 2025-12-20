import { useState } from "react";

import { multistepFormConstants } from "../utils/constants/multiStepFormConstants";

import BasicInfoForm from "../components/forms/basicInformation";

const NewCoursePage = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-330 w-full h-fit mx-auto bg-white pb-10">
      <div className="w-full grid grid-cols-4 gap-6 border-b border-gray-100">
        {multistepFormConstants &&
          multistepFormConstants.map((item, i) => {
            return (
              <button
                type="button"
                onClick={() => {
                  setStep(i + 1);
                  console.log(step);
                }}
                key={i}
                data-stepBtn={i}
                className="col-span-1 flex justify-between p-5 cursor-pointer text-gray-600"
              >
                <span className="flex flex-row gap-2">
                  {item.icon}
                  <span className="body-lg-500">{item.title}</span>
                </span>
                {<span className="body-sm-500 text-success-500">7/12</span>}
              </button>
            );
          })}
      </div>
      <BasicInfoForm />
    </div>
  );
};

export default NewCoursePage;
