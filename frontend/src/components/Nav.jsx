import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const user = useSelector((state) => state.userReducer.users);

  return (
    <nav className="mb-8 px-5 py-8 flex gap-10 justify-center items-center">
      <NavLink to="/">Home</NavLink>

      {user ? (
        <>
          {user && user?.isAdmin && (
            <NavLink to="/admin/create-product">Create Product</NavLink>
          )}

          <NavLink to="/admin/user-profile">Settings</NavLink>
          <NavLink to="/cart">Cart</NavLink>
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
