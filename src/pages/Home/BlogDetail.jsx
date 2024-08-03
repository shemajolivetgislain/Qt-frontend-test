import { useParams } from "react-router-dom";
import { useLazyBlogDetailsQuery } from "../../app/api";
import ContainerHolder from "../../components/container";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { FaUserTie } from "react-icons/fa6";
import AddComment from "./child/AddComment";
import FooterSection from "./FooterSection";

const BlogDetail = () => {
  const { id } = useParams();
  const [blogDetails, { isLoading, isSuccess, data: blogDetailData }] =
    useLazyBlogDetailsQuery();
  console.log(id);
  useEffect(() => {
    blogDetails(id);
  }, [blogDetails, id]);

  const postDetail = blogDetailData?.data?.post;
  const postComment = blogDetailData?.data?.comments;

  return (
    <div className="flex flex-col">
      <Navbar />
      <ContainerHolder className={"!py-28 flex flex-col gap-5"}>
        <header className="flex flex-col gap-5 mt-6">
          <h1 className="font-bold text-whiteTheme-primaryColor text-2xl">
            {postDetail?.title}
          </h1>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-blue-100 border-2 border-whiteTheme-primaryColor p-3 text-whiteTheme-primaryColor">
              <FaUserTie size={25} />
            </span>
            <span className=" ">
              <p className="font-bold text-sm text-whiteTheme-primaryColor">
                Shema Jolive
              </p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </span>
          </div>
        </header>
        <main className="w-full flex flex-col gap-4">
          <div className="w-full h-[80vh] bg-red-200">
            <img
              src={postDetail?.image_url}
              alt=""
              className="rounded-lg"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
          <article>
            <p className="text-whiteTheme-primaryColor text-lg">
              {postDetail?.content}
            </p>
          </article>

          {/* Comment Section */}
          <hr />
          <div className="flex flex-col gap-3">
            <h2 className="text-whiteTheme-primaryColor text-xl font-bold">
              Comments
            </h2>
            <div className="flex flex-col gap-5">
              {" "}
              {postComment?.map((comment) => (
                <>
                  <div key={comment?.id} className="flex items-center gap-4">
                    <span className="rounded-full bg-blue-100 border-2 border-whiteTheme-primaryColor p-3 text-whiteTheme-primaryColor">
                      <FaUserTie size={25} />
                    </span>
                    <div className="">
                      <span className="flex gap-3 items-center">
                        <p className="font-bold text-sm text-whiteTheme-primaryColor">
                          {comment?.author?.first_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {comment?.created_at.split("T")[0]}
                        </p>
                      </span>
                      <p className="text-gray-500">{comment?.content}</p>
                    </div>
                  </div>
                  <hr className="w-1/2" />
                </>
              ))}
            </div>
            {/* Form Section */}
            <AddComment postId={id} />
          </div>
        </main>
      </ContainerHolder>
      <FooterSection />
    </div>
  );
};

export default BlogDetail;
