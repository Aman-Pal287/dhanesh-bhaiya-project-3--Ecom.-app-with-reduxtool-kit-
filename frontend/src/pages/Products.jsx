import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncUpdateUser } from "../store/actions/userActions";
import { useEffect, useState } from "react";
import axios from "../api/axiosconfig";
import InfiniteScroll from "react-infinite-scroll-component";
import { Suspense } from "react";

const Products = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.userReducer.users);
  // const products = useSelector((state) => state.productReducer.products);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?_limit=6&_start=${products.length}`
      );
      // console.log(data);
      if (data.length == 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
        setProducts([...products, ...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
        className="flex flex-col justify-between gap-2 shrink-0  w-[300px] h-[450px] border shadow mb-2 mr-5"
      >
        <div className="w-full h-[50%] aspect-square overflow-hidden">
          <img className="width-full object-cover" src={product.image} alt="" />
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

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchProducts}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p className="text-center">Yay! You have seen it all</p>}
    >
      <div className="flex flex-wrap justify-center items-center gap-5">
        <Suspense
          fallback={
            <h1 className="text-center text-5xl text-yellow-400">LOADING...</h1>
          }
        >
          {renderProduct}
        </Suspense>
      </div>
    </InfiniteScroll>
  );
};

export default Products;
