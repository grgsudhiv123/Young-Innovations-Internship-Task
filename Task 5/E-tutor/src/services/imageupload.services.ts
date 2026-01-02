import axios from "axios";

export const ImageUpload = async (file: File) => {
  if (!file) throw new Error("Image file not found.");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "imageUpload");

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dpsgigoy7/image/upload",
    formData
  );

  if (!response) {
    throw new Error("Error uploading image");
  }

  return response.data.secure_url;
};

export const VideoUpload = async (file: File) => {
  if (!file) throw new Error("Media file not found");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "imageUpload");
  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dpsgigoy7/video/upload",
    formData
  );

  if (!response) throw new Error("Error uploading video");

  return response.data.secure_url;
};
