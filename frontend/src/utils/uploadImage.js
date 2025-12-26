import axios from "axios";

/**
 * Upload image as base64 to backend
 * @param {File} file
 * @param {string} folder
 * @returns {string} imageUrl
 */
export const uploadImage = async (file, folder = "products") => {
  if (!file) {
    throw new Error("No file selected");
  }

  // Convert file to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const base64 = await toBase64(file);

  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/upload/base64`,
    {
      imageBase64: base64,
      fileName: file.name,
      folder, // optional, backend can use it
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.data.success) {
    throw new Error(res.data.message || "Image upload failed");
  }

  return res.data.url;
};
