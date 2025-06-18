import { useEffect } from "react";
import Mainroutes from "./routes/Mainroutes";
import Nav from "./components/Nav";
import { asyncCurrentUser } from "./store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadProduct } from "./store/actions/productActions";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  const products = useSelector((state) => state.productReducer.products);

  useEffect(() => {
    !users && dispatch(asyncCurrentUser());
  }, [users]);

  useEffect(() => {
    products.length == 0 && dispatch(asyncLoadProduct());
  }, [products]);

  return (
    <div className="overflow-auto px-[5%] text-white font-thin w-full h-screen bg-gray-700">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
