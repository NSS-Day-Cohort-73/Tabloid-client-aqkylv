import React, { useState } from "react";
import { uploadImage } from "../managers/imageManager";

function ImageUploader({ setImageURL, type }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }

    try {
      const url = await uploadImage(file, type);
      // Pass it back to the parent
      setImageURL(url);
      setError("");
    } catch (err) {
      console.error("Upload error:", err);
      setError("Image upload failed. Check console for details.");
    }
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <h3>{type === "profile" ? "Profile Image" : "Header Image"}</h3>
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>
        Upload {type} Image
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default ImageUploader;
