import { useState } from "react";

import TabButtons from "../components/common/tab/tabButtons";
import ActiveTabContents from "../components/common/tab/tabContents";
import { FormProvider, useForm } from "react-hook-form";

const NewCoursePage = () => {
  const methods = useForm();

  const [step, setStep] = useState(0);

  return (
    <FormProvider {...methods}>
      <div className="max-w-330 w-full h-fit mx-auto bg-white pb-10">
        <TabButtons setStep={setStep} step={step} />
        <ActiveTabContents step={step} />
      </div>
    </FormProvider>
  );
};

export default NewCoursePage;
