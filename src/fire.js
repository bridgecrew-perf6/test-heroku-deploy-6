import fire from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8LpTQL1NqwILf3YIBOeZvE4wFyf2VSKw",
  authDomain: "react-fire-auth-27cf7.firebaseapp.com",
  projectId: "react-fire-auth-27cf7",
  storageBucket: "react-fire-auth-27cf7.appspot.com",
  messagingSenderId: "718294247706",
  appId: "1:718294247706:web:61e9eb8b116b9a6f3a64a3",
};

export default fire.initializeApp(firebaseConfig);
