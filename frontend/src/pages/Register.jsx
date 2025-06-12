import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../store/actions/userActions";
import { toast } from "react-toastify";

const Register = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const RegisterHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    user.cart = [];
    console.log(user);
    dispatch(asyncRegisterUser(user));
    reset();
    navigate("/login");
    toast.success("user registered");
  };

  return (
    <form
      onSubmit={handleSubmit(RegisterHandler)}
      className="flex flex-col justify-start items-start"
    >
      <input
        {...register("username")}
        className=" text-2xl p-2 border-b outline-0 mb-8"
        type="text"
        placeholder="John-doe"
      />
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
      <button className="mb-3 text-gray-200 px-10 py-2 font-black bg-blue-400 rounded">
        Register
      </button>
      <div className="flex gap-2">
        <p>Already have an account ?</p>
        <Link to="/login" className="text-blue-400">
          {" "}
          Login
        </Link>
      </div>
    </form>
  );
};

export default Register;
