import { useState } from "react";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const base64 = reader.result;

        const res = await fetch(
          "http://127.0.0.1:5001/saafi-ariel-aeb41/us-central1/api/upload/base64",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              imageBase64: base64,
              fileName: file.name,
            }),
          }
        );

        const data = await res.json();

        if (data.success) {
          setImageUrl(data.url); // ✅ update UI
        } else {
          alert(data.message || "Upload failed");
        }
      } catch (err) {
        console.error(err);
        alert("Upload error");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      <br /><br />

      {imageUrl && (
        <div>
          <p>Image URL:</p>
          <a href={imageUrl} target="_blank" rel="noreferrer">
            {imageUrl}
          </a>

          <br /><br />

          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ width: "200px", borderRadius: "8px" }}
          />
        </div>
      )}
    </div>
  );
}
