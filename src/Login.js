import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from './firebase';

function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect or navigate to the desired page upon successful sign-in
      navigate('/play');
    } catch (error) {
      console.error('Error signing in:', error.message);
      // Handle sign-in errors if needed
    }
  };
  return (
<div className="text-gray-100 pt-20 text-center">
      <div className="pt-20 text-3xl">Sign In</div>

      <div className="w-80 mt-10 mx-auto flex flex-col justify-center border rounded-md p-10">
  <form onSubmit={handleSignIn}>
    <div className="mb-6">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
        Your email
      </label>
      <input
        type="email"
        id="email"
        value={email} // Use the value attribute for controlled component
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@email.com"
        required
      />
    </div>
    <div className="mb-6">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
        Your password
      </label>
      <input
        type="password"
        id="password"
        value={password} // Use the value attribute for controlled component
        onChange={(e) => setPassword(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />
    </div>
    <div className='flex flex-col justify-center'>
      <button
              type="submit"

              className="text-white bg-black hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Up
            </button>
            <button
            onClick={() => {
                signInWithPopup(auth, googleAuthProvider);
            }}
            className="mt-4 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Sign In with Google
          </button>
    </div>
    Need an account? <a href="/signup" className='hover:text-indigo-300 underline cursor-pointer'>Sign up</a>
        </form>
</div>
    </div>
  )
}

export default Login
