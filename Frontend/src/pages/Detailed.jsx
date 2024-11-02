import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { baseUrl } from "../constants";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import { formatMongoDate } from "../utility/convertDate";

function Detailed() {
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const textAreaRef = useRef(null);

  const { postId } = useParams();

  const fetchAPostById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/post/${postId}`);
      setPostDetails(res.data.data);
    } catch (error) {
      console.log("Error while fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPostById();
  }, []);

  // Function to adjust textarea height based on content
  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set height based on scroll height
    }
  };

  useEffect(() => {
    if (postDetails) {
      adjustTextAreaHeight();
    }
  }, [postDetails]);

  if (loading) {
    return (
      <div className="w-full h-[82.5vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const date = postDetails ? formatMongoDate(postDetails.updatedAt) : "";

  return (
    <div className="max-w-[1960px] w-full h-full flex justify-center items-center gap-4 py-6 px-2 sm:px-8">
      <div className="max-w-[900px]">
        <h2 className="text-5xl mb-2 font-semibold">{postDetails.title}</h2>
        <p className="mb-1 font-light text-lg">{postDetails.description}</p>
        <p className="mb-4 font-light">
          by <span className="font-medium">Shivangi</span> on{" "}
          <span className="font-medium">{date}</span>
        </p>
        <img src={postDetails.picture} alt="post-img" className="w-full mb-4" />
        <textarea
          ref={textAreaRef}
          name="content"
          value={postDetails.content}
          readOnly
          className="outline-none w-full h-auto resize-none cursor-default"
        />
      </div>
    </div>
  );
}

export default Detailed;
