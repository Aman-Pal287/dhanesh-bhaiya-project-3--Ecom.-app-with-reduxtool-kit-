import axios from "../api/axiosconfig";
import { useSelector } from "react-redux";
import { loadLazyProduct } from "../store/reducers/productSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
const useInfiniteProducts = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productReducer.products);
  const [hasMore, setHasMore] = useState(true);
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?_limit=6&_start=${product.length}`
      );
      // console.log(data);
      if (data.length == 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
        // setProduct([...product, ...data]);
        dispatch(loadLazyProduct(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return { product, hasMore, fetchProducts };
};

export default useInfiniteProducts;
