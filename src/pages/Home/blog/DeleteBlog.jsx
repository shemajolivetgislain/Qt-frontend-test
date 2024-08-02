import { useEffect } from "react";
import {
  useDeleteBlogMutation,
  useLazyListAllBlogsQuery,
} from "../../../app/api";
import Button from "../../../components/Button";
import ButtonLoader from "../../../components/Loaders/Loaders";
import Modal from "../../../components/Modal";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const DeleteBlog = ({ closeModal, blog_id }) => {
  const [deleteBlog, { isLoading, isSuccess, isError }] =
    useDeleteBlogMutation();
  const [listAllBlogs] = useLazyListAllBlogsQuery();
  const handleDeleteBlog = () => {
    deleteBlog(blog_id);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Blog removed successfully!", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
      listAllBlogs();
      closeModal();
    }
    if (isError) {
      toast.error("Error removing blog", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
    }
  }, [closeModal, isError, isLoading, isSuccess, listAllBlogs]);
  return (
    <Modal c>
      <div className="w-full flex flex-col gap-3 py-6">
        <div>Are you sure you want to remove this blog ?</div>
        <div className="flex  gap-5 ">
          <Button
            value={
              isLoading ? (
                <ButtonLoader />
              ) : (
                <span className="flex items-center">{"Delete"}</span>
              )
            }
            className={
              "w-fit md:w-[220px] rounded-sm bg-whiteTheme-secondColor !text-whiteTheme-primaryColor border-2 border-stroke border-whiteTheme-primaryColor hover:!bg-whiteTheme-primaryColor hover:!text-white"
            }
            onClick={handleDeleteBlog}
          />
          <Button
            value={<span className="flex items-center">{"Cancel"}</span>}
            className={
              "w-fit md:w-[220px] rounded-sm bg-whiteTheme-secondColor !text-whiteTheme-darkRed border border-stroke border-whiteTheme-darkRed hover:!bg-whiteTheme-secondColor cursor-pointer"
            }
            onClick={() => {
              closeModal();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

DeleteBlog.propTypes = {
  closeModal: PropTypes.func.isRequired,
  blog_id: PropTypes.string,
};

export default DeleteBlog;
