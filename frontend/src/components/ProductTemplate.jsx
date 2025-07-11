import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { asyncUpdateUser } from "../store/actions/userActions";

import { useDispatch, useSelector } from "react-redux";

const ProductTemplate = (props) => {
  const {
    userReducer: { users },
  } = useSelector((state) => state);
  const { product, setAddedProduct, setShowAdded } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = (id, e) => {
    // Check if click was on the Add to Cart button
    if (e.target.closest('button[data-action="add-to-cart"]')) {
      return; // Don't navigate if Add to Cart was clicked
    }
    navigate(`/product/${id}`);
  };

  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const AddtoCartHandler = (id, product, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!users) {
      navigate("/login");
      return;
    }

    let copyUser = JSON.parse(JSON.stringify(users));
    const x = copyUser.cart.findIndex((c) => c?.productId == id);

    if (x == -1) {
      copyUser.cart.push({ productId: id, quantity: 1, product });
    } else {
      copyUser.cart[x].quantity += 1;
    }
    dispatch(asyncUpdateUser(copyUser.id, copyUser));

    setAddedProduct(product.title);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };
  return (
    <motion.div
      key={product.id}
      className="flex flex-col justify-between w-full sm:w-64 lg:w-72 bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 cursor-pointer"
      variants={productVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      //   custom={index}
      onClick={(e) => handleCardClick(product.id, e)}
    >
      <div className="w-full h-48 sm:h-52 overflow-hidden bg-gray-50 flex items-center justify-center">
        <motion.img
          className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
          src={product.image}
          alt={product.title}
          whileHover={{ scale: 1.05 }}
        />
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h1 className="font-bold text-lg text-gray-800 line-clamp-2 mb-2">
          {product.title}
        </h1>

        <div className="relative mb-4 min-h-[60px]">
          <p className="text-gray-600 text-sm line-clamp-3 pr-10">
            {product.description}
          </p>
          <span className="absolute bottom-0 right-0 bg-white pl-2 text-blue-500 hover:text-blue-700 text-sm">
            Read more
          </span>
        </div>

        <div className="mt-auto flex justify-between items-center">
          <span className="text-xl font-bold text-green-600">
            ${product.price}
          </span>
          <motion.button
            data-action="add-to-cart"
            onClick={(e) => AddtoCartHandler(product.id, product, e)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium shadow hover:shadow-md transition-all z-10"
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductTemplate;
