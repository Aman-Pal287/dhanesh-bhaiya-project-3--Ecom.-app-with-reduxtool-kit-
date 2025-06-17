import { useEffect } from "react";
import Mainroutes from "./routes/Mainroutes";
import Nav from "./components/Nav";
import { asyncCurrentUser } from "./store/actions/userActions";
import { useDispatch } from "react-redux";
import { asyncLoadProduct } from "./store/actions/productActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncCurrentUser());
    dispatch(asyncLoadProduct());
  });

  return (
    <div className="overflow-auto px-[5%] text-white font-thin w-full h-screen bg-gray-700">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
