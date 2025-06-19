import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncCreateProduct } from "../../store/actions/productActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProduct = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CreateProductHandler = (product) => {
    product.id = nanoid();
    dispatch(asyncCreateProduct(product));
    
    toast.success("🛍️ Product created successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        backgroundColor: "#4CAF50",
        color: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "12px",
        fontSize: "14px"
      }
    });
    navigate("/");
  };

  // Watch image URL for preview (optional)
  const imageUrl = watch("image");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 sm:p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Create New Product</h2>
            <p className="mt-2 text-gray-600">Fill in the details of your new product</p>
          </div>
          
          <form onSubmit={handleSubmit(CreateProductHandler)} className="space-y-6">
            {/* Image URL with optional preview */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Product Image URL
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  {...register("image", { 
                    required: "Image URL is required",
                    pattern: {
                      value: /^(https?:\/\/).+$/i,
                      message: "Please enter a valid URL"
                    }
                  })}
                  id="image"
                  className={`block w-full px-4 py-3 rounded-lg border ${errors.image ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:shadow-sm transition duration-150`}
                  type="url"
                  placeholder="https://example.com/product-image.jpg"
                />
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
              )}
              {imageUrl && (
                <div className="mt-3 flex justify-center">
                  <div className="w-32 h-32 border border-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22128%22%20height%3D%22128%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20128%20128%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18a9c8a8d7b%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A8pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18a9c8a8d7b%22%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2248%22%20y%3D%2266%22%3EImage%20Preview%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Product Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Product Title
              </label>
              <input
                {...register("title", { 
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters"
                  }
                })}
                id="title"
                className={`block w-full px-4 py-3 rounded-lg border ${errors.title ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:shadow-sm transition duration-150`}
                type="text"
                placeholder="Amazing Product"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  {...register("price", { 
                    required: "Price is required",
                    min: { 
                      value: 0.01, 
                      message: "Price must be greater than 0" 
                    },
                    max: {
                      value: 1000000,
                      message: "Price must be less than 1,000,000"
                    }
                  })}
                  id="price"
                  className={`block w-full pl-7 pr-4 py-3 rounded-lg border ${errors.price ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:shadow-sm transition duration-150`}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register("description", { 
                  required: "Description is required",
                  minLength: { 
                    value: 20, 
                    message: "Description must be at least 20 characters" 
                  },
                  maxLength: {
                    value: 500,
                    message: "Description must be less than 500 characters"
                  }
                })}
                id="description"
                rows={4}
                className={`block w-full px-4 py-3 rounded-lg border ${errors.description ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:shadow-sm transition duration-150`}
                placeholder="Describe your product in detail (features, benefits, etc.)"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                {...register("category", { 
                  required: "Category is required",
                  minLength: {
                    value: 3,
                    message: "Category must be at least 3 characters"
                  }
                })}
                id="category"
                className={`block w-full px-4 py-3 rounded-lg border ${errors.category ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:shadow-sm transition duration-150`}
                type="text"
                placeholder="Electronics, Clothing, Home Decor, etc."
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-2">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg font-medium"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;