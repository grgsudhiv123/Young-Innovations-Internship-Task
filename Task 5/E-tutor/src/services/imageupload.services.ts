import axios from "axios";

const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;

export const ImageUpload = async (file: File) => {
  if (!file) throw new Error("Image file not found.");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "imageUpload");

  const response = await axios.post(
    `${CLOUDINARY_BASE_URL}image/upload`,
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
    `${CLOUDINARY_BASE_URL}video/upload`,
    formData
  );
  if (!response) throw new Error("Error uploading video");
  return response.data.secure_url;
};
