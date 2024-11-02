import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utility/AsyncHandler.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utility/cloudinary.js";

const getAllPost = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortType = "desc",
  } = req.query;

  const parsedPage = Math.max(1, parseInt(page, 10));
  const parsedLimit = Math.max(1, parseInt(limit, 10));
  const sortOptions = { [sortBy]: sortType === "asc" ? 1 : -1 };

  const posts = await Blog.find()
    .skip((parsedPage - 1) * parsedLimit)
    .limit(parsedLimit)
    .sort(sortOptions)
    .select("-picture");

  const totalPosts = await Blog.countDocuments();
  const totalPages = Math.ceil(totalPosts / parsedLimit);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        posts,
        pagination: {
          totalPosts,
          totalPages,
          currentPage: parsedPage,
          pageSize: parsedLimit,
        },
      },
      "Posts fetched successfully"
    )
  );
});

const getPostById = asyncHandler(async (req, res) => {
  const postId = req.params?.postId;

  if (!postId) {
    throw new ApiError(400, "Post id should be provided");
  }

  const post = await Blog.findById(postId);

  if (!post) {
    throw new ApiError(400, "Post id is not valid");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post retrieved successfully"));
});

const createPost = asyncHandler(async (req, res) => {
  const { title, description, content } = req.body;
  const picture = req.file?.path;

  if (!title || !description || !picture || !content) {
    throw new ApiError(400, "Missing details for the article");
  }

  const pictureUrl = await uploadOnCloudinary(picture);
  if (!pictureUrl || !pictureUrl.url)
    throw new ApiError(500, "Error while uploading the image to Cloudinary");

  const post = await Blog.create({
    title: title.trim(),
    description: description.trim(),
    content,
    picture: pictureUrl.url,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
});

const editPostDetails = asyncHandler(async (req, res) => {
  const { title, description, content } = req.body;
  const { postId } = req.params;

  if (!postId) throw new ApiError(400, "Post ID is required");

  const post = await Blog.findById(postId).lean();
  if (!post) throw new ApiError(404, "Post not found");

  const updatedPost = await Blog.findByIdAndUpdate(
    postId,
    {
      title: title.trim() ?? post.title,
      description: description.trim() ?? post.description,
      content: content ?? post.content,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});

const editPostImage = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const picture = req.file?.path;

  console.log(req.file);

  if (!postId || !picture)
    throw new ApiError(400, "Provide a valid post ID and image");

  const post = await Blog.findById(postId);
  if (!post) throw new ApiError(404, "Post not found");

  if (post.picture) {
    try {
      await deleteFromCloudinary(post.picture);
    } catch (error) {
      throw new ApiError(500, "Error while deleting the old image");
    }
  }

  const updatedPictureUrl = await uploadOnCloudinary(picture);
  if (!updatedPictureUrl || !updatedPictureUrl.url)
    throw new ApiError(500, "Error uploading the new image to Cloudinary");

  post.picture = updatedPictureUrl.url;
  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post image updated successfully"));
});

const deleteAPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  if (!postId) throw new ApiError(400, "Post ID is required");

  const post = await Blog.findByIdAndDelete(postId);
  if (!post) throw new ApiError(404, "Post not found");

  if (post.picture) {
    try {
      await deleteFromCloudinary(post.picture);
    } catch (error) {
      console.error("Failed to delete image from Cloudinary", error);
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Post deleted successfully"));
});

export {
  getAllPost,
  getPostById,
  createPost,
  deleteAPost,
  editPostDetails,
  editPostImage,
};
