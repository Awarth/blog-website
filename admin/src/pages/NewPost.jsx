import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function NewPost() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  // Handles input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handles image change, including setting a preview image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      // Clean up object URL to prevent memory leak
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  // Submit form data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowPopup(true);

    const uploadPost = async () => {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("content", formData.content);
      data.append("picture", image);

      try {
        await axios.post(`${baseUrl}`, data);
        toast.success("Post uploaded successfully!");
        navigate("/");
      } catch (err) {
        console.error("Error while uploading post:", err);
        setError("Failed to upload post.");
      } finally {
        setLoading(false);
        setShowPopup(false);
      }
    };

    uploadPost();
  };

  if (loading) return <Loader />;
  if (error) return <div className="mt-10">{error}</div>;

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex relative flex-col-reverse sm:flex-row p-4 w-full h-full max-w-[1960px] gap-4"
    >
      {showPopup && (
        <div className="absolute flex flex-col gap-2 justify-center items-center inset-0 bg-[#ffffff31] bg-opacity-50 backdrop-blur-lg z-10">
          <svg viewBox="25 25 50 50" className="container">
            <circle cx="50" cy="50" r="20" className="loader"></circle>
          </svg>
          <p className="text-xl flex items-center">
            Uploading
            <span className="blinking-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </p>
        </div>
      )}

      {/* Image Upload Section */}
      <div className="flex flex-col gap-2 w-full sm:w-[35%] text-lg">
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="border rounded w-full h-auto"
          />
        )}
        <input
          type="file"
          accept="image/*"
          className="cursor-pointer border p-1 rounded"
          onChange={handleImageChange}
        />
        <button
          type="submit"
          className="w-fit mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </div>

      {/* Form Fields Section */}
      <div className="flex flex-col w-full h-[95vh]">
        <label htmlFor="title" className="text-2xl mb-1">
          Title
        </label>
        <input
          value={formData.title}
          onChange={handleInputChange}
          type="text"
          name="title"
          placeholder="Title"
          className="w-full border rounded px-2 py-1"
        />

        <label htmlFor="description" className="text-2xl mt-2 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={handleInputChange}
          name="description"
          className="w-full border rounded px-2 py-1 h-[30vh] resize-none"
          placeholder="Description"
        />

        <label htmlFor="content" className="text-2xl mt-2 mb-1">
          Content
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          className="h-full p-2 border rounded"
          placeholder="Content"
        />
      </div>
    </form>
  );
}

export default NewPost;
