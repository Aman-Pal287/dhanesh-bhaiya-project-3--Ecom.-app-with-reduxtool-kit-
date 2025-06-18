import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { asyncUpdateUser } from "../store/actions/userActions";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userReducer: { users } } = useSelector((state) => state);
  const [showConfirm, setShowConfirm] = useState(null);

  // Animation settings
  const cartItemAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { 
        ease: "easeInOut",
        duration: 0.3 
      } 
    }
  };

  const handleCardClick = (productId, e) => {
    // Don't navigate if clicked on quantity controls or remove button
    if (e.target.closest('.quantity-control') || e.target.closest('.remove-btn')) {
      return;
    }
    navigate(`/product/${productId}`);
  };

  const increaseQuantity = (productId) => {
    const userCopy = JSON.parse(JSON.stringify(users));
    const itemIndex = userCopy.cart.findIndex(item => item.productId === productId);
    userCopy.cart[itemIndex].quantity += 1;
    dispatch(asyncUpdateUser(userCopy.id, userCopy));
  };

  const decreaseQuantity = (productId) => {
    const userCopy = JSON.parse(JSON.stringify(users));
    const itemIndex = userCopy.cart.findIndex(item => item.productId === productId);
    
    // Quantity 1 से कम नहीं होगी
    if (userCopy.cart[itemIndex].quantity > 1) {
      userCopy.cart[itemIndex].quantity -= 1;
      dispatch(asyncUpdateUser(userCopy.id, userCopy));
    }
  };

  const removeItem = (productId) => {
    const userCopy = JSON.parse(JSON.stringify(users));
    userCopy.cart = userCopy.cart.filter(item => item.productId !== productId);
    dispatch(asyncUpdateUser(userCopy.id, userCopy));
    setShowConfirm(null);
  };

  const calculateTotal = () => {
    return users.cart.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Your Shopping Cart
        </motion.h1>
        
        <AnimatePresence>
          {users.cart.length === 0 ? (
            <motion.div 
              className="bg-white/90 rounded-xl shadow-lg p-8 text-center max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h2 className="mt-6 text-xl font-medium text-gray-900">Your cart is empty</h2>
              <NavLink 
                to="/" 
                className="mt-6 inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full text-sm font-medium shadow hover:bg-indigo-700"
              >
                Continue Shopping
              </NavLink>
            </motion.div>
          ) : (
            <>
              <motion.ul className="space-y-6">
                <AnimatePresence>
                  {users.cart.map((item) => (
                    <motion.li
                      key={item.productId}
                      layout
                      variants={cartItemAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl shadow-md border border-gray-100 cursor-pointer"
                      onClick={(e) => handleCardClick(item.productId, e)}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex-shrink-0 w-40 h-40 bg-gray-50 rounded-lg overflow-hidden">
                        <img 
                          className="w-full h-full object-contain p-4"
                          src={item.product.image} 
                          alt={item.product.title}
                        />
                      </div>
                      
                      <div className="flex-grow flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-lg font-semibold text-gray-800">{item.product.title}</h2>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {item.product.description}
                            </p>
                          </div>
                          <span className="text-lg font-bold text-indigo-600">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden quantity-control">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                decreaseQuantity(item.productId);
                              }}
                              className={`w-10 h-10 flex items-center justify-center text-xl ${
                                item.quantity <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                              }`}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-4 text-gray-700 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                increaseQuantity(item.productId);
                              }}
                              className="w-10 h-10 flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowConfirm(item.productId);
                            }}
                            className="remove-btn text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
              
              <motion.div 
                className="mt-12 bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                  <span className="text-2xl font-bold text-indigo-600">
                    ${calculateTotal()}
                  </span>
                </div>
                
                <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  Proceed to Checkout
                </button>
                
                <div className="mt-4 text-center">
                  <NavLink 
                    to="/" 
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    ← Continue Shopping
                  </NavLink>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Remove Confirmation Popup */}
        <AnimatePresence>
          {showConfirm && (
            <motion.div 
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(null)}
            >
              <motion.div 
                className="bg-white rounded-xl p-6 max-w-sm w-full"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">Remove Item</h3>
                <p className="text-gray-600 mb-5">Are you sure you want to remove this item from your cart?</p>
                <div className="flex justify-end space-x-3">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowConfirm(null)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    onClick={() => removeItem(showConfirm)}
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Cart;