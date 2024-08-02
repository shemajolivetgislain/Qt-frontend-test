import Modal from "../../../components/Modal";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../../components/Inputs";
import Button from "../../../components/Button";
import TextArea from "../../../components/Inputs/TextArea";
import { useEffect, useState } from "react";
import {
  useLazyListAllBlogsQuery,
  useUpdateBlogMutation,
} from "../../../app/api";
import ButtonLoader from "../../../components/Loaders/Loaders";
import { IMAGE_URL } from "../../../constants/Environments";

const EditBlog = ({ closeModal, data }) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(IMAGE_URL + data?.image);
  const [newImage, setNewImage] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    // Set initial values for form fields
    setValue("title", data?.title);
    setValue("content", data?.content);
    setValue("image", data?.image);
  }, [data, setValue]);
  // Update blog mutation
  const [updateBlog, { isLoading, isError, isSuccess }] =
    useUpdateBlogMutation();
  // Fetch all blogs after update
  const [listAllBlogs] = useLazyListAllBlogsQuery();
  // Handle form submission
  const onSubmit = (formData) => {
    const dataUpdate = new FormData();
    dataUpdate.append("title", formData.title || data.title);
    dataUpdate.append("content", formData.content || data.content);
    console.log(formData.image.length);
    // Check if a new image has been uploaded
    if (newImage) {
      dataUpdate.append("image", formData.image[0]);
    }

    updateBlog({ id: data?.id, data: dataUpdate });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  // Handle modal close
  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Blog Update successfully", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
      listAllBlogs();
      closeModal();
      navigate("/");
    }
    if (isError) {
      toast.error("Error updating blog", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
    }
  }, [closeModal, isError, isLoading, isSuccess, listAllBlogs, navigate]);

  return (
    <Modal toggleFunction={closeModal}>
      <header className="mb-5">
        <h1 className="font-bold text-whiteTheme-primaryColor ">Edit blog</h1>
        <p className="text-sm text-gray-600">
          To edit blog Fill the following field
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
                    defaultValue={data?.title}
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
                    setNewImage(true);
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
                  defaultValue={data?.content}
                  className={"!border-whiteTheme-subPrimaryColor"}
                />
              </>
            );
          }}
        />
        <Button
          value={isLoading ? <ButtonLoader /> : "Edit blog"}
          className={"!w-full "}
        />
      </form>
    </Modal>
  );
};

EditBlog.propTypes = {
  closeModal: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default EditBlog;
