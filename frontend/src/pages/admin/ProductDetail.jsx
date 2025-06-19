import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { asyncUpdateProduct } from "../../store/actions/productActions";
import { asyncDeleteProduct } from "../../store/actions/productActions";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    productReducer: { products },
    userReducer: { users },
  } = useSelector((state) => state);
  
  const product = products?.find((product) => product.id == id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form handling
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: product?.title,
      image: product?.image,
      price: product?.price,
      description: product?.description,
      category: product?.category,
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const UpdateProductHandler = (product) => {
    dispatch(asyncUpdateProduct(id, product));
    toast.success("product updated!");
  };
  const DeleteHandler = (product) => {
    dispatch(asyncDeleteProduct(id));
    toast.error("product deleted!");
    navigate("/products");
  };

  return product ? (
    <div className="overflow-x-auto">
      <div className="flex gap-5">
        <img
          className="w-1/2 h-[50vh] object-cover object-center"
          src={product?.image}
          alt=""
        />
        <div className="w-1/2 h-1/2">
          <h1 className="text-2xl font-black  mb-5">{product?.title}</h1>
          <h2 className="text-xl text-green-400 mb-5">
            price : ${product?.price}
          </h2>
          <p>{product?.description}</p>
          <button className="px-4 py-2 bg-blue-500 mt-5">Add to cart</button>
        </div>
      </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={addToCart}
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </span>
              </motion.button>

              <motion.button
                onClick={buyNow}
                className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Buy Now
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Admin Controls - Remain the same as before */}
        {users?.isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white p-8 rounded-2xl shadow-lg mb-12"
          >
            {/* ... (Keep existing admin controls code) ... */}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetail;