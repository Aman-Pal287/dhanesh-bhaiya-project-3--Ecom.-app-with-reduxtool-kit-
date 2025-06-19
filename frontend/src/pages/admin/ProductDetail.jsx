import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { asyncUpdateProduct, asyncDeleteProduct } from "../../store/actions/productActions";
import { asyncUpdateUser } from "../../store/actions/userActions";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ReactModal from 'react-modal';

// Set app element for accessibility
ReactModal.setAppElement('#root');

const ProductDetail = () => {
  const { id } = useParams();
  const {
    productReducer: { products },
    userReducer: { users },
  } = useSelector((state) => state);
  
  const [currentProduct, setCurrentProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for modals
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState(null);

  // Form handling
  const { register, handleSubmit, reset, setValue } = useForm();

  // Initialize form with product data
  useEffect(() => {
    const product = products?.find((p) => p.id == id);
    if (product) {
      setCurrentProduct(product);
      setValue("title", product.title);
      setValue("image", product.image);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("category", product.category);
    }
  }, [products, id, setValue]);

  // Update product
  const updateProduct = (data) => {
    setFormData(data);
    setShowUpdateModal(true);
  };

  const confirmUpdate = async () => {
    try {
      const updatedProduct = await dispatch(asyncUpdateProduct(id, formData));
      setCurrentProduct(updatedProduct);
      toast.success("Product updated successfully!", {
        position: "top-center",
        theme: "colored"
      });
      setShowUpdateModal(false);
    } catch (error) {
      toast.error("Failed to update product", {
        position: "top-center",
        theme: "colored"
      });
    }
  };

  // Delete product
  const deleteProduct = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(asyncDeleteProduct(id));
      toast.error("Product deleted!", {
        position: "top-center",
        theme: "colored"
      });
      setShowDeleteModal(false);
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete product", {
        position: "top-center",
        theme: "colored"
      });
    }
  };

  // Add to cart handler
  const handleAddToCart = () => {
    if (!users) {
      toast.info("Please login to add items to cart", {
        position: "top-center"
      });
      navigate("/login");
      return;
    }

    const userCopy = JSON.parse(JSON.stringify(users));
    const itemIndex = userCopy.cart.findIndex(item => item.productId == id);

    if (itemIndex >= 0) {
      userCopy.cart[itemIndex].quantity += 1;
    } else {
      userCopy.cart.push({ 
        productId: id, 
        quantity: 1, 
        product: currentProduct 
      });
    }

    dispatch(asyncUpdateUser(userCopy.id, userCopy));
    toast.success(`${currentProduct.title} added to cart!`, {
      position: "bottom-right",
      theme: "colored"
    });
  };

  // Buy now handler
  const handleBuyNow = () => {
    if (!users) {
      toast.info("Please login to proceed to checkout", {
        position: "top-center"
      });
      navigate("/login");
      return;
    }

    const userCopy = JSON.parse(JSON.stringify(users));
    const itemIndex = userCopy.cart.findIndex(item => item.productId == id);

    if (itemIndex >= 0) {
      userCopy.cart[itemIndex].quantity += 1;
    } else {
      userCopy.cart.push({ 
        productId: id, 
        quantity: 1, 
        product: currentProduct 
      });
    }

    dispatch(asyncUpdateUser(userCopy.id, userCopy));
    navigate("/checkout");
    toast.success("Proceeding to checkout!", {
      position: "top-center",
      theme: "colored"
    });
  };

  // Loading state
  if (!currentProduct) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          repeat: Infinity, 
          duration: 1,
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
      <div className="max-w-7xl mx-auto">
        {/* Product Display */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Product Image */}
          <motion.div 
            className="lg:w-1/2 bg-white p-8 rounded-2xl shadow-lg"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.img
              className="w-full h-auto max-h-[500px] object-contain"
              src={currentProduct.image}
              alt={currentProduct.title}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="lg:w-1/2 bg-white p-8 rounded-2xl shadow-lg"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.h1 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentProduct.title}
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 mb-6 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentProduct.description}
            </motion.p>
            
            <div className="flex items-center gap-4 mb-8">
              <motion.span
                className="text-2xl font-bold text-green-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                ${currentProduct.price}
              </motion.span>
              <motion.span
                className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {currentProduct.category}
              </motion.span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </span>
              </motion.button>

              <motion.button
                onClick={handleBuyNow}
                className="flex-1 py-3 bg-purple-600 text-white font-medium rounded-lg shadow hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Buy Now
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Admin Controls */}
        {users?.isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white p-8 rounded-2xl shadow-lg mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
            
            <form onSubmit={handleSubmit(updateProduct)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    {...register("image", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    type="url"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    {...register("title", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    type="text"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    {...register("price", { required: true, min: 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    type="number"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    {...register("category", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    type="text"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  rows="4"
                ></textarea>
              </div>
              
              <div className="flex gap-4">
                <motion.button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Update Product
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={deleteProduct}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Delete Product
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Update Confirmation Modal */}
        <ReactModal
          isOpen={showUpdateModal}
          onRequestClose={() => setShowUpdateModal(false)}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Update</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to update this product?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </ReactModal>

        {/* Delete Confirmation Modal */}
        <ReactModal
          isOpen={showDeleteModal}
          onRequestClose={() => setShowDeleteModal(false)}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
            <div className="flex items-start mb-4">
              <div className="p-2 bg-red-100 rounded-full mr-3 mt-1">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Delete Product</h3>
                <p className="text-gray-600 mt-2">Are you sure you want to delete this product? This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </ReactModal>
      </div>

      {/* Modal Styles */}
      <style jsx global>{`
        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          right: auto;
          bottom: auto;
          transform: translate(-50%, -50%);
          background: transparent;
          border: none;
          outline: none;
          padding: 0;
          overflow: visible;
          max-width: 95%;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          backdrop-filter: blur(2px);
        }
      `}</style>
    </motion.div>
  );
};

export default ProductDetail;