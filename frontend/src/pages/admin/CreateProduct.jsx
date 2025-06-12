import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncCreateProduct } from "../../store/actions/productActions";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CreateProductHandler = (product) => {
    product.id = nanoid();

    dispatch(asyncCreateProduct(product));
    toast.success("product created!");
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(CreateProductHandler)}
      className="flex flex-col justify-start items-start"
    >
      <input
        {...register("image")}
        className=" text-2xl p-2 border-b outline-0 mb-8"
        type="url"
        placeholder="image-url"
      />

      <input
        {...register("title")}
        className=" text-2xl p-2 border-b outline-0 mb-8"
        type="text"
        placeholder="Product-title"
      />
      <input
        {...register("price")}
        className=" text-2xl p-2 border-b outline-0 mb-8"
        type="number"
        placeholder="0.00"
      />
      <textarea
        {...register("description")}
        className=" text-2xl p-2 border-b outline-0 mb-8"
        placeholder="enter product-description here..."
      ></textarea>
      <input
        {...register("category")}
        className=" text-2xl p-2 border-b outline-0 mb-8"
        type="text"
        placeholder="category"
      />
      <button className="mb-3 text-gray-200 px-10 py-2 font-black bg-blue-400 rounded">
        Create Product
      </button>
    </form>
  );
};

export default CreateProduct;
