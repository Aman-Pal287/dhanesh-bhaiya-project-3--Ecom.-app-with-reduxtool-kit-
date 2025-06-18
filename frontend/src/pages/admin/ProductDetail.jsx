import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { asyncUpdateProduct } from "../../store/actions/productActions";
import { asyncDeleteProduct } from "../../store/actions/productActions";
import { motion, AnimatePresence } from "framer-motion";
import { asyncUpdateUser } from "../../store/actions/userActions";

const ProductDetail = () => {
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

  // Update product
  const UpdateProductHandler = (updatedProduct) => {
    dispatch(asyncUpdateProduct(id, updatedProduct));
    toast.success("Product updated successfully!");
    reset();
  };

  // Delete product
  const DeleteHandler = () => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      dispatch(asyncDeleteProduct(id));
      toast.error("Product deleted!");
      navigate("/products");
    }
  };

  // Add to cart
  const addToCart = () => {
    if (!users) {
      toast.info("Please login to add items to cart");
      navigate("/login");
      return;
    }

    const userCopy = JSON.parse(JSON.stringify(users));
    const existingItem = userCopy.cart.find(item => item.productId == id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      userCopy.cart.push({ 
        productId: id, 
        quantity: 1, 
        product: product 
      });
    }

    dispatch(asyncUpdateUser(userCopy.id, userCopy));
    toast.success(`${product.title} added to cart!`);
  };

  // Buy Now function
  const buyNow = () => {
    if (!users) {
      toast.info("Please login to proceed to checkout");
      navigate("/login");
      return;
    }

    // First add to cart
    const userCopy = JSON.parse(JSON.stringify(users));
    const existingItem = userCopy.cart.find(item => item.productId == id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      userCopy.cart.push({ 
        productId: id, 
        quantity: 1, 
        product: product 
      });
    }

    dispatch(asyncUpdateUser(userCopy.id, userCopy));
    
    // Then navigate to checkout
    navigate("/checkout");
    toast.success("Proceeding to checkout!");
  };

  if (!product) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5,
          ease: "linear"
        }}
        className="h-20 w-20 rounded-full border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent"
      />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Product Display Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Product Image */}
          <motion.div 
            className="lg:w-1/2 bg-white p-8 rounded-2xl shadow-lg"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="relative h-full min-h-[400px]">
              <motion.img
                className="w-full h-full object-contain"
                src={product.image}
                alt={product.title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="lg:w-1/2 bg-white p-8 rounded-2xl shadow-lg"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.h1 
              className="text-4xl font-extrabold text-gray-900 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {product.title}
            </motion.h1>
            
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </motion.div>
            
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-md"
              >
                <span className="text-2xl font-bold text-white">
                  ${product.price}
                </span>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="px-4 py-2 bg-gray-100 rounded-full"
              >
                <span className="text-sm font-medium text-gray-700">
                  {product.category}
                </span>
              </motion.div>
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