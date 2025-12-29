import { Controller } from "react-hook-form";
import CustomButton from "../../../../ui/button";

const LectureVideoInput = () => {
  return (
    <Controller
      name="lecture_video"
      render={({ fields }) => {
        return (
          <div className="w-full space-y-4">
            <div className="w-full flex flex-row justify-between items-center border border-gray-100">
              <input type="file" className="hidden" />
              <span className="body-lg-400 font-normal text-gray-500 ml-4.5 cursor-pointer">
                Upload Files
              </span>
              <CustomButton
                variant="tertiary-gray"
                className="bg-gray-50 hover:bg-gray-100"
              >
                <span>Upload File</span>
              </CustomButton>
            </div>
            <p className="w-full body-md-500 text-gray-600">
              <span className="text-gray-900">Note: </span>
              <span>
                All files should be at least 720p and less than 4.0 GB.
              </span>
            </p>
          </div>
        );
      }}
    />
  );
};

export default LectureVideoInput;
