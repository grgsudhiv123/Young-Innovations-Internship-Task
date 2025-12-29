import React from "react";
import { Controller } from "react-hook-form";

const LectureDescription = () => {
  return (
    <Controller
      name="lecture_description"
      render={({ fields }) => {
        return (
          <div className="w-full flex flex-col gap-1.5">
            <label htmlFor="lecture_description" className="body-md-400">
              Description
            </label>
            <textarea
              name="lecture_description"
              placeholder="Write your lecture description here..."
              rows={8}
              className="outline-none border border-gray-100 px-4.5 py-3 body-md-400"
            />
          </div>
        );
      }}
    />
  );
};

export default LectureDescription;
