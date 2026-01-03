import {
  EyeIcon,
  ImageSquareIcon,
  PlayCircleIcon,
  TrashIcon,
  UploadSimpleIcon,
} from "@phosphor-icons/react";
import { Controller, useFormContext } from "react-hook-form";
import CustomButton from "../../ui/button";
import { CustomDialog } from "../../ui/customDialog";
import { useRef, useState, type ChangeEvent } from "react";
import {
  ImageUpload,
  VideoUpload,
} from "../../../services/imageupload.services";
import { toast } from "react-toastify";
import clsx from "clsx";

const MediaFields = {
  VIDEO_Field: "courseTrailer",
  IMAGE_Field: "courseThumbnail",
} as const;

type MediaFieldsType = (typeof MediaFields)[keyof typeof MediaFields];

type MediaUploadPropsType = {
  header: string;
  fieldName: MediaFieldsType;
};

const MediaUpload = ({ header, fieldName }: MediaUploadPropsType) => {
  const isImageField = fieldName === MediaFields.IMAGE_Field;
  const { setValue, control } = useFormContext();

  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);

  const mediaInputRef = useRef<HTMLInputElement | null>(null);

  const handleMediaUpload = () => {
    mediaInputRef?.current?.click();
  };

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    try {
      const file = e.target.files?.[0];
      if (!file) throw new Error("Media file not found");

      if (isImageField) {
        const imgUrl = await toast.promise(ImageUpload(file), {
          pending: "Uploading image",
          success: "Image uploaded successfully",
          error: "Image upload failed",
        });
        onChange(imgUrl);
      } else {
        const videoUrl = await toast.promise(VideoUpload(file), {
          pending: "Uploading video",
          success: "Video uploaded successfully",
          error: "Video upload failed",
        });
        onChange(videoUrl);
      }
    } catch (error) {
      console.error("Error uploading media file : ", error);
    }
  };

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => {
        return (
          <div className=" col-span-6 w-full grid grid-cols-12 gap-4">
            <div className=" col-span-12">
              <span className="body-xl-500 text-gray-900">{header}</span>
              <div className="relative col-span-12 w-full flex gap-12 mt-4">
                <button
                  type="button"
                  className={clsx(
                    "max-w-[288px] w-full h-40 flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer",
                    fieldState.error
                      ? "bg-primary-50 hover:bg-primary-100"
                      : "bg-gray-50 hover:bg-gray-100"
                  )}
                  onClick={handleMediaUpload}
                >
                  {isImageField ? (
                    <ImageSquareIcon size={124} className="text-gray-300" />
                  ) : (
                    <PlayCircleIcon size={124} className="text-gray-300" />
                  )}

                  <input
                    type="file"
                    accept={isImageField ? "image/*" : "video/*"}
                    ref={mediaInputRef}
                    onChange={(e) => handleChange(e, field.onChange)}
                    className="hidden"
                  />
                </button>
                <div className="space-y-6">
                  <p className="body-md-400 text-gray-600">
                    {isImageField ? (
                      <>
                        Upload your course Thumbnail here.{" "}
                        <span className="text-gray-900 body-md-500">
                          {" "}
                          Important guidelines:
                        </span>
                        1200x800 pixels or 12:8 Ratio. Supported format:
                        <span className="text-gray-900 body-md-500">
                          .jpg, .jpeg, or .png
                        </span>
                      </>
                    ) : (
                      <>
                        Students who watch a well-made promo video are 5X more
                        likely to enroll in your course. We've seen that
                        statistic go up to 10X for exceptionally awesome videos.
                      </>
                    )}
                  </p>

                  <CustomButton
                    variant="light-primary"
                    onClick={handleMediaUpload}
                  >
                    <span className="flex items-center gap-3">
                      <span>
                        {isImageField ? "Upload Image" : "Upload video"}
                      </span>
                      <UploadSimpleIcon size={24} />
                    </span>
                  </CustomButton>
                </div>

                {fieldState.error && (
                  <p className="absolute bottom-0 translate-y-[110%] text-sm text-primary-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            </div>

            {field.value && (
              <>
                <div className="relative col-span-3 size-24 cursor-pointer group">
                  <div className="relative h-full w-full rounded-lg overflow-hidden bg-gray-50">
                    {isImageField ? (
                      <img
                        src={field.value}
                        className="z-10 w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={field.value}
                        className="z-10 w-full h-full object-cover"
                      />
                    )}

                    <button
                      type="button"
                      className="absolute z-40 top-0 left-0 bg-gray-500/60 h-full w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform-all duration-200 ease-in-out cursor-pointer"
                      onClick={() => setIsModelOpen(true)}
                    >
                      <EyeIcon
                        size={32}
                        className="text-white hover:text-gray-100 transform-all duration-200 ease-in-out "
                      />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="absolute z-50 top-0 right-0 -translate-y-1/3 translate-x-1/3 rounded-full bg-gray-50 size-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transform-all duration-200 ease-in-out cursor-pointer"
                    onClick={() => {
                      setValue(fieldName, "");
                    }}
                  >
                    <TrashIcon
                      size={24}
                      className="text-gray-700 hover:text-gray-600 transform-all duration-200 ease-in-out "
                    />
                  </button>
                </div>
                <CustomDialog
                  isOpen={isModelOpen}
                  isClose={() => setIsModelOpen(false)}
                >
                  {isImageField ? (
                    <img src={field.value} />
                  ) : (
                    <video className="w-5xl" controls>
                      <source src={field.value} type="video/mp4" />
                    </video>
                  )}
                </CustomDialog>
              </>
            )}
          </div>
        );
      }}
    />
  );
};

export default MediaUpload;
