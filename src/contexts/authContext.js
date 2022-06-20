import React, { useEffect, useState } from "react";
import fire from "../fire";

export const authContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(false);

  function signUp(email, password, navigate) {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => navigate("/login"))
      .catch(err => setError(err.message));
  }

  function logIn(email, password, navigate) {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigate("/products"))
      .catch(err => setError(err.message));
  }

  function logOut() {
    fire.auth().signOut();
  }

  function authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.email === "admin@gmail.com") {
          setAdmin(true);
        }
        setCurrentUser(user);
      } else {
        setCurrentUser("");
        setAdmin(false);
      }
    });
  }
  useEffect(authListener, []);
  return (
    <authContext.Provider
      value={{ currentUser, error, admin, signUp, logIn, logOut, setError }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
