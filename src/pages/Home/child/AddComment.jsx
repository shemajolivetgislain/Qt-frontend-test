import { Controller, useForm } from "react-hook-form";
import TextArea from "../../../components/Inputs/TextArea";
import Button from "../../../components/Button";
import PropTypes from "prop-types";
import { useAddBlogCommentMutation } from "../../../app/api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AddComment = ({ post_id }) => {
  const { control, handleSubmit } = useForm();

  const [addBlogComment, { isLoading, isSuccess, isError }] =
    useAddBlogCommentMutation();
  const onSubmit = (data) => {
    console.log(data);
    addBlogComment({ id: post_id, data });
  };

  //   Handling comments Submittion
  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Comment added successfully", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });

      // Reset form
      control.reset({ content: "" });
    } else if (isError) {
      toast.error("Error Occured while adding comment", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
    }
  }, [control, isError, isLoading, isSuccess]);
  return (
    <div className="w-1/2 flex flex-col gap-3">
      <header>
        <h1 className="font-bold text-whiteTheme-primaryColor text-lg">
          Leave comment
        </h1>
      </header>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full"
      >
        {" "}
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
        <Button value={"Comment"} />
      </form>
    </div>
  );
};

AddComment.propTypes = {
  post_id: PropTypes.string,
};

export default AddComment;
