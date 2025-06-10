import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncLoginUser } from "../store/actions/userActions";
const Login = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const LoginHandler = (user) => {
    dispatch(asyncLoginUser(user));
    
  };

  return (
    <form
      onSubmit={handleSubmit(LoginHandler)}
      className="flex flex-col justify-start items-start"
    >
      <input
        {...register("email")}
        className=" text-2xl p-2 border-b outline-0 mb-8"
        type="email"
        placeholder="John@email.com"
      />
      <input
        {...register("password")}
        className=" text-2xl p-2 border-b outline-0 mb-8"
        type="password"
        placeholder="*********"
      />
      <button className="text-gray-200 mb-3 px-10 py-2 font-black bg-blue-400 rounded">
        Login
      </button>
      <div className="flex gap-2">
        <p>Don't have an account?</p>
        <Link to="/register" className="text-blue-400">
          {" "}
          Register
        </Link>
      </div>
    </form>
  );
};

export default Login;
