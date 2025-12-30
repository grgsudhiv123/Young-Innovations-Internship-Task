import axios from "axios";

export const ImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "imageUpload");

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dpsgigoy7/image/upload",
    formData
  );

  return response.data.secure_url;
};

export const VideoUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "imageUpload");
  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dpsgigoy7/video/upload",
    formData
  );

  return response.data.secure_url;
};
