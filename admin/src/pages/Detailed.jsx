import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../constants";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Detailed() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const { postId } = useParams();

  const fetchPostDetails = async () => {
    try {
      const res = await axios.get(`${baseUrl}/post/${postId}`);
      setTitle(res.data.data.title);
      setDescription(res.data.data.description);
      setContent(res.data.data.content);
      setImage(res.data.data.picture);
      setPreviewImage(res.data.data.picture);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching post details:", error);
      setError("Failed to fetch post details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "content") {
      setContent(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageEdit = async (e) => {
    e.preventDefault();

    if (!image) return;

    setShowPopup(true);

    try {
      await axios.patch(
        `${baseUrl}/img/${postId}`,
        { picture: image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Image updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error while updating image:", error);
      toast.error("Failed to update image.");
    }
  };

  const handleDetailEdit = async (e) => {
    e.preventDefault();

    setShowPopup(true);

    try {
      await axios.patch(`${baseUrl}/${postId}`, {
        title,
        description,
        content,
      });
      toast.success("Content saved successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error while saving content:", error);
      toast.error("Failed to save content.");
    }
  };

  if (loading)
    return (
      <div className="w-full h-[95vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  if (error) return <div className="mt-10">{error}</div>;

  return (
    <div className="flex relative flex-col-reverse sm:flex-row p-4 w-full h-full max-w-[1960px] gap-4">
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

      <form
        onSubmit={handleImageEdit}
        className="flex flex-col gap-2  w-full sm:w-[35%] text-lg"
      >
        <img
          src={previewImage}
          alt="Preview"
          className="border rounded w-full h-auto"
        />
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
      </form>
      <form
        onSubmit={handleDetailEdit}
        className="flex flex-col w-full h-[95vh]"
      >
        <label htmlFor="title" className="text-2xl mb-1">
          Title
        </label>
        <input
          value={title}
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
          value={description}
          onChange={handleInputChange}
          name="description"
          className="w-full border rounded px-2 py-1 h-[30vh] resize-none"
          placeholder="Description"
        ></textarea>
        <label htmlFor="content" className="text-2xl mt-2 mb-1">
          Content
        </label>
        <textarea
          name="content"
          value={content}
          onChange={handleInputChange}
          className="h-full p-2 border rounded"
        ></textarea>
        <button
          type="submit"
          className="w-fit mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Detailed;
