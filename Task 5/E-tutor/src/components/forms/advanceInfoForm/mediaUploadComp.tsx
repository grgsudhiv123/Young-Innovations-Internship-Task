import MediaUpload from "./mediaUpload";

const MediaUploadComp = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-12 w-full">
        <MediaUpload fieldName="courseThumbnail" header="Course Thumbnail" />
        <MediaUpload fieldName="courseTrailer" header="Course Trailer" />
      </div>
    </>
  );
};

export default MediaUploadComp;
