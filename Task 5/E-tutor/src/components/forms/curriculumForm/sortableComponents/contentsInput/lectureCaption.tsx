import { useFormContext } from "react-hook-form";
import CustomButton from "../../../../ui/button";

const LectureCaption = ({
  baseName,
  handleSubmit,
  handleCancel,
}: {
  baseName: string;
  handleSubmit: () => void;
  handleCancel: () => void;
}) => {
  const { register } = useFormContext();
  return (
    <>
      <div className="w-full flex flex-col gap-1.5">
        <label htmlFor="lecture_caption" className="body-md-400">
          Caption
        </label>
        <textarea
          placeholder="Write your lecture description here..."
          rows={8}
          className="outline-none border border-gray-100 px-4.5 py-3 body-md-400"
          {...register(`${baseName}.caption`)}
        />
      </div>
      <div className="w-full flex justify-between">
        <CustomButton
          className="bg-gray-50"
          variant="tertiary-gray"
          onClick={handleCancel}
        >
          <span>Cancel</span>
        </CustomButton>
        <CustomButton onClick={handleSubmit}>
          <span>Add Caption</span>
        </CustomButton>
      </div>
    </>
  );
};

export default LectureCaption;
