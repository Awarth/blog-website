import React, { useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { baseUrl } from "../constants";
import { useEffect } from "react";
import Loader from "../components/Loader";

function Home() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const fetchAllPosts = async () => {
    try {
      const res = await axios.get(`${baseUrl}`);
      console.log(res.data.data.posts);
      setPosts(res.data.data.posts);
      setPageNo(res.data.data.pagination.currentPage);
      setTotalPages(res.data.data.pagination.totalPages);
    } catch (error) {
      console.log("Error while fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[82.5vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-[1960px] w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full gap-4 py-6 px-2 sm:px-8">
        {posts.map((post) => (
          <BlogCard key={post._id} detail={post} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className=" max-w-[95%] w-full flex justify-between items-center mb-12">
          <button className="border rounded-lg py-2 px-4">Prev</button>
          <div>
            page {pageNo} of {totalPages}
          </div>
          <button className="border rounded-lg py-2 px-4">Next</button>
        </div>
      )}
    </>
  );
}

export default Home;
