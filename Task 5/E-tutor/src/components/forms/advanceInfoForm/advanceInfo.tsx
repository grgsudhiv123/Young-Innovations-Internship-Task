import ArrayInputFields from "./teachingsInputFields";
import FormButtons from "../../common/tab/formButtons";

import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";
import MediaUploadComp from "./mediaUploadComp";

const AdvanceInfoForm = ({ setStep }: { setStep: (step: number) => void }) => {
  const { control, trigger } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger([
      "courseDescription",
      "courseTeach",
      "targetAudience",
      "courseRequirements",
    ]);
    if (!isValid) return;

    setStep(2);
  };
  const handlePrevious = () => {
    setStep(0);
  };

  return (
    <>
      <div className="w-full py-8 px-10 border-b border-gray-100">
        <MediaUploadComp />
      </div>
      <div className="w-full py-8 px-10 border-b border-gray-100">
        <span className="body-xl-500 text-gray-900">Course Descriptions</span>
        <Controller
          name="courseDescription"
          control={control}
          render={({ field, fieldState }) => {
            const isError = !!fieldState.error;
            return (
              <div className="w-full mt-4">
                <ReactQuill
                  {...field}
                  placeholder="Enter you course descriptions"
                  className={clsx(
                    "w-full border rounded body-lg-400",
                    isError
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-50 bg-white"
                  )}
                />
                {fieldState.error && (
                  <p className="mt-2 text-sm text-primary-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            );
          }}
        />
      </div>

      <ArrayInputFields
        title="What you will teach in this course "
        fieldName="courseTeach"
        placeholder="What you will teach in this course..."
      />
      <ArrayInputFields
        title="Target Audience  "
        fieldName="targetAudience"
        placeholder="Who this course is for..."
      />
      <ArrayInputFields
        title="Course requirements "
        fieldName="courseRequirements"
        placeholder="What is you course requirements..."
      />
      <div className="px-10">
        <FormButtons
          handleNextBtn={handleNext}
          handlePreviosBtn={handlePrevious}
          prevButtonLabel="Previous"
        />
      </div>
    </>
  );
};

export default AdvanceInfoForm;
