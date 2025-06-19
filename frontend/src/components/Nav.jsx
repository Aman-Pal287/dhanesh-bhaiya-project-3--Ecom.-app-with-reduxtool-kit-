import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const user = useSelector((state) => state.userReducer.users);

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side - Logo/Brand */}
        <div className="flex items-center space-x-8">
          <NavLink 
            to="/" 
            className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors"
          >
            ShopCart
          </NavLink>
          
          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-1" 
                    : "text-gray-600 hover:text-indigo-500"
                }`
              }
            >
              Home
            </NavLink>
            
            {user && user?.isAdmin && (
              <NavLink 
                to="/admin/create-product" 
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-indigo-600 border-b-2 border-indigo-600 pb-1" 
                      : "text-gray-600 hover:text-indigo-500"
                  }`
                }
              >
                Add Product
              </NavLink>
            )}
          </div>
        </div>

        {/* Right side - User Navigation */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <NavLink 
                to="/cart" 
                className="relative text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </NavLink>
              
              <NavLink 
                to="/admin/user-profile" 
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-indigo-600" 
                      : "text-gray-600 hover:text-indigo-500"
                  }`
                }
              >
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="hidden md:inline">Account</span>
                </div>
              </NavLink>
            </>
          ) : (
            <NavLink 
              to="/login" 
              className="text-sm font-medium px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;