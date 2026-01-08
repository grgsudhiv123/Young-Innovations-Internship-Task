import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm, type FieldPath } from "react-hook-form";
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
import ActiveFormHeading from "../components/common/tab/formheading";
import {
  FormConstants,
  multistepFormConstants,
  type FormConstantsType,
} from "../utils/constants/multiStepFormConstants";
import { toast } from "react-toastify";
import FieldsModel from "../components/common/formModels/fieldsModel";
import { Outlet, useLocation, useNavigate } from "react-router";
import { PageRoutes } from "../enum/routes";

const stepFields: FieldPath<CompleteFormType>[][] = [
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

const TOTAL_STEPS = 4;

const NewCoursePage = () => {
  const dispatch = useAppDispatch();
  const currentStepRedux = useAppSelector(
    (state) => state.multistepForm.CurrentStep
  );

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const defaultValue = useAppSelector((state) => state.multistepForm);

  const [step, setStep] = useState(currentStepRedux - 1);

  const getClonedDefaults = () => {
    return {
      ...defaultValue.step1,
      ...defaultValue.step2,
      curriculum: JSON.parse(
        JSON.stringify(defaultValue.step3?.curriculum ?? [])
      ),
      ...defaultValue.step4,
    };
  };

  const methods = useForm<CompleteFormType>({
    defaultValues: getClonedDefaults(),
    resolver: zodResolver(STEP_SCHEMA[step]),
  });

  useEffect(() => {
    methods.reset(getClonedDefaults());
    methods.clearErrors();
  }, [step, defaultValue]);

  const getStepData = useCallback((): saveStepPayload => {
    const currentStepIndex = step + 1;
    switch (currentStepIndex) {
      case 1:
        return {
          step: 1,
          data: {
            title: methods.getValues("title"),
            subtitle: methods.getValues("subtitle"),
            coursetopic: methods.getValues("coursetopic"),
            courseCategory: methods.getValues("courseCategory"),
            courseSubCategory: methods.getValues("courseSubCategory"),
            subtitleLanguage: methods.getValues("subtitleLanguage"),
            courseLanguage: methods.getValues("courseLanguage"),
            courseLevel: methods.getValues("courseLevel"),
            durations: methods.getValues("durations"),
          } as BasicInfoFormType,
        };
      case 2:
        return {
          step: 2,
          data: {
            courseThumbnail: methods.getValues("courseThumbnail"),
            courseTrailer: methods.getValues("courseTrailer"),
            courseDescription: methods.getValues("courseDescription"),
            courseTeach: methods.getValues("courseTeach"),
            targetAudience: methods.getValues("targetAudience"),
            courseRequirements: methods.getValues("courseRequirements"),
          } as AdvanceInfoType,
        };
      case 3:
        return {
          step: 3,
          data: {
            curriculum: methods.getValues("curriculum"),
          } as CurriculumType,
        };
      case 4:
        return {
          step: 4,
          data: {
            welcome_message: methods.getValues("welcome_message"),
            congratulation_message: methods.getValues("congratulation_message"),
            instructors: methods.getValues("instructors"),
          } as PublishCourseType,
        };
      default:
        throw new Error("Invalid step index");
    }
  }, [step, methods]);

  const validateAndSave = useCallback(async () => {
    const isValid = await methods.trigger(stepFields[step]);
    if (!isValid) return false;
    const payload = getStepData();

    if (payload) {
      dispatch(saveStepData(payload));
      toast.success(`Form updated successfully.`);
      return true;
    }
  }, [dispatch, getStepData, methods, step]);

  const handleSave = async () => {
    const saved = await validateAndSave();
    if (saved) {
      toast.success(`Form updated successfully.`);
    }
  };

  const handleFinalSubmit = () => {
    navigate(PageRoutes.CREATE_NEW_COURSE_FORM_DETAIL);
  };

  const handleNextStep = async () => {
    const saved = await validateAndSave();
    if (!saved) {
      return;
    }

    if (step === TOTAL_STEPS - 1) {
      handleFinalSubmit();
      return;
    }
    if (step < 4) {
      const newStep = step + 1;
      dispatch(goToStep(newStep + 1));
      setStep(newStep);
    }
  };

  const handlePreviousStep = () => {
    if (step === 0) {
      dispatch(resetForm());
      return;
    }
    if (step > 0) {
      const newStep = step - 1;
      setStep(newStep);
      dispatch(goToStep(newStep + 1));
    }
  };

  const handleSavePreview = async () => {
    const saved = await validateAndSave();
    if (!saved) return;
    const val = Object.values(FormConstants);
    setSelectedContent(val[step]);
    setIsOpen(true);
  };

  console.log("errors : ", methods.formState.errors);

  const location = useLocation();
  const isChildRoute = location.pathname.includes("form-detail");

  return (
    <>
      <FormProvider key={step} {...methods}>
        <form onSubmit={methods.handleSubmit(handleFinalSubmit)}>
          {isChildRoute ? (
            <></>
          ) : (
            <div className="max-w-330 w-full h-fit mx-auto bg-white pb-10">
              <TabButtons setStep={setStep} step={step} />
              <ActiveFormHeading
                handleSavePreview={handleSavePreview}
                handleSave={handleSave}
                ActiveFormStep={multistepFormConstants[step].title}
              />
              <ActiveTabContents step={step} />
              <FormButtons
                handlePreviosBtn={handlePreviousStep}
                handleNextBtn={handleNextStep}
                prevButtonLabel={currentStepRedux === 1 ? "Cancel" : "Previous"}
                nextButtonLabel={
                  currentStepRedux === 4 ? "Submit" : "Save & Next"
                }
              />
            </div>
          )}
          <Outlet />
        </form>
        <FieldsModel
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedContent={selectedContent as FormConstantsType}
        />
      </FormProvider>
    </>
  );
};

export default NewCoursePage;
