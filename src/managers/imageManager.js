// src/managers/imageManager.js
export async function uploadImage(file, type) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.imageUrl; // This is the Cloudinary URL
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // So the caller can handle it
  }
}
