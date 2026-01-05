import { Controller, useFormContext } from "react-hook-form";
import CustomButton from "../../../../ui/button";
import clsx from "clsx";

const LectureCaption = ({
  setIsOpen,
  baseName,
  handleCancel,
}: {
  setIsOpen: (isOpen: boolean) => void;
  baseName: string;
  handleCancel: () => void;
}) => {
  const { control, trigger } = useFormContext();

  const handleSubmit = async () => {
    const isValid = await trigger([`${baseName}.caption`]);
    console.log(`${baseName}.caption isValid : `, isValid);
    if (isValid) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-1.5">
        <label htmlFor="lecture_caption" className="body-md-400">
          Caption
        </label>

        <Controller
          name={`${baseName}.caption`}
          control={control}
          render={({ field, fieldState }) => {
            const isError = fieldState.error;
            console.log(`${baseName}.caption error : `, isError?.message);
            console.log("caption error : ", isError ? true : false);
            return (
              <div className="relative w-full">
                <textarea
                  placeholder="Write your lecture description here..."
                  rows={8}
                  className={clsx(
                    "w-full outline-none border border-gray-100 px-4.5 py-3 body-md-400",
                    isError
                      ? "focus-within:border-primary-500 bg-primary-100"
                      : "focus-within:border-gray-200"
                  )}
                  value={field.value}
                  onChange={field.onChange}
                />
                {isError && (
                  <span className="absolute bottom-0 left-0 translate-y-full text-primary-500 text-xs">
                    {isError.message}
                  </span>
                )}
              </div>
            );
          }}
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
