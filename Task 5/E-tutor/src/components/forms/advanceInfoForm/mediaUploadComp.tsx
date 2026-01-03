// import {
//   EyeIcon,
//   ImageSquareIcon,
//   PlayCircleIcon,
//   TrashIcon,
//   UploadSimpleIcon,
// } from "@phosphor-icons/react";
// import CustomButton from "../../ui/button";
// import { useRef, useState, type ChangeEvent } from "react";
// import {
//   ImageUpload,
//   VideoUpload,
// } from "../../../services/imageupload.services";
// import { Controller, useFormContext } from "react-hook-form";
// import clsx from "clsx";
// import { CustomDialog } from "../../ui/customDialog";
// import { toast } from "react-toastify";

import MediaUpload from "./mediaUpload";

const MediaUploadComp = () => {
  // const { watch, setValue, control } = useFormContext();

  // const [isImgOpen, setIsImgOpen] = useState<boolean>(false);
  // const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

  // const imgRef = useRef<HTMLInputElement | null>(null);

  // const handleImgUpload = () => {
  //   imgRef?.current?.click();
  // };

  // const handleChange = async (
  //   e: ChangeEvent<HTMLInputElement>,
  //   onChange: (value: string) => void
  // ) => {
  //   try {
  //     const file = e.target.files?.[0];
  //     if (!file) throw new Error("Media file not found");

  //     const res = await toast.promise(ImageUpload(file), {
  //       pending: "Uploading image",
  //       success: "Image uploaded successfully",
  //       error: "Image uploaded failed",
  //     });
  //     onChange(res);
  //   } catch (error) {
  //     console.error("Error uploading image : ", error);
  //   }
  // };

  // const videoRef = useRef<HTMLInputElement | null>(null);

  // const handleVideoChange = async (
  //   e: ChangeEvent<HTMLInputElement>,
  //   onChange: (value: string) => void
  // ) => {
  //   try {
  //     const file = e.target.files?.[0];
  //     if (!file) throw new Error("Media file not found");

  //     const videoUrl = await toast.promise(VideoUpload(file), {
  //       pending: "Uploading video",
  //       success: "Video uploaded successfully",
  //       error: "Video uploaded failed",
  //     });
  //     onChange(videoUrl);
  //   } catch (error) {
  //     console.error("Error uploading video : ", error);
  //   }
  // };

  // const handleChangeInVideo = () => {
  //   videoRef?.current?.click();
  // };

  return (
    <>
      <div className="grid grid-cols-12 gap-12 w-full">
        {/* <Controller
          control={control}
          name="courseThumbnail"
          render={({ field, fieldState }) => {
            return (
              <div className=" col-span-6 w-full grid grid-cols-12 gap-4">
                <div className=" col-span-12">
                  <span className="body-xl-500 text-gray-900">
                    Course Thumbnail
                  </span>
                  <div className="relative col-span-12 w-full flex gap-12 mt-4">
                    <button
                      type="button"
                      className={clsx(
                        "max-w-[288px] w-full h-40 flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer",
                        fieldState.error
                          ? "bg-primary-50 hover:bg-primary-100"
                          : "bg-gray-50 hover:bg-gray-100"
                      )}
                      onClick={handleImgUpload}
                    >
                      <ImageSquareIcon size={124} className="text-gray-300" />

                      <input
                        type="file"
                        accept="image/*"
                        ref={imgRef}
                        onChange={(e) => handleChange(e, field.onChange)}
                        className="hidden"
                      />
                    </button>
                    <div className="space-y-6">
                      <p className="body-md-400 text-gray-600">
                        Upload your course Thumbnail here.{" "}
                        <span className="text-gray-900 body-md-500">
                          {" "}
                          Important guidelines:
                        </span>
                        1200x800 pixels or 12:8 Ratio. Supported format:
                        <span className="text-gray-900 body-md-500">
                          .jpg, .jpeg, or .png
                        </span>
                      </p>
                      <CustomButton
                        variant="light-primary"
                        onClick={handleImgUpload}
                      >
                        <span className="flex items-center gap-3">
                          <span>Upload Image</span>
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

                {watch("courseThumbnail") && (
                  <>
                    <div className="relative col-span-3 size-24 cursor-pointer group">
                      <div className="relative h-full w-full rounded-lg overflow-hidden bg-gray-50">
                        <img
                          src={watch("courseThumbnail")}
                          className="z-10 w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute z-40 top-0 left-0 bg-gray-500/60 h-full w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform-all duration-200 ease-in-out cursor-pointer"
                          onClick={() => setIsImgOpen(true)}
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
                          setValue("courseThumbnail", "");
                        }}
                      >
                        <TrashIcon
                          size={24}
                          className="text-gray-700 hover:text-gray-600 transform-all duration-200 ease-in-out "
                        />
                      </button>
                    </div>
                    <CustomDialog
                      isOpen={isImgOpen}
                      isClose={() => setIsImgOpen(false)}
                    >
                      <img src={watch("courseThumbnail")} />
                    </CustomDialog>
                  </>
                )}
              </div>
            );
          }}
        />

        <Controller
          control={control}
          name="courseTrailer"
          render={({ field, fieldState }) => {
            return (
              <div className="relative col-span-6 w-full grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <span className="body-xl-500 text-gray-900 col-span-12">
                    Course Trailer
                  </span>
                  <div className="col-span-12 w-full flex gap-12 mt-4">
                    <button
                      type="button"
                      onClick={handleChangeInVideo}
                      className={clsx(
                        "max-w-[288px] w-full h-40 flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer",
                        fieldState.error
                          ? "bg-primary-50 hover:bg-primary-100"
                          : "bg-gray-50 hover:bg-gray-100"
                      )}
                    >
                      <PlayCircleIcon size={124} className="text-gray-300" />
                      <input
                        type="file"
                        accept="video/*"
                        ref={videoRef}
                        onChange={(e) => handleVideoChange(e, field.onChange)}
                        className="hidden"
                      />
                    </button>
                    <div className="space-y-6">
                      <p className="body-md-400 text-gray-600">
                        Students who watch a well-made promo video are 5X more
                        likely to enroll in your course. We've seen that
                        statistic go up to 10X for exceptionally awesome videos.
                      </p>

                      <CustomButton
                        variant="light-primary"
                        onClick={handleChangeInVideo}
                      >
                        <span className="flex items-center gap-3">
                          <span>Upload Video</span>
                          <UploadSimpleIcon size={24} />
                        </span>
                      </CustomButton>
                    </div>
                  </div>
                </div>
                {watch("courseTrailer") && (
                  <>
                    <div className="relative col-span-3 size-24 cursor-pointer group">
                      <div className="relative h-full w-full rounded-lg overflow-hidden bg-gray-50">
                        <video
                          src={watch("courseTrailer")}
                          className="z-10 w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute z-40 top-0 left-0 bg-gray-500/60 h-full w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform-all duration-200 ease-in-out cursor-pointer"
                          onClick={() => setIsVideoOpen(true)}
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
                          setValue("courseTrailer", "");
                        }}
                      >
                        <TrashIcon
                          size={24}
                          className="text-gray-700 hover:text-gray-600 transform-all duration-200 ease-in-out "
                        />
                      </button>
                    </div>
                    <CustomDialog
                      isOpen={isVideoOpen}
                      isClose={() => setIsVideoOpen(false)}
                    >
                      <video className="w-5xl" controls>
                        <source src={watch("courseTrailer")} type="video/mp4" />
                      </video>
                    </CustomDialog>
                  </>
                )}
                {fieldState.error && (
                  <p className="absolute bottom-0 translate-y-[110%] text-sm text-primary-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            );
          }}
        /> */}
        <MediaUpload fieldName="courseThumbnail" header="Course Thumbnail" />
        <MediaUpload fieldName="courseTrailer" header="Course Trailer" />
      </div>
    </>
  );
};

export default MediaUploadComp;
