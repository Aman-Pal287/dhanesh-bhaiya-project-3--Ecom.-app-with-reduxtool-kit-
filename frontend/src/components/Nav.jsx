import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { asyncLogoutUser } from "../store/actions/userActions";

const Nav = () => {
  const user = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();
  const LogoutHandler = () => {
    dispatch(asyncLogoutUser());
  };

  return (
    <nav className="mb-8 px-5 py-8 flex gap-10 justify-center items-center">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      {user ? (
        <>
          <NavLink to="/admin/create-product">Create Product</NavLink>
          <button
            className="font-black active:scale-80 hover:bg-blue-500 px-4 py-2 bg-red-500 rounded shadow"
            onClick={LogoutHandler}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </nav>
  );
};

export default Nav;
