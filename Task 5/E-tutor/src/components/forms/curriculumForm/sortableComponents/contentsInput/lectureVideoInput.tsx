import { Controller, useFormContext } from "react-hook-form";
import CustomButton from "../../../../ui/button";
import { useRef, type ChangeEvent } from "react";
import { VideoUpload } from "../../../../../services/imageupload.services";
import { toast } from "react-toastify";

type videoPayloadType = {
  url: string;
  duration: string;
  name: string;
};

const LectureVideoInput = ({
  baseName,
  handleSubmit,
  handleCancel,
}: {
  baseName: string;
  handleSubmit: () => void;
  handleCancel: () => void;
}) => {
  const { control, watch } = useFormContext();
  const videoRef = useRef<HTMLInputElement | null>(null);
  const handleVideoChange = async (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: videoPayloadType) => void
  ) => {
    try {
      const file = e.target.files?.[0];
      if (!file) throw new Error("Media file not found");

      const videoUrl = await toast.promise(VideoUpload(file), {
        pending: "Uploading video",
        success: "Video uploaded successfully",
        error: "Failed to upload video",
      });

      const duration = await getVideoDuration(file);
      const formattedDuration = getFormattedDuration(duration);

      const payload = {
        url: videoUrl,
        duration: formattedDuration,
        name: file.name,
      };
      onChange(payload);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleChangeInVideo = () => {
    videoRef?.current?.click();
  };

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = URL.createObjectURL(file);

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.onerror = () => reject("Error getting the video duration");
    });
  };

  const getFormattedDuration = (duration: number) => {
    const totalSecs = Number(duration.toString().split(".")[0]);
    const minutes = Math.floor(totalSecs / 60);
    const seconds = totalSecs % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <>
      <div className="w-full space-y-4">
        <div className="w-full space-y-4">
          <Controller
            control={control}
            name={`${baseName}.videoUrl`}
            render={({ field }) => {
              const currentVideo = watch(`${baseName}.videoUrl`);
              return (
                <>
                  <input
                    ref={videoRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => handleVideoChange(e, field.onChange)}
                  />

                  {currentVideo ? (
                    <div className="w-full flex flex-row gap-3.5">
                      <div className="max-h-22 h-full max-w-40 w-full aspect-video">
                        <video className="h-full w-full" controls>
                          <source src={currentVideo.url} type="video/mp4" />
                        </video>
                      </div>
                      <div className="w-full">
                        <p className="flex flex-row gap-1.5 text-gray-700 items-center">
                          <span className="uppercase text-success-500 font-medium text-xs leading-3">
                            FILE UPLOADED
                          </span>
                          <span className="text-[10px] font-normal leading-2.5">
                            .
                          </span>
                          <span className="text-xs leading-4 font-normal">
                            {currentVideo.duration}
                          </span>
                        </p>
                        <p className="body-md-400 text-gray-900 capitalize line-clamp-2">
                          {currentVideo.name}
                        </p>
                        <button
                          type="button"
                          className="body-md-500 text-secondary-500 cursor-pointer"
                          onClick={handleChangeInVideo}
                        >
                          Replace Video
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-row justify-between items-center border border-gray-100">
                        <button
                          type="button"
                          onClick={handleChangeInVideo}
                          className="body-lg-400 font-normal text-gray-500 ml-4.5 cursor-pointer"
                        >
                          Upload Files
                        </button>
                        <CustomButton
                          variant="tertiary-gray"
                          className="bg-gray-50 hover:bg-gray-100"
                          onClick={handleChangeInVideo}
                        >
                          <span>Upload File</span>
                        </CustomButton>
                      </div>
                      <p className="w-full body-md-500 text-gray-600">
                        <span className="text-gray-900">Note: </span>
                        <span>
                          All files should be at least 720p and less than 4.0
                          GB.
                        </span>
                      </p>
                    </>
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
          <span>Upload Video</span>
        </CustomButton>
      </div>
    </>
  );
};

export default LectureVideoInput;
