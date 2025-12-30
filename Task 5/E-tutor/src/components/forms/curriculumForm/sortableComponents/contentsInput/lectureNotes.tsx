import { useRef } from "react";
import { Controller } from "react-hook-form";

const LectureNotes = () => {
  const noteFileRef = useRef<HTMLInputElement | null>(null);
  return (
    <Controller
      name="lecture_notes"
      render={({ field }) => {
        return (
          <div className="w-full space-y-6">
            <div className="w-full flex flex-col gap-1.5">
              <label htmlFor="lecture_notes" className="body-md-400">
                Notes
              </label>
              <textarea
                placeholder="Write your lecture Notes here..."
                rows={8}
                className="outline-none border border-gray-100 px-4.5 py-3 body-md-400"
                {...field}
              />
            </div>

            <button
              type="button"
              className="w-full p-6 border border-gray-100  hover:bg-gray-50 transform-all duration-200 ease-in-out cursor-pointer"
            >
              <input ref={noteFileRef} type="file" className="hidden" />
              <div className="w-full flex flex-col justify-center gap-2">
                <p className="body-lg-500">Upload Notes</p>
                <p className="body-md-400 text-gray-500">
                  Drag an drop a file or
                  <span className="text-gray-700"> browse file</span>
                </p>
              </div>
            </button>
          </div>
        );
      }}
    />
  );
};

export default LectureNotes;
