import { motion, AnimatePresence } from "framer-motion";
import { lazy, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Suspense } from "react";
import useInfiniteProducts from "../utils/useInfiniteProducts";

const ProductTemplate = lazy(() => import("../components/ProductTemplate"));

const Products = () => {
  const { product, hasMore, fetchProducts } = useInfiniteProducts();

  const [addedProduct, setAddedProduct] = useState(null);
  const [showAdded, setShowAdded] = useState(false);

  return (
    <InfiniteScroll
      dataLength={product.length}
      next={fetchProducts}
      hasMore={hasMore}
      loader={<h4 className="text-black">Loading...</h4>}
      endMessage={
        <p className="text-center text-black">Yay! You have seen it all</p>
      }
    >
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Our Products
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.map((product) => (
              <Suspense
                key={product.id}
                fallback={
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                }
              >
                <ProductTemplate
                  key={product.id}
                  product={product}
                  setShowAdded={setShowAdded}
                  setAddedProduct={setAddedProduct}
                />
              </Suspense>
            ))}
          </div>

          <AnimatePresence>
            {showAdded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {addedProduct} added to cart!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {product.length === 0 && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
};

export default Products;
