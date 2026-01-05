import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TabButtons from "../components/common/tab/tabButtons";
import ActiveTabContents from "../components/common/tab/tabContents";
import FormButtons from "../components/common/tab/formButtons";

import {
  STEP_SCHEMA,
  type AdvanceInfoType,
  type BasicInfoFormType,
  type CompleteFormType,
  type CurriculumType,
  type PublishCourseType,
} from "../schemas/formSchema";
import {
  saveStepData,
  goToStep,
  type saveStepPayload,
  resetForm,
} from "../features/multistepFormReducer";
import { useAppDispatch, useAppSelector } from "../hooks/multistepFormHook";

const NewCoursePage = () => {
  const dispatch = useAppDispatch();
  const currentStepRedux = useAppSelector(
    (state) => state.multistepForm.CurrentStep
  );

  const defaultValue = useAppSelector((state) => state.multistepForm);

  const [step, setStep] = useState(currentStepRedux - 1);

  const methods = useForm<CompleteFormType>({
    defaultValues: {
      ...defaultValue.step1,
      ...defaultValue.step2,
      ...defaultValue.step3,
      ...defaultValue.step4,
    },
    resolver: zodResolver(STEP_SCHEMA[step]),
  });

  const getStepData = (step: number) => {
    switch (step) {
      case 1:
        return {
          title: methods.getValues("title"),
          subtitle: methods.getValues("subtitle"),
          coursetopic: methods.getValues("coursetopic"),
          courseCategory: methods.getValues("courseCategory"),
          courseSubCategory: methods.getValues("courseSubCategory"),
          subtitleLanguage: methods.getValues("subtitleLanguage"),
          courseLanguage: methods.getValues("courseLanguage"),
          courseLevel: methods.getValues("courseLevel"),
          durations: methods.getValues("durations"),
        };

      case 2:
        return {
          courseThumbnail: methods.getValues("courseThumbnail"),
          courseTrailer: methods.getValues("courseTrailer"),
          courseDescription: methods.getValues("courseDescription"),
          courseTeach: methods.getValues("courseTeach"),
          targetAudience: methods.getValues("targetAudience"),
          courseRequirements: methods.getValues("courseRequirements"),
        };

      case 3:
        return {
          curriculum: methods.getValues("curriculum"),
        };

      case 4:
        return {
          welcome_message: methods.getValues("welcome_message"),
          congratulation_message: methods.getValues("congratulation_message"),
          instructors: methods.getValues("instructors"),
        };
      default:
        break;
    }
  };

  const handleNextStep = async () => {
    const stepFields = [
      [
        "title",
        "subtitle",
        "coursetopic",
        "courseCategory",
        "courseSubCategory",
        "subtitleLanguage",
        "courseLanguage",
        "courseLevel",
        "durations",
      ],
      [
        "courseThumbnail",
        "courseTrailer",
        "courseDescription",
        "courseTeach",
        "targetAudience",
        "courseRequirements",
      ],
      ["curriculum"],
      ["welcome_message", "congratulation_message", "instructors"],
    ];
    const isValid = await methods.trigger(stepFields[step] as string[]);
    console.log(`isvalid ${step}: `, isValid);
    if (!isValid) return;

    if (step <= 3) {
      const currentStepIndex = step + 1;

      const payload: saveStepPayload = (() => {
        switch (currentStepIndex) {
          case 1:
            return {
              step: 1,
              data: getStepData(1) as BasicInfoFormType,
            };
          case 2:
            return { step: 2, data: getStepData(2) as AdvanceInfoType };
          case 3:
            return { step: 3, data: getStepData(3) as CurriculumType };
          case 4:
            return { step: 4, data: getStepData(4) as PublishCourseType };
          default:
            throw new Error("Invalid step index");
        }
      })();

      if (payload) {
        dispatch(saveStepData(payload));
        dispatch(goToStep(currentStepIndex + 1));
        setStep(step + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    if (step === 0) {
      dispatch(resetForm());
      // methods.reset(defaultValue);
    }
    if (step > 0) {
      setStep(step - 1);
      dispatch(goToStep(step));
    }
  };

  const handleFinalSubmit = (data: CompleteFormType) => {
    console.log("Final form data:", data);
  };

  console.log("errors : ", methods.formState.errors);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFinalSubmit)}>
        <div className="max-w-330 w-full h-fit mx-auto bg-white pb-10">
          <TabButtons setStep={setStep} step={step} />
          <ActiveTabContents step={step} />
          <FormButtons
            handlePreviosBtn={handlePreviousStep}
            handleNextBtn={handleNextStep}
            prevButtonLabel="Cancel"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default NewCoursePage;
