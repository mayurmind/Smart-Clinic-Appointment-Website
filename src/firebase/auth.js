import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";

/**
 * Login admin with email and password
 */
export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    let message = "Login failed. Please try again.";
    if (error.code === "auth/user-not-found") message = "No admin account found.";
    if (error.code === "auth/wrong-password") message = "Incorrect password.";
    if (error.code === "auth/invalid-email") message = "Invalid email address.";
    if (error.code === "auth/too-many-requests") message = "Too many attempts. Try later.";
    if (error.code === "auth/invalid-credential") message = "Invalid email or password.";
    return { success: false, error: message };
  }
};

/**
 * Logout admin
 */
export const logoutAdmin = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Subscribe to auth state changes
 */
export const subscribeToAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export { auth };
