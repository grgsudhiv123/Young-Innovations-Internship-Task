import {
  ImageSquareIcon,
  PlayCircleIcon,
  UploadSimpleIcon,
} from "@phosphor-icons/react";
import CustomButton from "../../ui/button";
import ArrayInputFields from "./teachingsInputFields";
import FormButtons from "../../common/tab/formButtons";

import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { Controller, useFormContext } from "react-hook-form";

const AdvanceInfoForm = ({ setStep }: { setStep: (step: number) => void }) => {
  const { control, trigger, getValues } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger([
      "courseDescription",
      "courseTeach",
      "targetAudience",
      "courseRequirements",
    ]);
    console.log(isValid);
    const data = getValues("courseDescription");
    console.log(data);
    if (!isValid) return;
  };
  const handlePrevious = () => {
    setStep(0);
  };

  return (
    <>
      <div className="w-full py-8 px-10 border-b border-gray-100">
        <div className="grid grid-cols-12 gap-12 w-full">
          <div className="col-span-6 w-full">
            <span className="body-xl-500 text-gray-900">Course Thumbnail</span>
            <div className="w-full flex gap-12  mt-4">
              <div className="max-w-[288px] w-full h-40 flex items-center justify-center bg-gray-50">
                <ImageSquareIcon size={124} className="text-gray-300" />
              </div>
              <div className="space-y-6">
                <p className="body-md-400 text-gray-600">
                  Upload your course Thumbnail here.{" "}
                  <span className="text-gray-900 body-md-500">
                    {" "}
                    Important guidelines:
                  </span>
                  1200x800 pixels or 12:8 Ratio. Supported format:
                  <span className="text-gray-900 body-md-500">
                    .jpg, .jpeg, or .png
                  </span>
                </p>
                <CustomButton variant="light-primary">
                  <span className="flex items-center gap-3">
                    <span>Upload Image</span>
                    <UploadSimpleIcon size={24} />
                  </span>
                </CustomButton>
              </div>
            </div>
          </div>
          <div className="col-span-6 w-full">
            <span className="body-xl-500 text-gray-900">Course Thumbnail</span>
            <div className="w-full flex gap-12 mt-4">
              <div className="max-w-[288px] w-full h-40 flex items-center justify-center bg-gray-50">
                <PlayCircleIcon size={124} className="text-gray-300" />
              </div>
              <div className="space-y-6">
                <p className="body-md-400 text-gray-600">
                  Students who watch a well-made promo video are 5X more likely
                  to enroll in your course. We've seen that statistic go up to
                  10X for exceptionally awesome videos.
                </p>

                <CustomButton variant="light-primary">
                  <span className="flex items-center gap-3">
                    <span>Upload Video</span>
                    <UploadSimpleIcon size={24} />
                  </span>
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-8 px-10 border-b border-gray-100">
        <span className="body-xl-500 text-gray-900">Course Descriptions</span>
        <div>
          <Controller
            name="courseDescription"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <ReactQuill
                    {...field}
                    theme="snow"
                    className="h-50 border-gray-100"
                  />
                  {fieldState.error && fieldState.error.message}
                </>
              );
            }}
          />
        </div>
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
