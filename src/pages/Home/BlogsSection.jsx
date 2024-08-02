import { useEffect, useRef, useState } from "react";
import { useLazyListAllBlogsQuery } from "../../app/api";
import Button from "../../components/Button";
import ContainerHolder from "../../components/container";
import { motion } from "framer-motion";
import clamp from "clamp-js";
import { FaUserTie } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import AddBlog from "./blog/AddBlog";
import DeleteBlog from "./blog/DeleteBlog";
import EditBlog from "./blog/EditBlog";
import { IMAGE_URL } from "../../constants/Environments";
import moment from "moment";

const BlogsSection = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [blogId, setBlogId] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [listAllBlogs, { isLoading, isSuccess, data: blogsData }] =
    useLazyListAllBlogsQuery();
  const loginUser = localStorage.getItem("token");
  const userDetails = JSON.parse(localStorage.getItem("user"));

  const contentRefs = useRef([]);

  useEffect(() => {
    listAllBlogs();
  }, [listAllBlogs]);

  // Apply clamping with 2 lines limit
  useEffect(() => {
    if (blogsData?.data) {
      contentRefs.current.forEach((content) => {
        if (content) {
          clamp(content, { clamp: 2 });
        }
      });
    }
  }, [blogsData]);

  return (
    <ContainerHolder className={"!py-12 flex flex-col gap-10"}>
      <header className="flex justify-between">
        <h1 className="text-whiteTheme-primaryColor text-xl w-1/2 font-bold">
          Discover Inspiring Stories: A Curated Collection of Engaging Blogs
        </h1>
        {loginUser ? (
          <Button
            value={"Add New Blog"}
            onClick={() => {
              setOpenModal(true);
            }}
          />
        ) : (
          <Button
            value={"Join us"}
            onClick={() => {
              navigate("/register");
            }}
          />
        )}
      </header>
      <main className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
        {isLoading ? (
          <span>
            <p>Loading</p>
          </span>
        ) : isSuccess ? (
          blogsData?.data?.length > 0 ? (
            blogsData?.data?.map((blog, index) => (
              <motion.div
                // whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px 0px #d1fae5" }}
                key={blog.id}
                className="flex flex-col gap-5 items-start shadow-sm border-2 border-slate-100 rounded-md pb-5"
              >
                <motion.div className="w-full flex items-center rounded-md">
                  <img
                    src={
                      blog?.image
                        ? `${IMAGE_URL}${blog.image}`
                        : "https://www.forbesindia.com/fbimages/900x600/proportional/jpeg/blog/wp-content/uploads/2024/06/shutterstock_2293372839_BG.jpg"
                    }
                    alt="blog-image"
                    className="w-60 h-60 rounded-t-md"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </motion.div>
                <article className="px-3 space-y-2">
                  <h1 className="font-semibold text-lg">{blog.title}</h1>
                  <p
                    ref={(el) => (contentRefs.current[index] = el)} // Assign ref to each paragraph
                    className="text-sm text-whiteTheme-secondTextColor"
                  >
                    {blog?.content}
                  </p>
                  {/* <Button value={"Read More"} /> */}
                </article>
                <div className="px-3 flex items-center gap-4">
                  <span className="rounded-full bg-blue-100 border-2 border-whiteTheme-primaryColor p-3 text-whiteTheme-primaryColor">
                    <FaUserTie size={25} />
                  </span>
                  <span className=" ">
                    <p className="font-bold text-base text-whiteTheme-primaryColor capitalize">
                      {blog?.author?.first_name}
                      {""} {blog?.author?.last_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {moment(blog?.created_at).format("LLL")}
                    </p>
                  </span>
                </div>
                {/* Action */}
                <div className="px-3 flex items-center text-sm">
                  <span
                    className="text-blue-700 underline font-semibold cursor-pointer"
                    onClick={() => {
                      navigate(`/blog/${blog?.id}`);
                    }}
                  >
                    Read more
                  </span>

                  {loginUser && userDetails?.id === blog?.author.id && (
                    <>
                      {" "}
                      <span className="mx-3">|</span>
                      <span
                        className="text-red-500 font-semibold cursor-pointer"
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setBlogId(blog?.id);
                        }}
                      >
                        Delete
                      </span>
                      <span className="mx-3">|</span>
                      <span
                        className="text-green-500 font-semibold cursor-pointer"
                        onClick={() => {
                          setBlogData(blog);
                          setOpenEditModal(true);
                        }}
                      >
                        Update
                      </span>
                    </>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <span>
              <p>Empty blogs</p>
            </span>
          )
        ) : (
          <span>
            <p>Failed to Load blogs</p>
          </span>
        )}
      </main>
      {openModal && <AddBlog closeModal={() => setOpenModal(false)} />}
      {openDeleteModal && (
        <DeleteBlog
          blog_id={blogId}
          closeModal={() => setOpenDeleteModal(false)}
        />
      )}
      {openEditModal && (
        <EditBlog data={blogData} closeModal={() => setOpenEditModal(false)} />
      )}
    </ContainerHolder>
  );
};

export default BlogsSection;
