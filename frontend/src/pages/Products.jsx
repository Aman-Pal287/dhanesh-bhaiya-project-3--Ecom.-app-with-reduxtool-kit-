import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncUpdateUser } from "../store/actions/userActions";

const Products = () => {
  // const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();

  const {
    userReducer: { users },
    productReducer: { products },
  } = useSelector((state) => state);

  const AddtoCartHandler = (id, product) => {
    // const copyUser = { ...users, cart: [...users.cart] }; //!shallow copy and deep copy yeh sir ka logic hai iss se problem aa rhi thi and niche wla deep copy mera dimag ka hai toh use tarike se deep deep copy karne se mera kaam ban gya
    let copyUser = JSON.parse(JSON.stringify(users)); //! pure deep copy
    const x = copyUser.cart.findIndex((c) => c?.productId == id);

    if (x == -1) {
      copyUser.cart.push({ productId: id, quantity: 1, product });
    } else {
      copyUser.cart[x].quantity += 1;
    }
    dispatch(asyncUpdateUser(copyUser.id, copyUser));
  };

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
          <button
            onClick={() => AddtoCartHandler(product.id, product)}
            className=" text-white bg-blue-500 w-fit px-4 py-2 rounded-xl "
          >
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
