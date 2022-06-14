import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Browse from "./pages/Browse";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AddPrivateRoute from "./AddPrivateRoute";
import PrivateRoute from "./PrivateRoute";
import YourAccount from "./pages/YourAccount";
import Add from "./pages/Add";
import VideoPlayer from "./pages/VideoPlayer";
import { AuthContext } from "./context";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [landingPageEmail, setLandingPageEmail] = useState("");
  const [whichMovie, setWhichMovie] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [currentUser]);

  const data = {
    currentUser,
    setCurrentUser,
    landingPageEmail,
    setLandingPageEmail,
    whichMovie,
    setWhichMovie,
  };

  return (
    <AuthContext.Provider value={data}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route
          path="browse"
          element={
            <PrivateRoute>
              <Browse />
            </PrivateRoute>
          }
        />
        <Route
          path="browse/:id"
          element={
            <PrivateRoute>
              <VideoPlayer {...whichMovie} />
            </PrivateRoute>
          }
        />
        <Route
          path="YourAccount"
          element={
            <PrivateRoute>
              <YourAccount />
            </PrivateRoute>
          }
        />
        <Route
          path="add"
          element={
            <AddPrivateRoute>
              <Add />
            </AddPrivateRoute>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
