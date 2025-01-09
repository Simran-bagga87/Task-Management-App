import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);

  return (
    <MainLayout>
      {/* Unauthenticated User Section */}
      {!isLoggedIn ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome to Task Manager</h1>
            <p className="text-lg text-gray-600 mb-6">Start organizing your tasks with ease. Manage your productivity like a pro!</p>
            <Link
              to="/signup"
              className="inline-block bg-blue-500 text-white py-3 px-8 rounded-lg shadow-lg text-xl font-medium transition transform hover:bg-blue-600 hover:scale-105"
            >
              Join Now
              <span className="ml-3">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        </div>
      ) : (
        // Authenticated User Section
        <div className="flex flex-col items-center my-16 space-y-8">
          <div className="w-full max-w-4xl bg-white shadow-lg p-8 rounded-xl">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome back, {authState.user.name}!</h1>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <Tasks />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Home;
