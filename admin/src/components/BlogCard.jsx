import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import truncateName from "../utility/truncateName";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants";

function BlogCard({ detail }) {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  const truncatedTitle = truncateName(detail.title, 50);
  const truncatedDescription = truncateName(detail.description, 350);

  const handleShowOption = () => {
    setShowOptions(!showOptions);
  };

  const handleEdit = () => {
    navigate(`/post/${detail._id}`);
  };

  const handleDelete = async () => {
    const confirmation = window.confirm("Do you want to delete this post ?");
    if (!confirmation) return;

    try {
      await axios.delete(`${baseUrl}/${detail._id}`);
    } catch (error) {
      console.log("Error while deleting a post : ", error);
    }
  };

  return (
    <span className="relative border border-[#E7EBED] rounded p-4">
      <button
        className="absolute top-3 right-2 text-xl cursor-pointer"
        onClick={handleShowOption}
      >
        <HiOutlineDotsVertical />
      </button>
      {showOptions && (
        <span className="absolute top-8 right-3 bg-gray-800 text-white rounded shadow-lg">
          <ul className="p-1 space-y-0.5">
            <li
              onClick={handleEdit}
              className="cursor-pointer px-2 py-1 rounded hover:bg-gray-700 transition text-sm"
            >
              Edit
            </li>
            <li
              onClick={handleDelete}
              className="cursor-pointer px-2 py-1 rounded hover:bg-gray-700 transition text-sm"
            >
              Delete
            </li>
          </ul>
        </span>
      )}
      <h2 className="text-2xl text-primary mb-2 font-semibold">
        {truncatedTitle}
      </h2>
      <p className="font-light text-sm text-[#263238]">
        {truncatedDescription}
      </p>
    </span>
  );
}

BlogCard.propTypes = {
  detail: PropTypes.object.isRequired,
};

export default BlogCard;
