import Modal from "../../../components/Modal";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../../components/Inputs";
import Button from "../../../components/Button";
import TextArea from "../../../components/Inputs/TextArea";
import { useEffect, useState } from "react";
import { useAddBlogMutation, useLazyListAllBlogsQuery } from "../../../app/api";
import ButtonLoader from "../../../components/Loaders/Loaders";

const AddBlog = ({ closeModal }) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addBlog, { isLoading, isSuccess, isError }] = useAddBlogMutation();
  const [listAllBlogs] = useLazyListAllBlogsQuery();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", data.image[0]);
    addBlog(formData);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Blog added successfully", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
      listAllBlogs();
      closeModal();
      navigate("/");
    }
    if (isError) {
      toast.error("Error adding blog", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
    }
  }, [closeModal, isError, isLoading, isSuccess, listAllBlogs, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  return (
    <Modal toggleFunction={closeModal}>
      <header className="mb-5">
        <h1 className="font-bold text-whiteTheme-primaryColor ">
          Add New blog
        </h1>
        <p className="text-sm text-gray-600">
          Fill the following field to add new form
        </p>
      </header>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="w-full flex flex-col gap-3"
      >
        {" "}
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: "title is required" }}
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-1">
                <label className="text-whiteTheme-textColor font-semibold text-base">
                  Blog title
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your email Address"
                    {...field}
                    className={`!border-2 !border-slate-300 !pl-4`}
                  />
                </div>
                {errors.title && (
                  <p className="text-red-600 text-[13px]">
                    {errors.title.message}
                  </p>
                )}
              </div>
            );
          }}
        />
        {imagePreview && (
          <div className="flex justify-start mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover"
            />
          </div>
        )}
        <Controller
          name="image"
          control={control}
          defaultValue=""
          rules={{ required: "Menu image is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Menu Image
              </label>
              <div className="relative">
                <Input
                  type="file"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.files);
                    handleImageChange(e);
                  }}
                  className={`!border border-stroke !border-slate-300 !pl-4`}
                />
              </div>
              {errors.image && (
                <p className="text-red-600 text-[13px]">
                  {errors.image.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="content"
          control={control}
          defaultValue=""
          render={({ field }) => {
            return (
              <>
                {" "}
                <TextArea
                  {...field}
                  placeholder={`Comment Message`}
                  className={"!border-whiteTheme-subPrimaryColor"}
                />
              </>
            );
          }}
        />
        <Button
          value={isLoading ? <ButtonLoader /> : "Add blog"}
          className={"!w-full "}
        />
      </form>
    </Modal>
  );
};

AddBlog.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default AddBlog;
