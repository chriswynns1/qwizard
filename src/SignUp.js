import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "./firebase";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Sign up with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const firestore = getFirestore();

      // ref to the 'users' collection
      const usersCollectionRef = collection(firestore, "users");

      const usersDocRef = doc(
        usersCollectionRef,
        user.uid
      );

      await setDoc(usersDocRef, {username: username});
      navigate("/category");
      // Handle successful sign-up (e.g., redirect, update state)
    } catch (error) {
      // Handle sign-up error (e.g., display error message)
      console.error("Error signing up:", error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Sign up with Google using a popup
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const firestore = getFirestore();

      // ref to the 'users' collection
      const usersCollectionRef = collection(firestore, "users");

      const usersDocRef = doc(
        usersCollectionRef,
        user.uid
      );

      await setDoc(usersDocRef, {username: user.displayName});
      navigate("/category");
    } catch (error) {
      // Handle sign-up error (e.g., display error message)
      console.error("Error signing up with Google:", error.message);
    }
  };

  return (
    <div className="text-gray-100 pt-20 text-center">
      <div className="pt-20 text-3xl">Sign Up</div>

      <div className="w-80 mt-10 mx-auto flex flex-col justify-center border rounded-md p-10">
        <form onSubmit={handleSignUp}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
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
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
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
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-white"
            >
              Display name
            </label>
            <input
              type="text"
              id="username"
              value={username} // Use the value attribute for controlled component
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            </div>
          <div className="flex flex-col justify-center">
            <button
              type="submit"
              onClick={handleSignUp}
              className="text-white bg-black hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Up
            </button>
            <button
              onClick={handleGoogleSignUp}
              className="mt-4 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Sign In with Google
            </button>
          </div>
          Already have an account?{" "}
          <a
            href="/signin"
            className="hover:text-indigo-300 underline cursor-pointer"
          >
            Login
          </a>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
