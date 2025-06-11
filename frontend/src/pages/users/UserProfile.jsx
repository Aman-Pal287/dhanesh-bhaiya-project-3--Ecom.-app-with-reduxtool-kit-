import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  asyncDeleteUser,
  asyncLogoutUser,
  asyncUpdateUser,
} from "../../store/actions/userActions";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    userReducer: { users },
  } = useSelector((state) => state);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: users?.username,
      email: users?.email,
      password: users?.password,
    },
  });

  const UpdateUserHandler = (user) => {
    dispatch(asyncUpdateUser(users.id, user));
  };
  const DeleteUserHandler = () => {
    dispatch(asyncDeleteUser(users.id));
    navigate("/login");
  };
  const LogoutUserHandler = () => {
    dispatch(asyncLogoutUser());
    navigate("/login");
  };
  return users ? (
    <div>
      <h1 className="mb-5 text-5xl font-thin text-pink-300">
        {users.username}
      </h1>
      <h1 className="text-xl text-blue-400">{users.email}</h1>

      <hr className="mt-10" />
      <form
        onSubmit={handleSubmit(UpdateUserHandler)}
        className="  flex flex-col justify-start items-start"
      >
        <input
          {...register("username")}
          className=" text-2xl p-2 border-b outline-0 mb-8"
          type="text"
          placeholder="John-Doe"
        />
        <input
          {...register("email")}
          className=" text-2xl p-2 border-b outline-0 mb-8"
          type="email"
          placeholder="John@gmail.com"
        />
        <input
          {...register("password")}
          className=" text-2xl p-2 border-b outline-0 mb-8"
          type="password"
          placeholder="*****"
        />
        <button className="mb-3 text-gray-200 px-10 py-2 font-black bg-blue-400 rounded">
          Update Profile
        </button>
        <br /> <br />
        <button
          type="button"
          onClick={LogoutUserHandler}
          className="mb-3 text-gray-200 px-10 py-2 font-black bg-red-400 rounded"
        >
          Logout
        </button>
        <button
          type="button"
          onClick={DeleteUserHandler}
          className="mb-3 text-gray-200 px-10 py-2 font-black bg-red-600 rounded"
        >
          Delete Account
        </button>
      </form>
    </div>
  ) : (
    "no user found"
  );
};

export default UserProfile;
