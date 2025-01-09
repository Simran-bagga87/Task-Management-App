import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import MainLayout from '../layouts/MainLayout';

const Login = () => {
  const { state } = useLocation();
  const redirectUrl = state?.redirectUrl || null;

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-10 rounded-xl shadow-lg max-w-sm w-full">
          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Login to Your Account</h1>
          <p className="text-gray-600 text-center mb-4">Welcome back! Please enter your credentials to continue.</p>
          <LoginForm redirectUrl={redirectUrl} />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? 
              <a href="/signup" className="text-indigo-600 hover:underline">Sign up here</a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
