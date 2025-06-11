import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { asyncUpdateProduct } from "../../store/actions/productActions";
import { asyncDeleteProduct } from "../../store/actions/productActions";

const ProductDetail = () => {
  const { id } = useParams();
  const {
    productReducer: { products },
    userReducer: { users },
  } = useSelector((state) => state);

  const product = products?.find((product) => product.id == id);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      title: product?.title,
      image: product?.image,
      price: product?.price,
      description: product?.description,
      category: product?.category,
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const UpdateProductHandler = (product) => {
    dispatch(asyncUpdateProduct(id, product));
    toast.success("product updated!");
  };
  const DeleteHandler = (product) => {
    dispatch(asyncDeleteProduct(id));
    toast.error("product deleted!");
    navigate("/products");
  };

  return product ? (
    <div className="overflow-x-auto">
      <div className="flex gap-5">
        <img
          className="w-1/2 h-[50vh] object-cover object-center"
          src={product?.image}
          alt=""
        />
        <div className="w-1/2 h-1/2">
          <h1 className="text-2xl font-black  mb-5">{product?.title}</h1>
          <h2 className="text-xl text-green-400 mb-5">
            price : ${product?.price}
          </h2>
          <p>{product?.description}</p>
          <button className="px-4 py-2 bg-blue-500 mt-5">Add to cart</button>
        </div>
      </div>

      {users && users?.isAdmin && (
        <form
          onSubmit={handleSubmit(UpdateProductHandler)}
          className="  flex flex-col justify-start items-start"
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
            Update Product
          </button>
          <br /> <br />
          <button
            type="button"
            onClick={DeleteHandler}
            className="mb-3 text-gray-200 px-10 py-2 font-black bg-red-400 rounded"
          >
            Delete Product
          </button>
        </form>
      )}
    </div>
  ) : (
    "loading"
  );
};

export default ProductDetail;
