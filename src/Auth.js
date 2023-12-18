import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const signInAsSingleUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    console.log("Signed in user:", user);
    return user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export { signInAsSingleUser };
