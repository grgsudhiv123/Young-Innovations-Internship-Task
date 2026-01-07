import { useRef, type ChangeEvent } from "react";
import CustomButton from "../../../../ui/button";
import { Controller, useFormContext } from "react-hook-form";
import { BookIcon } from "@phosphor-icons/react";

type FilePayload = {
  url: string;
  name: string;
  size: number;
  type: string;
};

const LectureNotes = ({
  baseName,
  handleSubmit,
  handleCancel,
}: {
  baseName: string;
  handleSubmit: () => void;
  handleCancel: () => void;
}) => {
  const noteFileRef = useRef<HTMLInputElement | null>(null);
  const { control, watch } = useFormContext();

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (payload: FilePayload) => void
  ) => {
    e.stopPropagation();
    const file = e.target.files?.[0];

    if (!file) return;

    const payload = {
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
    };
    onChange(payload);
  };

  const handleClick = () => {
    noteFileRef.current?.click();
  };
  return (
    <>
      <div className="w-full space-y-6">
        <div className="w-full flex flex-col gap-1.5">
          <label htmlFor="lecture_notes" className="body-md-400">
            Notes
          </label>
          <Controller
            control={control}
            name={`${baseName}.lecture_notes.note_text`}
            render={({ field }) => {
              return (
                <textarea
                  placeholder="Write your lecture Notes here..."
                  rows={8}
                  className="outline-none border border-gray-100 px-4.5 py-3 body-md-400"
                  onChange={field.onChange}
                  value={field.value}
                />
              );
            }}
          />
        </div>

        <div className="w-full p-6 border border-gray-100  hover:bg-gray-50 transform-all duration-200 ease-in-out cursor-pointer">
          <Controller
            control={control}
            name={`${baseName}.lecture_notes.note_file`}
            render={({ field }) => {
              const currentFile = watch(`${baseName}.lecture_notes.note_file`);

              return (
                <>
                  <input
                    name={`${baseName}.lecture_notes.note_file`}
                    ref={noteFileRef}
                    type="file"
                    className="hidden"
                    accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => handleFileChange(e, field.onChange)}
                  />

                  {currentFile ? (
                    <div className="w-full space-y-2 flex justify-between items-center">
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
                        onClick={handleClick}
                        className="hover:text-secondary-500 transition-all ease-in-out duration-200 cursor-pointer p-1 border border-gray-100 rounded-sm"
                      >
                        Replace File
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="w-full flex flex-col justify-center gap-2"
                      onClick={handleClick}
                    >
                      <p className="body-lg-500">Upload Notes</p>
                      <p className="body-md-400 text-gray-500">
                        Drag an drop a file or
                        <span className="text-gray-700"> browse file</span>
                      </p>
                    </button>
                  )}
                </>
              );
            }}
          />
        </div>
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
          <span>AddNotes</span>
        </CustomButton>
      </div>
    </>
  );
};

export default LectureNotes;
