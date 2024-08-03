import { Controller, useForm } from "react-hook-form";
import TextArea from "../../../components/Inputs/TextArea";
import Button from "../../../components/Button";

const AddComment = ({ post_id }) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
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

export default AddComment;
