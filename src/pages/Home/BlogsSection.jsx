import { useEffect, useRef } from "react";
import { useLazyListAllBlogsQuery } from "../../app/api";
import Button from "../../components/Button";
import ContainerHolder from "../../components/container";
import { motion } from "framer-motion";
import clamp from "clamp-js";
import { FaUserTie } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BlogsSection = () => {
  const navigate = useNavigate();
  const [listAllBlogs, { isLoading, isSuccess, data: blogsData }] =
    useLazyListAllBlogsQuery();

  const contentRefs = useRef([]); // Create a ref to store the content elements

  useEffect(() => {
    listAllBlogs();
  }, [listAllBlogs]);

  useEffect(() => {
    if (blogsData?.data) {
      contentRefs.current.forEach((content) => {
        if (content) {
          clamp(content, { clamp: 2 }); // Apply clamping with 2 lines limit
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
        <Button value={"Join us"} />
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
                      "https://www.forbesindia.com/fbimages/900x600/proportional/jpeg/blog/wp-content/uploads/2024/06/shutterstock_2293372839_BG.jpg"
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
                    <p className="font-bold text-base text-whiteTheme-primaryColor">
                      Shema Jolive
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </span>
                </div>
                {/* Action */}
                <div className="px-3 flex items-center text-sm">
                  <span
                    className="text-blue-700 underline font-semibold cursor-pointer"
                    onClick={() => {
                      navigate(`/blog/${blog.id}`);
                    }}
                  >
                    Read more
                  </span>
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
    </ContainerHolder>
  );
};

export default BlogsSection;
