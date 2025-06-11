import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Products = () => {
  const products = useSelector((state) => state.productReducer.products);

  const renderProduct = products.map((product) => {
    return (
      <div
        key={product.id}
        className="flex flex-col justify-between gap-2 shrink-0  w-[20vw] border shadow mb-2 mr-5"
      >
        <div className="w-full aspect-square overflow-hidden">
          <img className="w-full  object-cover" src={product.image} alt="" />
        </div>

        <h1 className="font-black">{product.title}</h1>
        <p>
          {product.description.slice(0, 100)} ...{" "}
          <span className="text-blue-400">more</span>
        </p>
        <div className="flex justify-between items-center">
          <p className="text-green-300">$ {product.price}</p>
          <button className=" text-white bg-blue-500 w-fit px-4 py-2 rounded-xl ">
            Add to cart
          </button>
        </div>

        <Link
          className="font-black bg-amber-500 text-red-500 text-center"
          to={`/product/${product.id}`}
        >
          More Detail
        </Link>
      </div>
    );
  });

  return products.length > 0 ? (
    <div className="overflow-auto width-[100vw] flex ">{renderProduct}</div>
  ) : (
    "loading"
  );
};

export default Products;
