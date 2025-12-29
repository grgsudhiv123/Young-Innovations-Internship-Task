import { Controller } from "react-hook-form";

const LectureCaption = () => {
  return (
    <Controller
      name="lecture_caption"
      render={({ fields }) => {
        return (
          <div className="w-full flex flex-col gap-1.5">
            <label htmlFor="lecture_caption" className="body-md-400">
              Caption
            </label>
            <textarea
              name="lecture_caption"
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

export default LectureCaption;
