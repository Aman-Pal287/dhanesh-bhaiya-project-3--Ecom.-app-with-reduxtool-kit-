import { useDispatch, useSelector } from "react-redux";
import { asyncUpdateUser } from "../store/actions/userActions";
const Cart = () => {
  const dispatch = useDispatch();

  const {
    userReducer: { users },
    productReducer: { products },
  } = useSelector((state) => state);

  const increseQuantityHanlder = (quantity, id) => {
    let copyUser = JSON.parse(JSON.stringify(users));
    const x = copyUser.cart.findIndex((c) => c?.productId == id);

    copyUser.cart[x].quantity += 1;

    dispatch(asyncUpdateUser(copyUser.id, copyUser));
    console.log(copyUser.cart[x].quantity);
  };

  const decreaseQuantityHanlder = (quantity, id) => {
    let copyUser = JSON.parse(JSON.stringify(users));
    const x = copyUser.cart.findIndex((c) => c?.productId == id);

    if (x !== -1) {
      if (copyUser.cart[x].quantity === 1) {
        // 👇 product ko cart se hata do
        copyUser.cart.splice(x, 1);
        console.log(`🗑 Product with id ${id} removed from cart`);
      } else {
        // 👇 normal quantity decrease
        copyUser.cart[x].quantity -= 1;
        console.log(copyUser.cart[x].quantity);
      }

      dispatch(asyncUpdateUser(copyUser.id, copyUser));
    } else {
      console.warn("❌ Product not found in cart.");
    }
  };

  const cartItems = users.cart.map((c) => {
    return (
      <li
        className="mb-5 flex w-full gap-5 bg-gray-600 justify-between items-center pr-10"
        key={c.productId}
      >
        <img className="w-[10vmax]" src={c.product.image} />
        <div className="details gap-5 flex flex-col">
          <h1>{c.product.title}</h1>
          <h1>{c.product.description.slice(0, 90)} ...</h1>
          <h1 className="text-green-400">${c.product.price}</h1>
        </div>
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => decreaseQuantityHanlder(c.quantity, c.productId)}
            className="text-3xl"
          >
            -
          </button>
          <h1 className="text-2xl">{c.quantity}</h1>
          <button
            onClick={() => increseQuantityHanlder(c.quantity, c.productId)}
            className="text-2xl"
          >
            +
          </button>
        </div>
      </li>
    );
  });

  return <ul>{cartItems}</ul>;
};

export default Cart;
