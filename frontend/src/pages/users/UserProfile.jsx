import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: users?.username,
      email: users?.email,
      password: "",
    },
  });

  const handleUpdate = (formData) => {
    // Only include password in update if it's not empty
    const updateData = {
      username: formData.username,
      email: formData.email,
      ...(formData.password && { password: formData.password }),
    };

    dispatch(asyncUpdateUser(users.id, updateData))
      .then(() => {
        toast.success("Profile updated successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        setShowConfirm(null);
        reset(updateData); // Update form values with new data
      })
      .catch((error) => {
        toast.error("Failed to update profile: " + error.message, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const handleDelete = () => {
    dispatch(asyncDeleteUser(users.id));
    toast.info("Account deleted successfully", {
      position: "top-center",
      autoClose: 2000,
    });
    navigate("/login");
    setShowConfirm(null);
  };

  const handleLogout = () => {
    dispatch(asyncLogoutUser());
    toast.info("Logged out successfully", {
      position: "top-center",
      autoClose: 2000,
    });
    setShowConfirm(null);
    navigate("/login");
  };

  const actions = {
    update: {
      title: "Update Profile",
      message: "Are you sure you want to update your profile details?",
      action: handleUpdate,
      color: "purple",
    },
    logout: {
      title: "Confirm Logout",
      message: "Are you sure you want to logout?",
      action: handleLogout,
      color: "gray",
    },
    delete: {
      title: "Delete Account",
      message:
        "This will permanently delete your account. This action cannot be undone.",
      action: handleDelete,
      color: "red",
    },
  };

  return users ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-24 h-24 mx-auto rounded-full bg-white flex items-center justify-center shadow-lg mb-4"
          >
            <span className="text-3xl font-bold text-purple-600">
              {users.username.charAt(0).toUpperCase()}
            </span>
          </motion.div>
          <motion.h1
            className="text-2xl font-bold text-white mb-1"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            {users.username}
          </motion.h1>
          <motion.p
            className="text-indigo-100 mb-2"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            {users.email}
          </motion.p>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-indigo-100 text-sm">Password:</span>
            <div className="relative">
              <span className="text-white font-medium">
                {showCurrentPassword ? users.password : "••••••••"}
              </span>
              <button
                type="button"
                className="ml-2 text-indigo-200 hover:text-white"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <motion.form
          onSubmit={handleSubmit((data) => setShowConfirm("update"))}
          className="p-6 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-800"
              type="text"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-800"
              type="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password (leave blank to keep current)
            </label>
            <div className="relative">
              <input
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-800 pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <motion.button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg shadow hover:shadow-md transition-all"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Update Profile
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setShowConfirm("logout")}
              className="w-full py-3 bg-gray-200 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-300 transition-all"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Logout
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setShowConfirm("delete")}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Delete Account
            </motion.button>
          </div>
        </motion.form>
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirm(null)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-sm w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className={`text-lg font-bold text-${actions[showConfirm].color}-600 mb-3`}
              >
                {actions[showConfirm].title}
              </h3>
              <p className="text-gray-600 mb-5">
                {actions[showConfirm].message}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowConfirm(null)}
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 bg-${actions[showConfirm].color}-600 text-white rounded-lg hover:bg-${actions[showConfirm].color}-700`}
                  onClick={() => {
                    if (showConfirm === "update") {
                      handleSubmit(actions.update.action)();
                    } else {
                      actions[showConfirm].action();
                    }
                    setShowConfirm(null);
                  }}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-xl text-gray-600">No user found</p>
      </div>
    </div>
  );
};

export default UserProfile;
