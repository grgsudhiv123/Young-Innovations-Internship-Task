import { useRef, type ChangeEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomButton from "../../../../ui/button";
import { BookIcon } from "@phosphor-icons/react";

type FilePayload = {
  file: File;
  url: string;
  name: string;
  size: number;
  type: string;
};

const LectureFiles = ({
  baseName,
  handleSubmit,
  handleCancel,
}: {
  baseName: string;
  handleSubmit: () => void;
  handleCancel: () => void;
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { watch } = useFormContext();

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (payload: FilePayload) => void
  ) => {
    e.stopPropagation();
    const file = e?.target.files?.[0];

    if (!file) return;

    const payload = {
      file: file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
    };

    onChange(payload);
  };

  const handleFileClick = () => {
    fileRef.current?.click();
  };

  return (
    <>
      <Controller
        name={`${baseName}.lecture_file`}
        render={({ field, fieldState }) => {
          console.log(`${baseName}.lecture_file`, fieldState);
          const currentFile = watch(`${baseName}.lecture_file`);
          const isError = fieldState.error;
          if (isError)
            console.log("Lecture file error : ", fieldState.error?.message);
          return (
            <>
              {currentFile ? (
                <div className="flex flex-row justify-between w-full p-5 space-y-2 border border-gray-100 hover:bg-gray-50 transform-all ease-in-out duration-200">
                  <div className="flex gap-2">
                    <BookIcon size={24} />
                    <a
                      href={currentFile.url.replace("blob:", "")}
                      target="_blank"
                      className="capitalize"
                    >
                      {currentFile.name}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleFileClick}
                    className="hover:text-secondary-500 p-1 rounded-sm transition-all ease-in-out duration-200 cursor-pointer border border-gray-100"
                  >
                    Replace File
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="relative w-full p-6 border border-gray-100  hover:bg-gray-50 transform-all duration-200 ease-in-out cursor-pointer"
                  onClick={handleFileClick}
                >
                  <input
                    type="file"
                    className="hidden"
                    ref={fileRef}
                    accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => handleFileChange(e, field.onChange)}
                  />
                  <div className="w-full flex flex-col justify-center gap-2">
                    <p className="body-lg-500">Attach File</p>
                    <p className="body-md-400 text-gray-500">
                      Drag an drop a file or
                      <span className="text-gray-700"> browse file</span>
                    </p>
                  </div>

                  {isError && (
                    <span className="absolute bottom-0 left-0 translate-y-full text-primary-500 text-xs">
                      {isError.message}
                    </span>
                  )}
                </button>
              )}
            </>
          );
        }}
      />

      <div className="w-full flex justify-between">
        <CustomButton
          className="bg-gray-50"
          variant="tertiary-gray"
          onClick={handleCancel}
        >
          <span>Cancel</span>
        </CustomButton>
        <CustomButton onClick={handleSubmit}>
          <span>Upload Video</span>
        </CustomButton>
      </div>
    </>
  );
};

export default LectureFiles;
