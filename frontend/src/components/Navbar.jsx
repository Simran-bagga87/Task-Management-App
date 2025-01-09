import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-10">
        <h2 className="cursor-pointer uppercase font-bold text-2xl">
          <Link to="/">Task Manager</Link>
        </h2>

        {/* Desktop Navbar */}
        <ul className="hidden md:flex gap-6 uppercase font-medium">
          {authState.isLoggedIn ? (
            <>
              <li className="bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4 py-2">
                <Link to='/tasks/add'>
                  <i className="fa-solid fa-plus"></i> Add Task
                </Link>
              </li>
              <li className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-md" onClick={handleLogoutClick}>
                Logout
              </li>
            </>
          ) : (
            <li className="py-2 px-3 cursor-pointer text-blue-600 hover:bg-gray-100 transition rounded-md">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>

        {/* Mobile Navbar Button */}
        <span className="md:hidden cursor-pointer" onClick={toggleNavbar}>
          <i className="fa-solid fa-bars text-xl"></i>
        </span>

        {/* Mobile Navbar Sidebar */}
        <div className={`absolute md:hidden right-0 top-0 bottom-0 transition transform ${isNavbarOpen ? 'translate-x-0' : 'translate-x-full'} bg-gray-100 shadow-md w-screen sm:w-9/12 h-screen`}>
          <div className="flex justify-end p-4">
            <span className="cursor-pointer" onClick={toggleNavbar}>
              <i className="fa-solid fa-xmark text-2xl"></i>
            </span>
          </div>
          <ul className="flex flex-col items-center gap-6 uppercase font-medium text-lg">
            {authState.isLoggedIn ? (
              <>
                <li className="bg-blue-500 text-white hover:bg-blue-600 rounded-md w-full text-center py-3 px-4">
                  <Link to='/tasks/add'>
                    <i className="fa-solid fa-plus"></i> Add Task
                  </Link>
                </li>
                <li className="py-3 px-4 cursor-pointer hover:bg-gray-200 transition rounded-md" onClick={handleLogoutClick}>
                  Logout
                </li>
              </>
            ) : (
              <li className="py-3 px-4 cursor-pointer text-blue-600 hover:bg-gray-100 transition rounded-md">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
