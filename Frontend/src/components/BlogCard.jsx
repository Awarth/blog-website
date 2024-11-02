import React from "react";
import avatar from "../images/avatar.avif";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import truncateName from "../utility/truncateName";

function BlogCard({ detail }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${detail._id}`);
  };

  const truncatedTitle = truncateName(detail.title, 50);
  const truncatedDescripton = truncateName(detail.description, 350);

  return (
    <span
      onClick={handleClick}
      className=" border border-[#E7EBED] rounded p-4 cursor-pointer  duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl"
    >
      <div className=" flex items-center justify- gap-2 mb-3 text-[#263238]">
        <img src={avatar} alt="avatar" className="w-12 h-12 rounded-full" />
        <span className="text-sm flex font-light">
          {" "}
          by <p className="w-fit ml-1 font-medium"> Shivangi</p>{" "}
        </span>
      </div>
      <h2 className="text-2xl text-primary mb-2 font-semibold">
        {truncatedTitle}
      </h2>
      <p className="font-light text-sm text-[#263238]">{truncatedDescripton}</p>
    </span>
  );
}

BlogCard.propTypes = {
  detail: PropTypes.object.isRequired,
};

export default BlogCard;
