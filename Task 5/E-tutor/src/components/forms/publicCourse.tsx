import { Controller, useFormContext } from "react-hook-form";
import FormButtons from "../common/tab/formButtons";
import { MagnifyingGlassIcon, X } from "@phosphor-icons/react";

const PublicCourseForm = ({ setStep }: { setStep: (step: number) => void }) => {
  const { trigger } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger([
      "courseDescription",
      "courseTeach",
      "targetAudience",
      "courseRequirements",
    ]);
    if (!isValid) return;
  };
  const handlePrevious = () => {
    setStep(2);
  };
  return (
    <>
      <div className="w-full py-8 px-10 border-b border-gray-100 space-y-10">
        <div className="w-full space-y-6">
          <p className="body-xl-500 text-gray-900">Message</p>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6 space-y-1.5">
              <p className="body-md-400">Welcome Message</p>
              <Controller
                name="welcome_message"
                render={({ fields }) => {
                  return (
                    <textarea
                      name="welcome_message"
                      id="welcome_message"
                      placeholder="Enter course starting message here..."
                      className="w-full outline-none border border-gray-100 px-4.5 py-4"
                      rows={5}
                    />
                  );
                }}
              />
            </div>
            <div className="col-span-6 space-y-1.5">
              <p className="body-md-400">Congratulations Message</p>
              <Controller
                name="congratulation_message"
                render={({ fields }) => {
                  return (
                    <textarea
                      name="congratulation_message"
                      id="congratulation_message"
                      placeholder="Enter your course completed message here..."
                      className="w-full outline-none border border-gray-100 px-4.5 py-4"
                      rows={5}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-full space-y-6">
          <p className="body-xl-500 text-gray-900">Add Instructor (02)</p>
          <div className="max-w-152 w-full flex flex-row py-4.5 px-3 border border-gray-100">
            <MagnifyingGlassIcon size={24} />
            <input
              type="text"
              className="w-full outline-none ml-3"
              placeholder="Search by username"
            />
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4 flex w-full justify-between p-4 bg-gray-50 hover:bg-gray-100 transform-all ease-in-out duration-200 cursor-pointer">
              <div className="w-full flex gap-3">
                <div className="size-12 aspect-square rounded-full overflow-hidden">
                  <img
                    src="../../assets/navbar/dummyuserphoto.jpg"
                    alt="dummyuserphoto"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="body-md-600 text-gray-900">Username</p>
                  <p className="body-md-400 text-gray-600">UI/UX Designer</p>
                </div>
              </div>
              <button
                type="button"
                className="text-gray-900 hover:text-gray-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <div className="col-span-4 flex w-full justify-between p-4 bg-gray-50 hover:bg-gray-100 transform-all ease-in-out duration-200 cursor-pointer">
              <div className="w-full flex gap-3">
                <div className="size-12 aspect-square rounded-full overflow-hidden">
                  <img
                    src="../../assets/navbar/dummyuserphoto.jpg"
                    alt="dummyuserphoto"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="body-md-600 text-gray-900">Username</p>
                  <p className="body-md-400 text-gray-600">UI/UX Designer</p>
                </div>
              </div>
              <button
                type="button"
                className="text-gray-900 hover:text-gray-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

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

export default PublicCourseForm;
