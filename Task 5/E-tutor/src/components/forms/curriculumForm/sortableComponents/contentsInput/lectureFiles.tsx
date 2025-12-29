import React from "react";
import { Controller } from "react-hook-form";

const LectureFiles = () => {
  return (
    <Controller
      name="lecture_file"
      render={({ fields }) => {
        return (
          <button
            type="button"
            className="w-full p-6 border border-gray-100  hover:bg-gray-50 transform-all duration-200 ease-in-out cursor-pointer"
          >
            <input type="file" className="hidden" />
            <div className="w-full flex flex-col justify-center gap-2">
              <p className="body-lg-500">Attach File</p>
              <p className="body-md-400 text-gray-500">
                Drag an drop a file or
                <span className="text-gray-700"> browse file</span>
              </p>
            </div>
          </button>
        );
      }}
    />
  );
};

export default LectureFiles;
